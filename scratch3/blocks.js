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
  extensions,
  aliasExtensions,
} from "../syntax/index.js"

import {
  procedureDefineSecondaryHex,
  getContrastColor,
} from "../syntax/blocks.js"

import SVG from "./draw.js"
import style from "./style.js"
const {
  defaultFont,
  commentFont,
  makeStyle,
  makeOriginalIcons,
  makeHighContrastIcons,
  iconName,
} = style

const isURI = name =>
  name &&
  (name.startsWith("data:") ||
    name.includes("://") ||
    name.startsWith("/") ||
    name.startsWith("./"))

const makeCustomShape = (shape, w, h, props) => {
  if (typeof shape === "function") {
    return shape(w, h, props)
  }
  let { path } = shape
  if (typeof path === "function") {
    path = path(w, h)
  }
  if (typeof path === "string") {
    path = path.replace(/{w}/g, w).replace(/{h}/g, h)
  }
  if (!Array.isArray(path)) {
    path = [path]
  }
  return SVG.path({ ...props, path })
}

const octagonalShape = (w, h, props) =>
  SVG.path({
    ...props,
    path: [
      "M 20 0",
      "H", w - 20,
      "l 10 0",
      "l 10 10",
      "v", h - 20,
      "l -10 10",
      "l -10 0",
      "H 20",
      "l -10 0",
      "l -10 -10",
      "v", -(h - 20),
      "l 10 -10",
      "l 10 0",
      "z",
    ],
  })

const roundShape = (w, h, props) => {
  const r = h / 2
  return SVG.path({
    ...props,
    path: [
      "M", r, 0,
      "h", w - 2 * r,
      "a", r, r, 0, 0, 1, 0, h,
      "h", -(w - 2 * r),
      "a", r, r, 0, 0, 1, 0, -h,
      "z",
    ],
  })
}

const squareShape = (w, h, props) =>
  SVG.path({
    ...props,
    path: [
      "m 0,4",
      "A 4,4 0 0,1 4,0",
      "H", w - 4,
      "a 4,4 0 0,1 4,4",
      "v", h - 8,
      "a 4,4 0 0,1 -4,4",
      "H 4",
      "a 4,4 0 0,1 -4,-4",
      "z",
    ],
  })

const leafShape = (w, h, props) =>
  SVG.path({
    ...props,
    path: [
      "m 0,0",
      "m 20,0",
      "H", w - 20,
      "a 20 20 0 0 1 20 20",
      "l 0", h - 28,
      "a 8 8 0 0 1 -8 8",
      "H 20",
      "a 20 20 0 0 1 -20 -20",
      "l 0", -(h - 28),
      "a 8 8 0 0 1 8 -8",
      "z",
    ],
  })

const plusShape = (w, h, props) =>
  SVG.path({
    ...props,
    path: [
      "m 0,0",
      "m 20,0",
      "H", w - 20,
      "l 0 0",
      "a 6 6 0 0 1 6 6",
      "a 6 6 0 0 0 6 6",
      "l 2 0",
      "a 6 6 0 0 1 6 6",
      "l 0 4",
      "a 6 6 0 0 1 -6 6",
      "l -2 0",
      "a 6 6 0 0 0 -6 6",
      "a 6 6 0 0 1 -6 6",
      "l 0 0",
      "H 20",
      "l 0 0",
      "a 6 6 0 0 1 -6 -6",
      "a 6 6 0 0 0 -6 -6",
      "l -2 0",
      "a 6 6 0 0 1 -6 -6",
      "l 0 -4",
      "a 6 6 0 0 1 6 -6",
      "l 2 0",
      "a 6 6 0 0 0 6 -6",
      "a 6 6 0 0 1 6 -6",
      "l 0 0",
      "z",
    ],
  })

const ticketShape = (w, h, props) =>
  SVG.path({
    ...props,
    path: [
      "m 0,0",
      "m 20,0",
      "H", w - 20,
      "h 20",
      "a 2 2 0 0 1 2 2",
      "v 9.3",
      "a 2 2 0 0 1 -2 2",
      "h -10",
      "c -4 2 -4 12 0 13.4",
      "h 10",
      "a 2 2 0 0 1 2 2",
      "v 9.3",
      "a 2 2 0 0 1 -2 2",
      "H 20",
      "h -19",
      "a 2 2 0 0 1 -2 -2",
      "v -9.3",
      "a 2 2 0 0 1 2 -2",
      "h 10",
      "c 4 -2 4 -12 0 -13.4",
      "h -10",
      "a 2 2 0 0 1 -2 -2",
      "v -9.3",
      "a 2 2 0 0 1 2 -2",
      "z",
    ],
  })

const bumpedShape = (w, h, props) =>
  SVG.path({
    ...props,
    path: [
      "m 0,0",
      "m 20,0",
      "H", w - 20,
      "h 6.666666666666667",
      "a 1 1 0 0 1 0 20",
      "a 1 1 0 0 1 0 20",
      "h -6.666666666666667",
      "H 20",
      "h -6.666666666666667",
      "a 1 1 0 0 1 0 -20",
      "a 1 1 0 0 1 0 -20",
      "h 6.666666666666667",
      "z",
    ],
  })

const indentedShape = (w, h, props) =>
  SVG.path({
    ...props,
    path: [
      "m 0,0",
      "m 20,0",
      "H", w - 20,
      "h 20",
      "l -20 20",
      "l 20 20",
      "h -20",
      "H 20",
      "h -20",
      "l 20 -20",
      "l -20 -20",
      "h 20",
      "z",
    ],
  })

