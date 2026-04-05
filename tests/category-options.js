import { parse } from "../syntax/index.js"
import { newView } from "../scratch3/index.js"
import { newView as newView2 } from "../scratch2/index.js"

describe("Custom categories options", () => {
  it("are handled correctly in Scratch 3", () => {
    const code = "my test block :: myCategory"
    const options = {
      categories: {
        myCategory: {
          color: "#ff0000",
          icon: "greenFlag",
        },
      },
    }
    const doc = parse(code, options)

    const view = newView(doc, options)
    const scriptView = view.scripts[0]
    const blockView = scriptView.blocks[0]

    expect(blockView.info.color).toBe("#ff0000")
    expect(
      blockView.children.some(
        child => child.isIcon && child.name === "greenFlag",
      ),
    ).toBe(true)
  })

  it("supports custom icons with category options", () => {
    const code = "my test block :: myCategory"
    const customIconURI =
      "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwLDAsNjkuNDM1MTQsODEuODUzNjEiIGhlaWdodD0iODEuODUzNjEiIHdpZHRoPSI2OS40MzUxNCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImNvbG9yLTEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB5Mj0iMTkxLjg0MTM3IiB4Mj0iMjQwLjA3NDA0IiB5MT0iMTQxLjE1MDkyIiB4MT0iMjQwLjA3NDA0Ij48c3RvcCBzdG9wLWNvbG9yPSIjMDBhNWZmIiBvZmZzZXQ9IjAiLz48c3RvcCBzdG9wLWNvbG9yPSIjMDA2NWZmIiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA0Ljc4MjQzLC0xMzkuNDk1NDcpIj48ZyBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2U9IiMwMDMxNmIiIGZpbGwtcnVsZT0ibm9uemVybyIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9Ij48cGF0aCBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJ1cmwoI2NvbG9yLTEpIiBkPSJNMjA3LjQzMDUyLDE4Ny4yNjY0MnYtNDIuNDU1NTRjMCwwIDcuNDUwMDgsLTMuNjU5OTYgMTUuODExNzEsLTMuNjU5OTZjOC45ODk3MywwIDI1LjQ3NjM1LDguMjM0OTEgMzMuODMzNjYsOC4yMzQ5MWM4LjI5MjM0LDAgMTUuNjQxNjksLTQuNTc0OTUgMTUuNjQxNjksLTQuNTc0OTV2NDIuNDU1NTRjMCwwIC03LjM3NzI1LDQuNTc0OTUgLTE1LjY0MTY5LDQuNTc0OTVjLTcuNTEwNzcsMCAtMjQuNTc4NzMsLTguMjM0OTEgLTMyLjk4MzU3LC04LjIzNDkxYy04LjczMDY1LDAgLTE2LjY2MTgsMy42NTk5NiAtMTYuNjYxOCwzLjY1OTk2eiIvPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI1IiBmaWxsPSJub25lIiBkPSJNMjA3LjI4MjQ0LDIxOC44NDkwOHYtNzYuODUzNjEiLz48L2c+PC9nPjwvc3ZnPgo8IS0tcm90YXRpb25DZW50ZXI6MzUuMjE3NTY1MDAwMDAwMDE6NDAuNTA0NTI5OTk5OTk5OTktLT4="

    const options = {
      categories: {
        myCategory: {
          color: "#ff0000",
          icon: customIconURI,
        },
      },
    }
    const doc = parse(code, options)

    const view = newView(doc, options)
    const scriptView = view.scripts[0]
    const blockView = scriptView.blocks[0]

    expect(blockView.info.color).toBe("#ff0000")
    expect(
      blockView.children.some(
        child => child.isIcon && child.name === customIconURI,
      ),
    ).toBe(true)
  })

  it("default to extension color if no color provided in Scratch 3", () => {
    const code = "my test block :: myCategory"
    const options = {
      categories: {
        myCategory: {},
      },
    }
    const doc = parse(code, options)

    const view = newView(doc, options)
    const scriptView = view.scripts[0]
    const blockView = scriptView.blocks[0]

    expect(blockView.info.category).toBe("extension")
  })

  it("are handled correctly in Scratch 2", () => {
    const code = "my test block :: myCategory"
    const options = {
      categories: {
        myCategory: {
          color: "#ff0000",
        },
      },
    }
    const doc = parse(code, options)

    const view = newView2(doc, options)
    const scriptView = view.scripts[0]
    const blockView = scriptView.blocks[0]

    expect(blockView.info.color).toBe("#ff0000")
  })

  it("default to extension color if no color provided in Scratch 2", () => {
    const code = "my test block :: myCategory"
    const options = {
      categories: {
        myCategory: {},
      },
    }
    const doc = parse(code, options)

    const view = newView2(doc, options)
    const scriptView = view.scripts[0]
    const blockView = scriptView.blocks[0]

    expect(blockView.info.category).toBe("extension")
  })
})
