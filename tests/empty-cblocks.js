import { parse } from "../index.js"

test("empty reporter with C block (mouth)", () => {
  const code = "(reporter {})"
  const doc = parse(code)
  const block = doc.scripts[0].blocks[0]
  expect(block.isReporter).toBe(true)
  expect(block.children.some(c => c.isScript)).toBe(true)

  const scriptChild = block.children.find(c => c.isScript)
  expect(scriptChild).toBeDefined()
  expect(scriptChild.blocks).toEqual([])
  expect(scriptChild.isEmbedded).toBe(true)

  const actualOutput = doc.stringify()
  expect(actualOutput).toContain("(reporter")
  expect(actualOutput).toContain("{}")
})

test("empty boolean with C block (mouth)", () => {
  const code = "<predicate {}>"
  const doc = parse(code)
  const block = doc.scripts[0].blocks[0]
  expect(block.isBoolean).toBe(true)
  expect(block.children.some(c => c.isScript)).toBe(true)

  const scriptChild = block.children.find(c => c.isScript)
  expect(scriptChild).toBeDefined()
  expect(scriptChild.blocks).toEqual([])
  expect(scriptChild.isEmbedded).toBe(true)

  const actualOutput = doc.stringify()
  expect(actualOutput).toContain("<predicate")
  expect(actualOutput).toContain("{}")
})