const scrappedShape = (w, h, props) =>
  SVG.path({
    ...props,
    path: [
      "m 0,0",
      "m 20,0",
      "H", w - 20,
      "h 20",
      "l -7.5 12.5",
      "l -5 1.25",
      "l 5 2.5",
      "v 7.5",
      "l -5 2.5",
      "l 5 1.25",
      "l 7.5 12.5",
      "h -20",
      "H 20",
      "h -20",
      "l 7.5 -12.5",
      "l 5 -1.25",
      "l -5 -2.5",
      "v -7.5",
      "l 5 -2.5",
      "l -5 -1.25",
      "l -7.5 -12.5",
      "h 20",
      "z",
    ],
  })

const arrowShape = (w, h, props) =>
  SVG.path({
    ...props,
    path: [
      "m 0,0",
      "m 20,0",
      "H 85",
      "c 0.07375 0 0.14687499999999998 0.00175 0.21975 0.0052499999999999995",
      "c 0.8242499999999999 -0.0052499999999999995 2.216125 -0.0052499999999999995 4.1072500000000005 1.23325",
      "l 16.330625 14.996125",
      "c 0.16087500000000002 0.122375 0.315125 0.257125 0.46199999999999997 0.403875",
      "c 0.555875 0.555875 0.93675 1.22025 1.142875 1.925125",
      "l 0.05675 0.094375",
      "l -0.015375 0.056499999999999995",
      "c 0.094625 0.37124999999999997 0.141625 0.752125 0.14075000000000001 1.133",
      "c 0.000875 0.380875 -0.046125 0.761625 -0.14075000000000001 1.132875",
      "l 0.015375 0.056499999999999995",
      "l -0.05675 0.094375",
      "c -0.206125 0.70475 -0.5868749999999999 1.3692499999999999 -1.142875 1.925125",
      "c -0.14687499999999998 0.14687499999999998 -0.30125 0.28150000000000003 -0.46199999999999997 0.403875",
      "l -16.330625 14.996125",
      "c -1.195125 1.212375 -3.830125 1.5434999999999999 -4.327 1.543625",
      "H 20",
      "h -15.308",
      "c -0.771 0 -1.4969999999999999 -0.192875 -2.13225 -0.533125",
      "l -0.09275 -0.049625",
      "l -0.070875 -0.042624999999999996",
      "c -0.55925 -0.330125 -1.041375 -0.7771250000000001 -1.4126250000000002 -1.3075",
      "c -0.9016250000000001 -1.134875 -1.179625 -2.6025 -0.8342499999999999 -3.9427499999999998",
      "l 0.02075 -0.077875",
      "l 0.03 -0.10275",
      "c 0.20875000000000002 -0.68975 0.5855 -1.3395000000000001 1.1308749999999999 -1.88475",
      "l 13.29825 -12.211625",
      "l -13.29825 -12.211625",
      "c -0.54525 -0.54525 -0.9221250000000001 -1.194875 -1.1308749999999999 -1.88475",
      "l -0.030625 -0.109625",
      "l -0.020125 -0.07100000000000001",
      "c -0.38637499999999997 -1.49925 0.0075 -3.1580000000000004 1.181375 -4.331875",
      "c 1.108875 -1.108875 2.77125 -1.2385 4.081125 -1.2385",
      "h 14.58825",
      "z",
    ],
  })

export class LabelView {
  constructor(label) {
    Object.assign(this, label)

    this.el = null
    this.height = 12
    this.metrics = null
    this.x = 0
  }

  get isLabel() {
    return true
  }

  draw(_iconStyle, parent) {
    if (
      parent &&
      parent.info &&
      parent.info.color &&
      parent.isBlock &&
      !parent.info.isDefaultColor &&
      (parent.info.shape === "define-hat" || parent.info.category === "custom")
    ) {
      const textColor = getContrastColor(parent.info.color)
      SVG.setProps(this.el, {
        style: `fill: ${textColor}`,
      })
    }
    return this.el
  }

  get width() {
    return this.metrics.width
  }

  measure() {
    const value = this.value
    const cls = `sb3-${this.cls}`
    this.el = SVG.text(0, 13.1, value, {
      class: `sb3-label ${cls}`,
    })

    let cache = LabelView.metricsCache[cls]
    if (!cache) {
      cache = LabelView.metricsCache[cls] = Object.create(null)
    }

    if (Object.hasOwnProperty.call(cache, value)) {
      this.metrics = cache[value]
    } else {
      const font = /comment-label/.test(this.cls) ? commentFont : defaultFont
      this.metrics = cache[value] = LabelView.measure(value, font)
      // TODO: word-spacing? (fortunately it seems to have no effect!)
    }
  }

  static measure(value, font) {
    const context = LabelView.measuring
    context.font = font
    const textMetrics = context.measureText(value)
    return { width: textMetrics.width }
  }
}

LabelView.metricsCache = {}
LabelView.toMeasure = []

export class IconView {
  constructor(icon, options) {
    Object.assign(this, icon)

    const info =
      IconView.icons[this.name] || (options.icons && options.icons[this.name])
    if (!info) {
      if (isURI(this.name)) {
        Object.assign(this, {
          width: 40,
          height: 40,
          isURIIcon: true,
          naturalWidth: 24,
          naturalHeight: 24,
        })
        return
      }
      throw new Error(`no info for icon: ${this.name}`)
    }
    if (typeof info === "string") {
      Object.assign(this, { width: 24, height: 24 })
    } else {
      Object.assign(this, info)
      if (this.data) delete this.data
      this.width = this.width || 24
      this.height = this.height || 24
    }
    this.naturalWidth = this.width
    this.naturalHeight = this.height
  }

  get isIcon() {
    return true
  }

  draw(iconStyle) {
    const x = (this.width - this.naturalWidth) / 2
    let y = (this.height - this.naturalHeight) / 2
    if (isURI(this.name)) {
      y = y + 2
      return SVG.el("image", {
        href: this.name,
        width: this.naturalWidth,
        height: this.naturalHeight,
        x: x,
        y: y,
      })
    }
    return SVG.symbol(`#sb3-${iconName(this.name, iconStyle)}`, {
      width: this.naturalWidth,
      height: this.naturalHeight,
      x: x,
      y: y,
    })
  }

