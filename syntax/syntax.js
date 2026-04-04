function assert(bool, message) {
  if (!bool) {
    throw new Error(`Assertion failed! ${message || ""}`)
  }
}

import {
  Label,
  Icon,
  Input,
  Block,
  Checkbox,
  Button,
  Comment,
  Glow,
  Script,
  Document,
} from "./model.js"

import {
  allLanguages,
  lookupDropdown,
  hexColorPat,
  minifyHash,
  lookupHash,
  hashSpec,
  applyOverrides,
  normalizeHexColor,
  procedureDefinePrototypeShellHex,
  overrideShapes,
  rtlLanguages,
  iconPat,
  blockName,
  blocksById,
  detectBlockPattern,
} from "./blocks.js"

function paintBlock(info, children, languages, options) {
  let defineHatPrimaryHex = null
  let overrides = []
  if (Array.isArray(children[children.length - 1])) {
    overrides = children.pop()
  }

  let opcodeOverride = null
  for (const o of overrides) {
    if (typeof o === "string") {
      const m = o.match(/^@opcode\(([^)]*)\)$/)
      if (m) {
        opcodeOverride = m[1]
      }
    }
  }

  // build hash
  const words = []
  for (const child of children) {
    if (child.isLabel) {
      words.push(child.value)
    } else if (child.isIcon) {
      words.push(`@${child.name}`)
    } else {
      words.push("_")
    }
  }
  const string = words.join(" ")
  const shortHash = (info.hash = minifyHash(string))

  let lang
  let type
  
  if (options.detect_blocks) {
    const fullText = children.map(child => {
      if (child.isLabel) return child.value
      if (child.isIcon) return `@${child.name}`
      if (child.isInput) {
        if (child.shape === 'string') return `[${child.value}]`
        if (child.shape === 'number') return `(${child.value})`
        if (child.shape === 'boolean') return `<${child.value}>`
        return child.value
      }
      return ''
    }).join(' ')
    
    const detectedPattern = detectBlockPattern(fullText)
    if (detectedPattern) {
      const detectedWords = detectedPattern.split(" ")
      const detectedChildren = []
      
      for (const word of detectedWords) {
        if (word.startsWith("@")) {
          detectedChildren.push(new Icon(word.slice(1)))
        } else if (word.startsWith("%") && word.includes(".")) {
          const parts = word.split(".")
          detectedChildren.push(new Input(parts[0], parts[1] || ""))
        } else if (word === "_") {
          detectedChildren.push(new Input("string", ""))
        } else {
          detectedChildren.push(new Label(word))
        }
      }
      
      children = detectedChildren
      const detectedString = detectedWords.join(" ")
      info.hash = minifyHash(detectedString)
    }
  }
  if (!overrides.includes("reset")) {
    let o = null
    if (opcodeOverride && blocksById[opcodeOverride]) {
      o = {
        type: blocksById[opcodeOverride],
        lang: languages[0],
      }
    }
    if (!o) {
      o = lookupHash(info.hash, info, children, languages)
    }

    if (!o && !opcodeOverride) {
      // Fallback: try matching without icons.
      const cleaningWords = []
      for (const child of children) {
        if (child.isLabel) {
          cleaningWords.push(child.value)
        } else if (!child.isIcon) {
          cleaningWords.push("_")
        }
      }
      const cleanHash = minifyHash(cleaningWords.join(" "))
      o = lookupHash(cleanHash, info, children, languages)
    }

    if (o) {
      lang = o.lang
      type = o.type
      info.language = lang
      info.isRTL = rtlLanguages.includes(lang.code)

      if (
        type.shape === "ring"
          ? info.shape === "reporter"
          : info.shape === "stack"
      ) {
        info.shape = type.shape
      }
      info.category = type.category
      info.categoryIsDefault = true
      // store selector, used for translation among other things
      if (type.selector) {
        info.selector = type.selector
      }
      if (type.id) {
        info.id = type.id
      }
      info.hasLoopArrow = type.hasLoopArrow

      // ellipsis block
      if (type.spec === ". . .") {
        children = [new Label(". . .")]
      }
    } else {
      const firstChild = children[0]
      if (firstChild && firstChild.isLabel && firstChild.value.toLowerCase().startsWith('return')) {
        info.shape = "cap"
        info.category = "custom"
        info.categoryIsDefault = false
      }

      // The block was not recognised, so we check if it's a define block.
      //
      // We check for built-in blocks first to avoid ambiguity, e.g. the
      // `defina o tamanho como (100) %` block in pt_BR.
      for (const lang of languages) {
        if (!isDefineBlock(children, lang)) {
          continue
        }

        // Setting the shape also triggers some logic in recogniseStuff.
        info.shape = "define-hat"
        info.category = "custom"

        // Move the children of the define block into an "outline", transforming
        // () and [] shapes as we go.
        const outlineChildren = children
          .splice(
            lang.definePrefix.length,
            children.length - lang.defineSuffix.length,
          )
          .map(child => {
            if (child.isInput && child.isBoolean) {
              // Convert empty boolean slot to empty boolean argument.
              child = paintBlock(
                {
                  shape: "boolean",
                  argument: "boolean",
                  category: "custom-arg",
                },
                [new Label("")],
                languages,
                options,
              )
            } else if (
              child.isInput &&
              (child.shape === "string" || child.shape === "number")
            ) {
              // Convert string inputs to string arguments, number inputs to number arguments.
              const labels = child.value
                .split(/ +/g)
                .map(word => new Label(word))
              child = paintBlock(
                {
                  shape: "reporter",
                  argument: child.shape === "string" ? "string" : "number",
                  category: "custom-arg",
                },
                labels,
                languages,
                options,
              )
            } else if (child.isReporter || child.isBoolean) {
              // Convert variables to number arguments, predicates to boolean arguments.
              if (child.info.categoryIsDefault) {
                child.info.category = "custom-arg"
              }
              child.info.argument = child.isBoolean ? "boolean" : "number"
            }
            return child
          })

        const outlineInfo = {
          shape: "outline",
          category: "custom",
          categoryIsDefault: true,
          hasLoopArrow: false,
        }
        const outline = new Block(outlineInfo, outlineChildren)

        const defaultCustomPrimary = "#ff6680"
        outline.info.color = procedureDefinePrototypeShellHex(defaultCustomPrimary)
        outline.info.defineCustomPrimary = defaultCustomPrimary
        outline.info.isDefaultColor = true

        children.splice(lang.definePrefix.length, 0, outline)
        break
      }
    }
  }

  if (info.shape === "define-hat") {
    const outline = children.find(child => child.isOutline)
    if (outline) {
      let lastShapeOverride = null
      const filteredOverrides = []
      for (const o of overrides) {
        if (overrideShapes.includes(o)) {
          lastShapeOverride = o
        } else {
          filteredOverrides.push(o)
        }
      }
      overrides = filteredOverrides
      if (lastShapeOverride) {
        outline.info.outlineShape = lastShapeOverride
      }
      let lastHex = null
      const overridesNoHex = []
      for (const o of overrides) {
        if (typeof o === "string" && hexColorPat.test(o)) {
          lastHex = o
        } else {
          overridesNoHex.push(o)
        }
      }
      overrides = overridesNoHex
      if (lastHex) {
        const primary = normalizeHexColor(lastHex)
        defineHatPrimaryHex = primary
        outline.info.color = procedureDefinePrototypeShellHex(primary)
        outline.info.defineCustomPrimary = primary
        outline.info.category = ""
        outline.info.categoryIsDefault = false
        for (const c of outline.children) {
          if (c.isBlock) {
            c.info.color = primary
            c.info.defineCustomPrimary = primary
            c.info.category = ""
          }
        }
      }
    }
  }

  // Apply overrides.
  applyOverrides(info, overrides, options)

  if (info.shape === "define-hat" && defineHatPrimaryHex) {
    info.color = defineHatPrimaryHex
    info.defineCustomPrimary = defineHatPrimaryHex
    info.category = ""
    info.categoryIsDefault = false
  }

  // loop arrows
  if (info.hasLoopArrow) {
    children.push(new Icon("loopArrow"))
  }

  const block = new Block(info, children)

  // image replacement
  if (type && iconPat.test(type.spec)) {
    block.translate(lang, true)
  }

  // diffs
  if (info.diff === "+") {
    return new Glow(block)
  }
  block.diff = info.diff

  return block
}

