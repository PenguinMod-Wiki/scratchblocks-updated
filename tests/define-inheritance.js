import { parse } from "../index.js"

test("custom block definition inheritance", () => {
  const code = "define custom block (arg) :: #ff0000"
  const doc = parse(code)
  const hat = doc.scripts[0].blocks[0]
  const outline = hat.children.find(c => c.isOutline)
  const arg = outline.children.find(c => c.isBlock && c.info.argument)

  expect(hat.info.color).toBe("#ff0000")
  expect(outline.info.color).not.toBeNull()
  expect(arg.info.color).toBe("#ff0000")
})