  static get icons() {
    return {
      greenFlag: { width: 20, height: 21, dy: -1 },
      blueFlag: { width: 20, height: 20 },
      stopSign: { width: 20, height: 20 },
      pause: { width: 20, height: 20 },
      play: { width: 20, height: 20 },
      turnLeft: { width: 24, height: 24 },
      turnRight: { width: 24, height: 24 },
      loopArrow: { width: 24, height: 24 },
      addInput: { width: 4, height: 8 },
      delInput: { width: 4, height: 8 },
      list: { width: 15, height: 18 },
      musicBlock: { width: 40, height: 40 },
      penBlock: { width: 40, height: 40 },
      videoBlock: { width: 40, height: 40, dy: 10 },
      facesensingBlock: { width: 40, height: 40, dy: 3.9932885906 },
      ttsBlock: { width: 40, height: 40 },
      translateBlock: { width: 40, height: 40 },
      wedoBlock: { width: 40, height: 40 },
      ev3Block: { width: 40, height: 40 },
      microbitBlock: { width: 40, height: 40 },
      makeymakeyBlock: { width: 40, height: 40 },
      gdxforBlock: { width: 40, height: 40 },
      boostBlock: { width: 40, height: 40 },
    }
  }
}

export class LineView {
  constructor() {
    this.width = 1
    this.height = 40
    this.x = 0
  }

  get isLine() {
    return true
  }

  measure() {}

  draw(_iconStyle, _parent) {
    const props = {
      class: "sb3-extension-line",
      stroke: "rgba(255, 255, 255, 0.35)",
      "stroke-width": 1,
      "stroke-linecap": "round",
      x1: 0,
      y1: 8,
      x2: 0,
      y2: 32,
    }
    return SVG.el("line", props)
  }
}

export class InputView {
  constructor(input, options) {
    Object.assign(this, input)
    this.options = options
    if (input.label) {
      this.label = newView(input.label, options)
    }
    this.isBoolean = this.shape === "boolean"
    this.isDropdown = this.shape === "dropdown"
    this.isRound = !(this.isBoolean || this.isDropdown)

    this.x = 0
  }

  get isInput() {
    return true
  }

  measure() {
    if (this.hasLabel) {
      this.label.measure()
    }
  }

  static get shapes() {
    return {
      string: SVG.pillRect,
      number: SVG.pillRect,
      "number-dropdown": SVG.pillRect,
      color: SVG.pillRect,
      dropdown: SVG.roundRect,

      boolean: SVG.pointedRect,
      stack: SVG.stackRect,
      reporter: SVG.pillRect,

      octagonal: octagonalShape,
      round: roundShape,
      square: squareShape,
      leaf: leafShape,
      plus: plusShape,
      ticket: ticketShape,
      bumped: bumpedShape,
      indented: indentedShape,
      scrapped: scrappedShape,
      arrow: arrowShape,
    }
  }

  draw(iconStyle, parent) {
    let w
    let label
    let px
    const isDefine = parent.info.shape === "define-hat"
    const isLiteral =
      (this.shape === "string" || this.shape === "number") && !isDefine

    const customShape =
      this.options.shapes && this.options.shapes[this.shape]

    const h = (this.height = (customShape && customShape.height) || 32)

    if (this.isBoolean) {
      w = (customShape && customShape.emptyInputWidth) || 48
    } else if (this.isColor) {
      w = 40
    } else if (this.hasLabel) {
      label = this.label.draw(iconStyle, isLiteral ? this : parent)
      if (this.hasArrow) {
        px =
          customShape &&
          customShape.padding &&
          typeof customShape.padding.left === "number"
            ? customShape.padding.left
            : this.shape === "octagonal" || this.shape === "round"
              ? 16
              : this.shape === "leaf" || this.shape === "plus" || this.shape === "ticket" || this.shape === "bumped" || this.shape === "indented" || this.shape === "scrapped" || this.shape === "arrow"
                ? 24
                : 11
        const pr =
          customShape &&
          customShape.padding &&
          typeof customShape.padding.right === "number"
            ? customShape.padding.right
            : 31
        w = this.label.width + px + pr
      } else {
        // Minimum padding of 11
        // Minimum width of 40, at which point we center the label
        px =
          customShape &&
          customShape.padding &&
          typeof customShape.padding.left === "number"
            ? customShape.padding.left
            : this.shape === "octagonal" || this.shape === "round"
              ? 16
              : this.shape === "leaf" || this.shape === "plus" || this.shape === "ticket" || this.shape === "bumped" || this.shape === "indented" || this.shape === "scrapped" || this.shape === "arrow"
                ? 24
                : this.label.width >= 18
                  ? 11
                  : (40 - this.label.width) / 2
        const pr =
          customShape &&
          customShape.padding &&
          typeof customShape.padding.right === "number"
            ? customShape.padding.right
            : px
        w = this.label.width + px + pr
      }
      const py =
        customShape &&
        customShape.padding &&
        typeof customShape.padding.top === "number"
          ? customShape.padding.top
          : h / 2 - 7
      label = SVG.move(px, py, label)
    } else {
      w = this.isInset ? 30 : null
    }

    if (customShape && typeof customShape.width === "number") {
      w = customShape.width
    }
    this.width = w

    const shapeInfo = customShape || InputView.shapes[this.shape]
    let el
    if (
      customShape &&
      customShape.emptyInputPath &&
      (!this.hasLabel || this.label.value === "")
    ) {
      el = makeCustomShape({ path: customShape.emptyInputPath }, w, h)
    } else if (
      typeof shapeInfo === "object" &&
      !(shapeInfo instanceof Function)
    ) {
      el = makeCustomShape(shapeInfo, w, h)
    } else {
      el = shapeInfo(w, h)
    }

    SVG.setProps(el, {
      class: `${
        this.isColor || parent.info.color ? "" : `sb3-${parent.info.category}`
      } sb3-input sb3-input-${this.shape}`,
    })

    if (this.isColor) {
      SVG.setProps(el, {
        fill: this.value,
      })
    } else if (parent.info.color) {
      if (isLiteral) {
        SVG.setProps(el, {
          fill: "#fff",
          stroke: "rgba(0, 0, 0, 0.2)",
        })
      } else if (this.shape === "dropdown" || this.shape === "number-dropdown") {
        SVG.setProps(el, {
          fill: "rgba(0, 0, 0, 0.2)",
          stroke: "rgba(0, 0, 0, 0.2)",
        })
      } else {
        SVG.setProps(el, {
          fill: parent.info.color,
          stroke: "rgba(0, 0, 0, 0.2)",
        })
      }
    } else if (this.shape === "dropdown") {
    } else if (this.shape === "number-dropdown") {
      el.classList.add(`sb3-${parent.info.category}-alt`)

      if (parent.info.color) {
        SVG.setProps(el, {
          fill: "rgba(0, 0, 0, 0.1)",
          stroke: "rgba(0, 0, 0, 0.15)",
        })
      }
    } else if (this.shape === "boolean") {
      el.classList.remove(`sb3-${parent.info.category}`)
      el.classList.add(`sb3-${parent.info.category}-dark`)

      if (parent.info.color) {
        SVG.setProps(el, {
          fill: "rgba(0, 0, 0, 0.15)",
        })
      }
    }

    const result = SVG.group([el])
    if (this.name) {
      SVG.setProps(result, { "data-argumentname": this.name })
    }
    if (this.hasLabel) {
      result.appendChild(label)
    }
    if (this.hasArrow) {
      result.appendChild(
        SVG.move(
          w - 24,
          12.8505114083, // (12 - ((12 / 12.71) * 8.79)) / 2 + 11
          SVG.symbol(
            iconStyle === "high-contrast"
              ? "#sb3-dropdownArrow-high-contrast"
              : "#sb3-dropdownArrow",
            {},
          ),
        ),
      )
    }
    return result
  }
}

