import init from "./index.js"

const penguinblocks =
  (window.penguinblocks =
  window.scratchblocks =
    init(window))

// add our CSS to the page
penguinblocks.appendStyles()

export default penguinblocks
