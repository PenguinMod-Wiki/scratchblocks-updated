import { parse } from "../index.js"

test("uri icon parsing", () => {
  const code = "@(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==)"
  const doc = parse(code)
  const block = doc.scripts[0].blocks[0]
  const icon = block.children[0]
  expect(icon.isIcon).toBe(true)
  expect(icon.name).toContain("data:image/png")
  expect(doc.stringify()).toContain("@(data:image/png")

  const httpCode = "@(https://extensions.turbowarp.org/dango.png)"
  const httpDoc = parse(httpCode)
  const httpBlock = httpDoc.scripts[0].blocks[0]
  const httpIcon = httpBlock.children[0]
  expect(httpIcon.isIcon).toBe(true)
  expect(httpIcon.name).toBe("https://extensions.turbowarp.org/dango.png")
  expect(httpDoc.stringify()).toContain("@(https://extensions.turbowarp.org/dango.png)")
})

test("reporters with uri icons", () => {
  const code = "(@(data:image/png;...))"
  const doc = parse(code)
  const block = doc.scripts[0].blocks[0]
  const icon = block.children[0]
  expect(icon.isIcon).toBe(true)
})
