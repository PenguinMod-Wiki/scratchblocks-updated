import { parse, loadLanguages } from "../index.js"
import es from "../locales/es.json"

loadLanguages({ es })

test("control else if then block", () => {
  const code = "else if <true> then"
  const doc = parse(code)
  const block = doc.scripts[0].blocks[0]
  expect(block.info.id).toBe("CONTROL_ELSEIF")
  expect(block.info.shape).toBe("celse-if")
  expect(doc.stringify()).toContain("else if <true> then")
})

test("control if then else if then else block structure", () => {
  const code = `
if <true> then
  move (10) steps
else if <false> then
  move (20) steps
else
  move (30) steps
end
`
  const doc = parse(code)
  const script = doc.scripts[0]
  expect(script.blocks.length).toBe(1)
  const op = script.blocks[0]
  expect(op.info.id).toBe("CONTROL_IF")

  expect(op.children.some(c => c.value === "else" && c.isLabel)).toBe(true)
  expect(op.children.some(c => c.value === "if" && c.isLabel)).toBe(true)
  expect(doc.stringify()).toContain("if <true> then")
  expect(doc.stringify()).toContain("else if <false> then")
})