function isDefineBlock(children, lang) {
  if (children.length < lang.definePrefix.length) {
    return false
  }
  if (children.length < lang.defineSuffix.length) {
    return false
  }

  for (let i = 0; i < lang.definePrefix.length; i++) {
    const defineWord = lang.definePrefix[i]
    const child = children[i]
    if (!child.isLabel || minifyHash(child.value) !== minifyHash(defineWord)) {
      return false
    }
  }

  for (let i = 1; i <= lang.defineSuffix.length; i++) {
    const defineWord = lang.defineSuffix[lang.defineSuffix.length - i]
    const child = children[children.length - i]
    if (!child.isLabel || minifyHash(child.value) !== minifyHash(defineWord)) {
      return false
    }
  }

  return true
}

function parseLines(code, languages, options) {
  let tok = code[0]
  let index = 0
  function next() {
    tok = code[++index]
  }
  function peek() {
    return code[index + 1]
  }
  function peekNonWs() {
    for (let i = index + 1; i < code.length; i++) {
      if (code[i] !== " ") {
        return code[i]
      }
    }
  }
  let sawNL

  let define = []
  languages.map(lang => {
    define = define.concat(lang.define)
  })

  function makeBlock(shape, children) {
    const hasInputs = children.filter(x => !x.isLabel).length

    const info = {
      shape: shape,
      category: shape === "reporter" && !hasInputs ? "variables" : "obsolete",
      categoryIsDefault: true,
      hasLoopArrow: false,
    }

    return paintBlock(info, children, languages, options)
  }

  function makeMenu(shape, value) {
    const menu = lookupDropdown(value, languages) || value
    return new Input(shape, value, menu)
  }

  function pParts(end) {
    const children = []
    let label
    let pendingName = null
    let pendingOpcode = null
    let pendingId = null
    let pendingCategory = null
    let pendingColor = null
    let pendingShape = null
    while (tok && tok !== "\n") {
      // So that comparison operators `<()<()>` and `<()>()>` don't need the
      // central <> escaped, we interpret it as a label if particular
      // conditions are met.
      if (
        (tok === "<" || tok === ">") &&
        end === ">" && // We're parsing a predicate.
        children.length === 1 && // There's exactly one AST node behind us.
        !children[children.length - 1].isLabel // That node is not a label.
      ) {
        const c = peekNonWs()
        // The next token starts some kind of input.
        if (c === "[" || c === "(" || c === "<" || c === "{") {
          label = null
          children.push(new Label(tok))
          next()
          continue
        }
      }
      if (tok === end) {
        break
      }
      if (tok === "/" && peek() === "/" && !end) {
        break
      }

      switch (tok) {
        case "[": {
          label = null
          const input = pString()
          if (pendingName) {
            input.name = pendingName
            pendingName = null
          }
          children.push(input)
          break
        }
        case "(": {
          label = null
          const input = pReporter()
          if (pendingName) {
            input.name = pendingName
            pendingName = null
          }
          children.push(input)
          break
        }
        case "<": {
          label = null
          const input = pPredicate()
          if (pendingName) {
            input.name = pendingName
            pendingName = null
          }
          children.push(input)
          break
        }
        case "{": {
          label = null
          const input = pEmbedded()
          if (pendingName) {
            input.name = pendingName
            pendingName = null
          }
          children.push(input)
          break
        }

        case " ":
        case "\t":
          next() // Skip over whitespace.
          label = null
          break
        case "◂":
        case "▸":
          children.push(pIcon())
          label = null
          break
        case "@": {
          next()
          let name = ""
          if (tok === "(") {
            next()
            while (tok && tok !== ")") {
              name += tok
              next()
            }
            if (tok === ")") {
              next()
            }
          } else {
            while (tok && /[a-zA-Z0-9_-]/.test(tok)) {
              name += tok
              next()
            }
          }

          if (
            tok === "(" &&
            (name === "opcode" ||
              name === "argumentname" ||
              name === "category" ||
              name === "color" ||
              name === "shape" ||
              name === "id")
          ) {
            const type = name
            next() // (
            let value = ""
            while (tok && tok !== ")") {
              value += tok
              next()
            }
            if (tok === ")") {
              next()
            }
            if (type === "opcode") {
              pendingOpcode = value
            } else if (type === "argumentname") {
              pendingName = value
            } else if (type === "id") {
              pendingId = value
            } else if (type === "category") {
              pendingCategory = value
            } else if (type === "color") {
              pendingColor = value
            } else if (type === "shape") {
              pendingShape = value
            }
            label = null
            break
          }

          if (name === "cloud") {
            children.push(new Label("☁"))
          } else if (name === "+" || name === "-" || name === "plus" || name === "minus") {
            children.push(new Button(name === "plus" ? "+" : name === "minus" ? "-" : name))
          } else {
            children.push(
              Object.prototype.hasOwnProperty.call(Icon.icons, name) ||
                (options.icons &&
                  Object.prototype.hasOwnProperty.call(options.icons, name)) ||
                name.startsWith("data:") ||
                name.includes("://") ||
                name.startsWith("/") ||
                name.startsWith("./")
                ? new Icon(name)
                : new Label(`@${name}`),
            )
          }
          label = null
          break
        }

        case "\\":
          next() // escape character
        // fallthrough
        case ":":
          if (tok === ":" && peek() === ":") {
            const overrides = pOverrides(end)
            if (pendingOpcode) {
              overrides.push(`@opcode(${pendingOpcode})`)
              pendingOpcode = null
            }
            if (pendingId) {
              overrides.push(`@id(${pendingId})`)
              pendingId = null
            }
            if (pendingCategory) {
              overrides.push(pendingCategory)
              pendingCategory = null
            }
            if (pendingColor) {
              overrides.push(pendingColor)
              pendingColor = null
            }
            if (pendingShape) {
              overrides.push(pendingShape)
              pendingShape = null
            }
            children.push(overrides)
            return children
          }

        // fallthrough
        default:
          if (!label) {
            children.push((label = new Label("")))
          }
          label.value += tok
          next()
      }
    }

    const finalOverrides = []
    if (pendingOpcode) {
      finalOverrides.push(`@opcode(${pendingOpcode})`)
      pendingOpcode = null
    }
    if (pendingId) {
      finalOverrides.push(`@id(${pendingId})`)
      pendingId = null
    }
    if (pendingCategory) {
      finalOverrides.push(pendingCategory)
      pendingCategory = null
    }
    if (pendingColor) {
      finalOverrides.push(pendingColor)
      pendingColor = null
    }
    if (pendingShape) {
      finalOverrides.push(pendingShape)
      pendingShape = null
    }
    if (finalOverrides.length) {
      children.push(finalOverrides)
    }

    return children
  }

  function pString() {
    next() // '['
    let s = ""
    let escapeV = false
    while (tok && tok !== "]" && tok !== "\n") {
      if (tok === "\\") {
        next()
        if (tok === "v") {
          escapeV = true
        }
        if (!tok) {
          break
        }
      } else {
        escapeV = false
      }
      s += tok
      next()
    }
    if (tok === "]") {
      next()
    }
    if (s === "+" || s === "-") {
      return new Button(s)
    }
    if (hexColorPat.test(s)) {
      return new Input("color", s)
    }
    return !escapeV && / v$/.test(s)
      ? makeMenu("dropdown", s.slice(0, s.length - 2))
      : new Input("string", s)
  }

  function pBlock(end) {
    const children = pParts(end)
    if (tok && tok === "\n") {
      sawNL = true
      next()
    }
    if (children.length === 0) {
      return
    }

    // standalone reporters
    if (children.length === 1) {
      const child = children[0]
      if (
        child.isBlock &&
        (child.isReporter || child.isBoolean || child.isRing)
      ) {
        return child
      }
    }

    return makeBlock("stack", children)
  }

  function pReporter() {
    next() // '('

    // empty number-dropdown
    if (tok === " ") {
      next()
      if (tok === "v" && peek() === ")") {
        next()
        next()
        return new Input("number-dropdown", "")
      }
    }

    const children = pParts(")")
    if (tok && tok === ")") {
      next()
    }

    // empty numbers
    if (children.length === 0) {
      return new Input("number", "")
    }

    // number
    if (children.length === 1 && children[0].isLabel) {
      const value = children[0].value
      if (/^[0-9e.-]*$/.test(value)) {
        return new Input("number", value)
      }
      if (hexColorPat.test(value)) {
        return new Input("color", value)
      }
    }

    // number-dropdown
    if (children.length > 1 && children.every(child => child.isLabel)) {
      const last = children[children.length - 1]
      if (last.value === "v") {
        children.pop()
        const value = children.map(l => l.value).join(" ")
        return makeMenu("number-dropdown", value)
      }
    }

    const block = makeBlock("reporter", children)

    // rings
    if (block.info && block.info.shape === "ring") {
      const first = block.children[0]
      if (
        first &&
        first.isInput &&
        first.shape === "number" &&
        first.value === ""
      ) {
        block.children[0] = new Input("reporter")
      } else if (
        (first && first.isScript && first.isEmpty) ||
        (first && first.isBlock && !first.children.length)
      ) {
        block.children[0] = new Input("stack")
      }
    }

    return block
  }

  function pPredicate() {
    next() // '<'
    const children = pParts(">")
    if (tok && tok === ">") {
      next()
    }
    if (children.length === 0) {
      return new Checkbox(false)
    }

    const lastChild = children[children.length - 1]
    if (Array.isArray(lastChild) && lastChild.includes("shadow")) {
      const textChildren = children.slice(0, -1)
      const text = textChildren
        .filter(c => c instanceof Label)
        .map(c => c.value.trim())
        .join("")
        .trim()
        .toLowerCase()
      if (text === "true" || text === "false") {
        return new Checkbox(text === "true")
      }
    }

    return makeBlock("boolean", children)
  }

  function pEmbedded() {
    next() // '{'

    sawNL = false
    const f = function () {
      while (tok && tok !== "}") {
        const block = pBlock("}")
        if (block) {
          return block
        }
      }
    }
    const scripts = parseScripts(f)
    let blocks = []
    scripts.forEach(script => {
      blocks = blocks.concat(script.blocks)
    })

    if (tok === "}") {
      next()
    }
    if (!sawNL) {
      assert(blocks.length <= 1)
      return blocks.length ? blocks[0] : makeBlock("stack", [])
    }
    return new Script(blocks)
  }

  function pIcon() {
    const c = tok
    next()
    switch (c) {
      case "▸":
        return new Icon("addInput")
      case "◂":
        return new Icon("delInput")
      default:
        return
    }
  }

  function pOverrides(end) {
    next()
    next()
    const overrides = []
    let override = ""
    while (tok && tok !== "\n" && tok !== end) {
      if (tok === " ") {
        if (override) {
          overrides.push(override)
          override = ""
        }
      } else if (tok === "/" && peek() === "/") {
        break
      } else {
        override += tok
      }
      next()
    }
    if (override) {
      overrides.push(override)
    }
    return overrides
  }

  function pComment(end) {
    next()
    next()
    let commentText = ""
    while (tok && tok !== "\n" && tok !== end) {
      commentText += tok
      next()
    }
    return new Comment(commentText, true)
  }

  function pLine() {
    let diff
    if (tok === "+" || tok === "-") {
      diff = tok
      next()
    }
    const block = pBlock()
    if (tok === "/" && peek() === "/") {
      const comment = pComment()
      comment.hasBlock = block && block.children.length
      if (!comment.hasBlock) {
        return comment
      }
      block.comment = comment
    }

    if (block) {
      block.diff = diff
    }
    return block
  }

  return () => {
    if (!tok) {
      return undefined
    }
    const line = pLine()
    return line || "NL"
  }
}