class BlockView {
  constructor(block, options) {
    Object.assign(this, block)
    this.options = options

    this.comment = this.comment ? newView(this.comment, options) : null
    this.isRound =
      this.isReporter ||
      (this.info.shape === "outline" &&
        this.info.outlineShape === "reporter")

    this.info = { ...block.info }

    this.children = block.children.map(node => newView(node, options))

    const isCommand = this.info.shape === "stack" || this.info.shape === "hat"

    const firstChild = block.children[0]
    const firstIsURIIcon =
      isCommand &&
      firstChild instanceof Icon &&
      !Object.prototype.hasOwnProperty.call(Icon.icons, firstChild.name)

    if (
      Object.prototype.hasOwnProperty.call(aliasExtensions, this.info.category)
    ) {
      this.info.category = aliasExtensions[this.info.category]
    }

    const willGetVanillaIcon = Object.prototype.hasOwnProperty.call(
      extensions,
      this.info.category,
    )

    if (willGetVanillaIcon) {
      const icon = new IconView({ name: this.info.category + "Block" }, options)
      icon.width = 52
      this.children.unshift(new LineView())
      this.children.unshift(icon)
      this.info.category = "extension"
    } else if (firstIsURIIcon) {
      const icon = this.children.shift()
      icon.width = 52
      this.children.unshift(new LineView())
      this.children.unshift(icon)
    }

    this.x = 0
    this.width = null
    this.height = null
    this.firstLine = null
    this.innerWidth = null
  }

  get isBlock() {
    return true
  }

  measure() {
    for (const child of this.children) {
      if (child.measure) {
        child.measure()
      }
    }
    if (this.comment && !this.comment.skipDisplay) {
      this.comment.measure()
    }
  }

  static get shapes() {
    return {
      stack: SVG.stackRect,
      "c-block": SVG.stackRect,
      "if-block": SVG.ifElseRect,
      celse: SVG.stackRect,
      cend: SVG.stackRect,

      cap: SVG.capRect,
      reporter: SVG.pillRect,
      boolean: SVG.pointedRect,
      hat: SVG.hatRect,
      cat: SVG.catHat,
      "define-hat": SVG.procHatRect,
      ring: SVG.pillRect,

      octagonal: octagonalShape,
      round: roundShape,
      square: squareShape,
      leaf: leafShape,
      plus: plusShape,
      ticket: ticketShape,
      bumped: bumpedShape,
      indented: indentedShape,
      scrapped: scrappedShape,
      arrow: arrowShape,
    }
  }

  drawSelf(iconStyle, w, h, lines) {
    const categoryClass = this.info.color ? "" : `sb3-${this.info.category}`

    // mouths
    if (lines.length > 1) {
      return SVG.mouthRect(
        w,
        h,
        this.isFinal,
        lines,
        {
          class: categoryClass,
        },
        this.info.shape,
      )
    }

    // outlines
    if (this.info.shape === "outline") {
      const os = this.info.outlineShape || "stack"
      const alt = categoryClass ? `${categoryClass} ${categoryClass}-alt` : ""
      if (os === "reporter" && BlockView.shapes.reporter) {
        return SVG.setProps(BlockView.shapes.reporter(w, h), { class: alt })
      }
      if (os === "boolean" && BlockView.shapes.boolean) {
        return SVG.setProps(BlockView.shapes.boolean(w, h), { class: alt })
      }
      if (os === "cap" && BlockView.shapes.cap) {
        return SVG.setProps(BlockView.shapes.cap(w, h), { class: alt })
      }
      return SVG.setProps(SVG.stackRect(w, h), { class: alt })
    }

    // rings
    if (this.isRing) {
      const child = this.children[0]
      if (child && (child.isInput || child.isBlock || child.isScript)) {
        return SVG.roundRect(w, h, {
          class: categoryClass,
        })
      }
    }

    const shapeInfo =
      (this.options.shapes && this.options.shapes[this.info.shape]) ||
      BlockView.shapes[this.info.shape]
    if (!shapeInfo) {
      throw new Error(`no shape func: ${this.info.shape}`)
    }
    if (typeof shapeInfo === "object" && !(shapeInfo instanceof Function)) {
      return makeCustomShape(shapeInfo, w, h, {
        class: categoryClass,
      })
    }
    return shapeInfo(w, h, {
      class: categoryClass,
    })
  }