/* * */

function parseScripts(getLine) {
  let line = getLine()
  function next() {
    line = getLine()
  }

  function pFile() {
    while (line === "NL") {
      next()
    }
    const scripts = []
    while (line) {
      let blocks = []
      while (line && line !== "NL") {
        let b = pLine()
        const isGlow = b.diff === "+"
        if (isGlow) {
          b.diff = null
        }

        if (b.isElse || b.isEnd) {
          b = new Block({ ...b.info, shape: "stack" }, b.children)
        }

        if (isGlow) {
          const last = blocks[blocks.length - 1]
          let children = []
          if (last && last.isGlow) {
            blocks.pop()
            children = last.child.isScript ? last.child.blocks : [last.child]
          }
          children.push(b)
          blocks.push(new Glow(new Script(children)))
        } else if (b.isHat) {
          if (blocks.length) {
            scripts.push(new Script(blocks))
          }
          blocks = [b]
        } else if (b.isFinal) {
          blocks.push(b)
          break
        } else if (b.isCommand) {
          blocks.push(b)
        } else {
          // reporter or predicate
          if (blocks.length) {
            scripts.push(new Script(blocks))
          }
          scripts.push(new Script([b]))
          blocks = []
          break
        }
      }
      if (blocks.length) {
        scripts.push(new Script(blocks))
      }
      while (line === "NL") {
        next()
      }
    }
    return scripts
  }

  function pLine() {
    const b = line
    next()

    if (b.hasScript) {
      while (true) {
        const blocks = pMouth()
        b.children.push(new Script(blocks))
        if (line && line.isElse) {
          for (const child of line.children) {
            b.children.push(child)
          }
          next()
          continue
        }
        if (line && line.isEnd) {
          if (line.info && line.info.forced) {
            b.info.forced = true
          }
          next()
        }
        break
      }
    }
    return b
  }

  function pMouth() {
    const blocks = []
    while (line) {
      if (line === "NL") {
        next()
        continue
      }
      if (!line.isCommand) {
        return blocks
      }

      const b = pLine()
      const isGlow = b.diff === "+"
      if (isGlow) {
        b.diff = null
      }

      if (isGlow) {
        const last = blocks[blocks.length - 1]
        let children = []
        if (last && last.isGlow) {
          blocks.pop()
          children = last.child.isScript ? last.child.blocks : [last.child]
        }
        children.push(b)
        blocks.push(new Glow(new Script(children)))
      } else {
        blocks.push(b)
      }
    }
    return blocks
  }

  return pFile()
}