  static get padding() {
    return {
      hat: [24, 8],
      cat: [24, 8],
      "define-hat": [20, 16],
      octagonal: [4, 4],
      round: [4, 4],
      square: [4, 4],
      leaf: [4, 4],
      plus: [4, 4],
      ticket: [4, 4],
      bumped: [4, 4],
      indented: [4, 4],
      scrapped: [4, 4],
      arrow: [4, 4],
      null: [4, 4],
    }
  }

  horizontalPadding(child) {
    const customShape =
      this.options.shapes && this.options.shapes[this.info.shape]
    if (customShape && customShape.padding) {
      if (
        child === this.children[0] &&
        typeof customShape.padding.left === "number"
      ) {
        return customShape.padding.left
      }
      if (
        child === this.children[this.children.length - 1] &&
        typeof customShape.padding.right === "number"
      ) {
        return customShape.padding.right
      }
    }

    const shape = this.info.shape
    if (shape === "octagonal" || shape === "round") {
      return 16
    }
    if (shape === "leaf" || shape === "plus" || shape === "ticket" || shape === "bumped" || shape === "indented" || shape === "scrapped" || shape === "arrow") {
      return 24
    }

    if (this.isRound) {
      if (child.isIcon) {
        return this.hasScript ? 12 : 16
      } else if (child.isLabel) {
        return this.hasScript ? 8 : 12 // text in circle: 3 units
      } else if (child.isDropdown) {
        return this.hasScript ? 8 : 12 // square in circle: 3 units
      } else if (child.isButton) {
        return this.hasScript ? 8 : 12
      } else if (child.isBoolean) {
        return this.hasScript ? 8 : 12 // hexagon in circle: 3 units
      } else if (child.isRound) {
        return 4 // circle in circle: 1 unit
      }
    } else if (this.isBoolean) {
      if (child.isIcon) {
        return 24 // icon in hexagon: ???
      } else if (child.isLabel) {
        return 20 // text in hexagon: 5 units
      } else if (child.isDropdown) {
        return 20 // square in hexagon: 5 units
      } else if (child.isButton) {
        return 20
      } else if (child.isRound && child.isBlock) {
        return 24 // circle in hexagon: 5 + 1 units
      } else if (child.isRound) {
        return 20 // circle in hexagon: 5 units
      } else if (child.isBoolean) {
        return 8 // hexagon in hexagon: 2 units
      }
    }
    return 8 // default: 2 units
  }

  marginBetween(a, b) {
    if (a.isIcon && b.isLine) {
      return 0
    }
    if (a.isLine) {
      return 8
    }
    // Consecutive labels should be rendered as a single text element.
    // For now, manually offset by the size of one space
    if (a.isLabel && b.isLabel) {
      return 4.447998046875
    }

    return 8 // default: 2 units
  }

  draw(iconStyle) {
    const isDefine = this.info.shape === "define-hat"
    const outlineShape =
      this.info.shape === "outline"
        ? this.info.outlineShape || "stack"
        : null
    const outlineUsesCommandLayout =
      this.isOutline &&
      outlineShape !== "reporter" &&
      outlineShape !== "boolean"
    let children = this.children
    const isCommand = this.isCommand

    const customShape =
      this.options.shapes && this.options.shapes[this.info.shape]
    let padding =
      (customShape && customShape.padding) ||
      BlockView.padding[this.info.shape] ||
      BlockView.padding.null
    if (!Array.isArray(padding)) {
      padding = [padding.top || 0, padding.bottom || 0]
    }
    const pt = padding[0],
      pb = padding[1]

    let y = this.info.shape === "cat" ? 16 : 0
    const Line = function (y) {
      this.y = y
      this.width = 0
      this.height = isCommand ? 40 : 32
      this.children = []
    }

    let innerWidth = 0
    let scriptWidth = 0
    let line = new Line(y)
    const pushLine = () => {
      if (lines.length === 0) {
        line.height += pt + pb
      } else {
        line.height -= 11
        line.y -= 2
      }
      y += line.height
      lines.push(line)
    }

    if (this.info.isRTL) {
      let start = 0
      const flip = () => {
        children = children
          .slice(0, start)
          .concat(children.slice(start, i).reverse())
          .concat(children.slice(i))
      }
      let i
      for (i = 0; i < children.length; i++) {
        if (children[i].isScript) {
          flip()
          start = i + 1
        }
      }
      if (start < i) {
        flip()
      }
    }

    const lines = []
    let previousChild
    let lastChild
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      child.el = child.draw(iconStyle, this)

      if (
        child.isScript &&
        (this.isCommand || this.isReporter || this.isBoolean)
      ) {
        this.hasScript = true
        pushLine()
        child.y = y - 1
        lines.push(child)
        scriptWidth = Math.max(scriptWidth, Math.max(1, child.width))
        child.height = Math.max(29, child.height + 3) - 2
        y += child.height
        line = new Line(y)
        previousChild = null
      } else if (child.isArrow) {
        line.children.push(child)
        previousChild = child
      } else {
        // Remember the last child on the first line
        if (!lines.length) {
          lastChild = child
        }

        // Leave space between inputs
        if (previousChild) {
          line.width += this.marginBetween(previousChild, child)
        }

        // Align first input with right of notch
        if (children[0] != null) {
          const cmw = 48 - this.horizontalPadding(children[0])
          if (
            (this.isCommand || outlineUsesCommandLayout) &&
            !child.isLabel &&
            !child.isIcon &&
            line.width < cmw
          ) {
            line.width = cmw
          }
        }

        if (child.isIcon && i === 0 && this.isCommand) {
          line.height = Math.max(line.height, child.height + 8)
        }

        child.x = line.width
        line.width += child.width
        innerWidth = Math.max(innerWidth, line.width)
        if (!child.isLabel) {
          line.height = Math.max(line.height, child.height)
        }
        line.children.push(child)
        previousChild = child
      }
    }
    pushLine()