/* * */

function eachBlock(x, cb) {
  if (x.isScript) {
    x.blocks = x.blocks.map(block => {
      eachBlock(block, cb)
      return cb(block) || block
    })
  } else if (x.isBlock) {
    x.children = x.children.map(child => {
      eachBlock(child, cb)
      return cb(child) || child
    })
  } else if (x.isGlow) {
    eachBlock(x.child, cb)
  }
}

const listBlocks = {
  "append:toList:": 1,
  "deleteLine:ofList:": 1,
  "insert:at:ofList:": 2,
  "setLine:ofList:to:": 1,
  "showList:": 0,
  "hideList:": 0,
}

function recogniseStuff(scripts) {
  const customBlocksByHash = Object.create(null)
  const listNames = new Set()
  const customArgs = new Map()

  scripts.forEach(script => {
    eachBlock(script, block => {
      if (!block.isBlock) {
        return
      }

      // custom blocks
      if (block.info.shape === "define-hat") {
        // There should be exactly one `outline` child, added in paintBlock.
        const outline = block.children.find(child => child.isOutline)
        if (!outline) {
          return
        }

        const color = outline.info.defineCustomPrimary || outline.info.color
        const defineCustomPrimary = outline.info.defineCustomPrimary

        const names = []
        const parts = []
        for (const child of outline.children) {
          if (child.isLabel) {
            parts.push(child.value)
          } else if (child.isBlock) {
            if (!child.info.argument) {
              return
            }
            parts.push(
              {
                number: "%n",
                string: "%s",
                boolean: "%b",
              }[child.info.argument],
            )

            const name = blockName(child)
            names.push(name)
            customArgs.set(name, { color, defineCustomPrimary })
          }
        }
        const spec = parts.join(" ")
        const hash = hashSpec(spec)

        const info = {
          spec: spec,
          names: names,
        }
        if (outline.info.defineCustomPrimary || outline.info.color) {
          info.color =
            outline.info.defineCustomPrimary || outline.info.color
          if (outline.info.defineCustomPrimary) {
            info.defineCustomPrimary = outline.info.defineCustomPrimary
          }
        }
        if (!customBlocksByHash[hash]) {
          customBlocksByHash[hash] = info
        }
        block.info.id = "PROCEDURES_DEFINITION"
        block.info.selector = "procDef"
        block.info.call = info.spec
        block.info.names = info.names
        block.info.category = "custom"

        // custom arguments
      } else if (
        block.info.categoryIsDefault &&
        (block.isReporter || block.isBoolean)
      ) {
        const name = blockName(block)
        if (customArgs.has(name)) {
          const argInfo = customArgs.get(name)
          block.info.category = "custom-arg"
          block.info.categoryIsDefault = false
          block.info.selector = "getParam"
          if (argInfo.color) {
            block.info.color = argInfo.color
          }
          if (argInfo.defineCustomPrimary) {
            block.info.defineCustomPrimary = argInfo.defineCustomPrimary
          }
        }

        // list names
      } else if (
        Object.prototype.hasOwnProperty.call(listBlocks, block.info.selector)
      ) {
        const argIndex = listBlocks[block.info.selector]
        const inputs = block.children.filter(child => !child.isLabel)
        const input = inputs[argIndex]
        if (input && input.isInput) {
          listNames.add(input.value)
        }
      }
    })
  })

  scripts.forEach(script => {
    eachBlock(script, block => {
      // custom arguments (second pass for blocks identified after their definition)
      if (
        block.isBlock &&
        block.info.categoryIsDefault &&
        (block.isReporter || block.isBoolean)
      ) {
        const name = blockName(block)
        if (customArgs.has(name)) {
          const argInfo = customArgs.get(name)
          block.info.category = "custom-arg"
          block.info.categoryIsDefault = false
          block.info.selector = "getParam"
          if (argInfo.color) {
            block.info.color = argInfo.color
          }
          if (argInfo.defineCustomPrimary) {
            block.info.defineCustomPrimary = argInfo.defineCustomPrimary
          }
        }
      }

      if (
        block.info &&
        block.info.categoryIsDefault &&
        block.info.category === "obsolete"
      ) {
        // custom blocks
        const info = customBlocksByHash[block.info.hash]
        if (info) {
          block.info.id = "PROCEDURES_CALL"
          block.info.selector = "call"
          block.info.call = info.spec
          block.info.names = info.names
          block.info.category = "custom"
          if (info.color) {
            block.info.color = info.color
            block.info.category = ""
            block.info.categoryIsDefault = false
          }
          if (info.defineCustomPrimary) {
            block.info.defineCustomPrimary = info.defineCustomPrimary
          }
          return // already done
        }
      }

      if (
        block.isBlock &&
        (block.info.id === "CONTROL_IF" || block.info.id === "CONTROL_IF_ELSE") &&
        !block.children.some(child => child.isButton) &&
        !block.info.forced
      ) {
        block.children.push(new Button("-"))
        block.children.push(new Button("+"))
      }

      let name, info
      if (
        block.isReporter &&
        block.info.category === "variables" &&
        block.info.categoryIsDefault
      ) {
        // We set the selector here for some reason
        block.info.selector = "readVariable"
        name = blockName(block)
        info = block.info
      }
      if (!name) {
        return
      }

      // list reporters
      if (listNames.has(name)) {
        info.category = "list"
        info.categoryIsDefault = false
        info.selector = "contentsOfList:"
      }

      return // already done
    })
  })
}

export function parse(code, options) {
  options = {
    inline: false,
    languages: ["en"],
    detect_blocks: null,
    ...options,
  }

  if (options.dialect) {
    throw new Error("Option 'dialect' no longer supported")
  }

  code = code.replace(/&lt;/g, "<")
  code = code.replace(/&gt;/g, ">")
  if (options.inline) {
    code = code.replace(/\n/g, " ")
  }

  const languages = options.languages.map(code => {
    const lang = allLanguages[code]
    if (!lang) {
      throw new Error(`Unknown language: '${code}'`)
    }
    return lang
  })

  /* * */

  const f = parseLines(code, languages, options)
  const scripts = parseScripts(f)
  recogniseStuff(scripts)
  return new Document(scripts)
}