    let padLeft = children.length ? this.horizontalPadding(children[0]) : 0
    const padRight = children.length ? this.horizontalPadding(lastChild) : 0
    innerWidth += padLeft + padRight

    // Commands have a minimum width.
    // Outline min-width is deliberately higher (because Scratch 3 looks silly).
    const originalInnerWidth = innerWidth
    innerWidth = Math.max(
      this.hasScript
        ? 160
        : this.isHat
          ? 100 // Correct for Scratch 3.0.
          : this.isCommand || outlineUsesCommandLayout
            ? 64
            : this.isReporter || outlineShape === "reporter"
              ? 48
              : 0,
      innerWidth,
    )

    // Center the label text inside small reporters.
    if (
      (this.isReporter || outlineShape === "reporter") &&
      !this.hasScript
    ) {
      padLeft += (innerWidth - originalInnerWidth) / 2
    }

    const lastLine = lines[lines.length - 1]
    if (this.hasScript && lastLine && !lastLine.isScript && lastLine.children.some(child => child.isButton)) {
      y += 16
    }
    this.height = y

    this.width = scriptWidth
      ? Math.max(innerWidth, 15 + scriptWidth)
      : innerWidth
    this.firstLine = lines[0]
    this.innerWidth = innerWidth

    const objects = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.isScript) {
        objects.push(SVG.move(16, line.y, line.el))
        continue
      }

      const h = line.height

      for (let j = 0; j < line.children.length; j++) {
        const child = line.children[j]
        if (child.isArrow) {
          objects.push(SVG.move(innerWidth - 32, this.height - 28, child.el))
          continue
        }

        let y = pt + (h - child.height - pt - pb) / 2
        if (child.isLabel && i === 0) {
          // We only do this for the first line so that the `else` label is
          // correctly aligned
          y -= 1
        } else if (isDefine && child.isLabel) {
          y += 3
        } else if (child.isIcon) {
          y += child.dy | 0
        } else if (child.isButton && this.hasScript && i === lines.length - 1) {
          y += 8
        }

        let x = padLeft + child.x
        if (child.isButton && this.hasScript && i === lines.length - 1) {
          x += innerWidth - padRight - line.width - padLeft
        }
        if (child.dx) {
          x += child.dx
        }

        objects.push(SVG.move(x, (line.y + y) | 0, child.el))
      }
    }

    const el = this.drawSelf(iconStyle, innerWidth, this.height, lines)
    objects.splice(0, 0, el)
    if (this.info.color) {
      const stroke = this.info.defineCustomPrimary
        ? procedureDefineSecondaryHex(this.info.defineCustomPrimary)
        : "rgba(0, 0, 0, 0.2)"
      const fill =
        this.info.shape === "define-hat" && this.info.defineCustomPrimary
          ? this.info.defineCustomPrimary
          : this.info.color
      const props = { fill, stroke }
      if (this.info.defineCustomPrimary) {
        props["stroke-linejoin"] = "round"
        props["stroke-linecap"] = "round"
      }
      SVG.setProps(el, props)
    }

    const result = SVG.group(objects)
    if (this.opcode) {
      SVG.setProps(result, { "data-opcode": this.opcode })
    }
    return result
  }
}

export class CommentView {
  constructor(comment, options) {
    Object.assign(this, comment)
    this.label = newView(comment.label, options)

    this.width = null
  }

  get isComment() {
    return true
  }

  static get lineLength() {
    return 12
  }

  get height() {
    return 20
  }

  measure() {
    this.label.measure()
  }

  draw(iconStyle) {
    const labelEl = this.label.draw(iconStyle)

    this.width = this.label.width + 16
    return SVG.group([
      SVG.commentLine(this.hasBlock ? CommentView.lineLength : 0, 6),
      SVG.commentRect(this.width, this.height, {
        class: "sb3-comment",
      }),
      SVG.move(8, 4, labelEl),
    ])
  }
}

class GlowView {
  constructor(glow, options) {
    Object.assign(this, glow)
    this.child = newView(glow.child, options)

    this.width = null
    this.height = null
    this.y = 0
  }

  get isGlow() {
    return true
  }

  measure() {
    this.child.measure()
  }

  drawSelf(iconStyle) {
    const c = this.child
    let el
    const w = this.width
    const h = this.height - 1
    if (c.isScript) {
      if (!c.isEmpty && c.blocks[0].isHat) {
        el = SVG.hatRect(w, h)
      } else if (c.isFinal) {
        el = SVG.capRect(w, h)
      } else {
        el = SVG.stackRect(w, h)
      }
    } else {
      el = c.drawSelf(iconStyle, w, h, [])
    }
    return SVG.setProps(el, {
      class: "sb3-diff sb3-diff-ins",
    })
  }
  // TODO how can we always raise Glows above their parents?

  draw(iconStyle) {
    const c = this.child
    const el = c.isScript ? c.draw(iconStyle, true) : c.draw(iconStyle)

    this.width = c.width
    this.height = (c.isBlock && c.firstLine.height) || c.height

    // encircle
    return SVG.group([el, this.drawSelf(iconStyle)])
  }
}

class ScriptView {
  constructor(script, options) {
    Object.assign(this, script)
    this.blocks = script.blocks.map(node => newView(node, options))

    this.y = 0
  }

  get isScript() {
    return true
  }

  measure() {
    for (const block of this.blocks) {
      block.measure()
    }
  }

  draw(iconStyle, inside) {
    const children = []
    let y = 1
    this.width = 0
    for (const block of this.blocks) {
      const x = inside ? 0 : 2
      const child = block.draw(iconStyle)
      children.push(SVG.move(x, y, child))
      this.width = Math.max(this.width, block.width)

      const diff = block.diff
      if (diff === "-") {
        const dw = block.width
        const dh = block.firstLine.height || block.height
        children.push(SVG.move(x, y + dh / 2 + 1, SVG.strikethroughLine(dw)))
        this.width = Math.max(this.width, block.width)
      }

      y += block.height

      const comment = block.comment
      if (comment && !comment.skipDisplay) {
        const line = block.firstLine
        const cx = block.innerWidth + 2 + CommentView.lineLength
        const cy = y - block.height + line.height / 2
        const el = comment.draw(iconStyle)
        children.push(SVG.move(cx, cy - comment.height / 2, el))
        this.width = Math.max(this.width, cx + comment.width)
      }
    }
    const lastBlock = this.blocks[this.blocks.length - 1]
    this.height = y + 1
    if (!inside && !this.isFinal) {
      this.height += lastBlock.hasPuzzle ? 8 : 0
    }
    if (!inside && lastBlock.isGlow) {
      this.height += 7 // TODO unbreak this
    }
    return SVG.group(children)
  }
}

class DocumentView {
  constructor(doc, options) {
    Object.assign(this, doc)
    this.scripts = doc.scripts.map(node => newView(node, options))

    this.width = null
    this.height = null
    this.el = null
    this.defs = null
    this.scale = options.scale
    this.iconStyle = options.style.replace("scratch3-", "")
    this.customIcons = options.icons || {}
  }

  measure() {
    this.scripts.forEach(script => {
      script.measure()
    })
  }

  render(cb) {
    if (typeof cb === "function") {
      throw new Error("render() no longer takes a callback")
    }

    // measure strings
    this.measure()

    // TODO: separate layout + render steps.
    // render each script
    let width = 0
    let height = 0
    const elements = []
    for (let i = 0; i < this.scripts.length; i++) {
      const script = this.scripts[i]
      if (height) {
        height += 10
      }
      script.y = height
      elements.push(SVG.move(0, height, script.draw(this.iconStyle)))
      height += script.height
      if (i !== this.scripts.length - 1) {
        height += 36
      }
      width = Math.max(width, script.width + 4)
    }
    this.width = width
    this.height = height

    // return SVG
    const svg = SVG.newSVG(width, height, this.scale)
    const icons =
      this.iconStyle === "high-contrast"
        ? makeHighContrastIcons()
        : makeOriginalIcons()

    const iconElements = [...icons]
    Object.keys(this.customIcons).forEach(name => {
      let icon = this.customIcons[name]
      const props = {
        id: `sb3-${name}`,
        width: 24,
        height: 24,
      }
      if (typeof icon !== "string") {
        Object.assign(props, icon)
        icon = icon.data
      }
      if (icon.trim().startsWith("<svg") || icon.trim().startsWith("<g")) {
        iconElements.push(
          SVG.el("g", {
            ...props,
            innerHTML: icon,
          }),
        )
      } else {
        iconElements.push(
          SVG.el("image", {
            ...props,
            href: icon,
          }),
        )
      }
    })
    svg.appendChild(
      (this.defs = SVG.withChildren(SVG.el("defs"), iconElements)),
    )

    svg.appendChild(
      SVG.setProps(SVG.group(elements), {
        style: `transform: scale(${this.scale})`,
      }),
    )
    this.el = svg
    return svg
  }

  /* Export SVG image as XML string */
  exportSVGString() {
    if (this.el == null) {
      throw new Error("call draw() first")
    }

    const style = makeStyle()
    this.defs.appendChild(style)
    const xml = new SVG.XMLSerializer().serializeToString(this.el)
    this.defs.removeChild(style)
    return xml
  }

  /* Export SVG image as data URI */
  exportSVG() {
    const xml = this.exportSVGString()
    return `data:image/svg+xml;utf8,${xml.replace(/[#]/g, encodeURIComponent)}`
  }

  toCanvas(cb, exportScale) {
    exportScale = exportScale || 1.0

    const canvas = SVG.makeCanvas()
    canvas.width = Math.max(1, this.width * exportScale * this.scale)
    canvas.height = Math.max(1, this.height * exportScale * this.scale)
    const context = canvas.getContext("2d")

    const image = new Image()
    image.src = this.exportSVG()
    image.onload = () => {
      context.save()
      context.scale(exportScale, exportScale)
      context.drawImage(image, 0, 0)
      context.restore()

      cb(canvas)
    }
  }

  exportPNG(cb, scale) {
    this.toCanvas(canvas => {
      if (URL && URL.createObjectURL && Blob && canvas.toBlob) {
        canvas.toBlob(blob => {
          cb(URL.createObjectURL(blob))
        }, "image/png")
      } else {
        cb(canvas.toDataURL("image/png"))
      }
    }, scale)
  }
}

class CheckboxView {
  constructor(node) {
    this.value = node.value
    this.width = 48
    this.height = 32
    this.x = 0
  }

  get isCheckbox() {
    return true
  }

  measure() {}

  draw(iconStyle, parent) {
    const w = 48
    const h = 32

    const bg = SVG.pointedRect(w, h, {
      fill: this.value ? "#33D833" : "rgba(0, 0, 0, 0.21)",
      stroke: this.value ? "#389438" : "rgba(0, 0, 0, 0)",
      class: "sb3-input sb3-input-boolean",
    })

    const checkmarkD = this.value
      ? "M -4.5 1.5 A 1 1 90 0 1 -2.5 -0.5 L -1.5 0.5 L 2.5 -3.5 A 1 1 0 0 1 4.5 -1.5 L -0.5 3.5 Q -1.5 4.5 -2.5 3.5 Z"
      : "M -2.5 -4.5 A 1 1 0 0 0 -4.5 -2.5 L -2 0 L -4.5 2.5 A 1 1 0 0 0 -2.5 4.5 L 0 2 L 2.5 4.5 A 1 1 0 0 0 4.5 2.5 L 2 0 L 4.5 -2.5 A 1 1 0 0 0 2.5 -4.5 L 0 -2 Z"

    const mark = SVG.el("path", {
      d: checkmarkD,
      transform: `translate(${w / 2} ${h / 2}) scale(1.5)`,
      fill: "#fff",
      opacity: this.value ? "1" : "0.5",
      class: "sb3-checkbox",
    })

    this.el = SVG.group([bg, mark])
    SVG.setProps(this.el, {
      "data-argument-type": "checkbox",
      "data-shapes": "argument boolean",
    })
    return this.el
  }
}

class ButtonView {
  constructor(node) {
    this.name = node.name
    this.width = 32
    this.height = 32
    this.x = 0
  }

  get isButton() {
    return true
  }

  measure() {}

  draw(iconStyle, parent) {
    const w = 32
    const h = 32

    const bg = SVG.el("rect", {
      x: 0,
      y: 0,
      rx: 4,
      ry: 4,
      width: w,
      height: h,
      fill: "rgba(0, 0, 0, 0)",
      stroke: "rgba(0, 0, 0, 0.21)", // stroke="#00000035" is ~0.21 opacity
    })

    const plusIcon =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIj48ZyBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTEuOTAzIDguNDRDLjg1MSA4LjQ0IDAgNy41MzYgMCA2LjQxOXYtLjgzN2MwLTEuMTE2Ljg1Mi0yLjAyMSAxLjkwMy0yLjAyMWgxLjY1NlYxLjkwM0MzLjU1OS44NTEgNC40NjUgMCA1LjU4MSAwaC44MzdjMS4xMTYgMCAyLjAyMS44NTIgMi4wMjEgMS45MDN2MS42NTZoMS42NTdjMS4wNTIgMCAxLjkwMy45MDYgMS45MDMgMi4wMjJ2LjgzN2MwIDEuMTE2LS44NTIgMi4wMjEtMS45MDMgMi4wMjFIOC40NDF2MS42NTdjMCAxLjA1Mi0uOTA2IDEuOTAzLTIuMDIyIDEuOTAzaC0uODM3Yy0xLjExNiAwLTIuMDIxLS44NTItMi4wMjEtMS45MDNWOC40NDF6IiBmaWxsLW9wYWNpdHk9Ii4xMDIiIGZpbGw9IiMyNDIwMjEiLz48cGF0aCBkPSJNMi4yMjggNy41OThBMS40MjcgMS40MjcgMCAwIDEgLjgwMSA2LjE3MVY1LjgzYTEuNDI3IDEuNDI3IDAgMCAxIDEuNDI3LTEuNDI3aDIuMTc0VjIuMjI4QTEuNDI3IDEuNDI3IDAgMCAxIDUuODI5LjgwMWguMzQxYTEuNDI3IDEuNDI3IDAgMCAxIDEuNDI3IDEuNDI3djIuMTc0aDIuMTc0YTEuNDI3IDEuNDI3IDAgMCAxIDEuNDI3IDEuNDI3di4zNDFhMS40MjcgMS40MjcgMCAwIDEtMS40MjcgMS40MjdINy41OTh2Mi4xNzRhMS40MjcgMS40MjcgMCAwIDEtMS40MjcgMS40MjdINS44M2ExLjQyNyAxLjQyNyAwIDAgMS0xLjQyNy0xLjQyN1Y3LjU5OHoiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+"
    const minusIcon =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSI0Ljg4IiB2aWV3Qm94PSIwIDAgMTIgNC44OCI+PGcgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0xLjkwMyA0Ljg4Qy44NTEgNC44OCAwIDMuOTc2IDAgMi44NTl2LS44MzdDMCAuOTA1Ljg1MiAwIDEuOTAzIDBoOC4xOTNjMS4wNTIgMCAxLjkwMy45MDQgMS45MDMgMi4wMjF2LjgzN2MwIDEuMTE2LS44NTIgMi4wMjEtMS45MDMgMi4wMjF6IiBmaWxsLW9wYWNpdHk9Ii4xMDIiIGZpbGw9IiMyNDIwMjEiLz48cGF0aCBkPSJNMi4yMjggNC4wMzhBMS40MjcgMS40MjcgMCAwIDEgLjgwMSAyLjYxMVYyLjI3QTEuNDI3IDEuNDI3IDAgMCAxIDIuMjI4Ljg0M2g3LjU0NGExLjQyNyAxLjQyNyAwIDAgMSAxLjQyNyAxLjQyN3YuMzQxYTEuNDI3IDEuNDI3IDAgMCAxLTEuNDI3IDEuNDI3eiIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4="

    const icon = SVG.el("image", {
      href: this.name === "+" ? plusIcon : minusIcon,
      x: 5,
      y: 5,
      width: 21.333333333333332,
      height: 21.333333333333332,
    })

    this.el = SVG.group([bg, icon])
    SVG.setProps(this.el, {
      "data-argument-type": "button",
      class: "blocklyEditableText",
    })
    return this.el
  }
}

const viewFor = node => {
  switch (node.constructor) {
    case Label:
      return LabelView
    case Icon:
      return IconView
    case Input:
      return InputView
    case Block:
      return BlockView
    case Checkbox:
      return CheckboxView
    case Button:
      return ButtonView
    case Comment:
      return CommentView
    case Glow:
      return GlowView
    case Script:
      return ScriptView
    case Document:
      return DocumentView
    default:
      throw new Error(`no view for ${node.constructor.name}`)
  }
}

export const newView = (node, options) => {
  return new (viewFor(node))(node, options)
}