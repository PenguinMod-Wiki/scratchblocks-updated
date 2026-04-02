`penguinblocks` is a fork of `scratchblocks`, adapted to the needs of PenguinMod. 

It has a new syntax, which we will document here as the fork progresses.
This documentation covers both the block code syntax and the JavaScript APIs in the library.

# Block Code
This section will explain everything related to the block code syntax.

## Inline Reporters
Standard blocks can be used as inline elements within other blocks by wrapping them in curly braces. This is useful for creating complex nested structures that still read naturally.

Example:

```
inline block {
    hello world
}::reporter control
```
```blocks
inline block {
    hello world
}::reporter control
```

## Opcode and Argument Injection
You can manually specify internal metadata for blocks, such as opcodes and argument names. One possible use case for this is when creating automated tools that scrape data from the PenguinMod wiki.

Example: `block with @argumentname(yes)() at @argumentname(x)() @argumentname(y)()::@opcode(ext_block)`
```blocks
block with @argumentname(yes)() at @argumentname(x)() @argumentname(y)()::@opcode(ext_block)
```
It looks the same when rendered, but the internal SVG metadata is used to identify the block and its arguments. Try using inspect element on this block to see the difference!

## Data URI Icons
You can embed custom icons directly into blocks using Data URIs. If an icon is placed at the start of a block, it will be rendered in the extension style, which includes a vertical separator line.

Example: `@(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwLDAsNjku...) Custom Icon Extension`
```blocks
@(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwLDAsNjkuNDM1MTQsODEuODUzNjEiIGhlaWdodD0iODEuODUzNjEiIHdpZHRoPSI2OS40MzUxNCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImNvbG9yLTEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB5Mj0iMTkxLjg0MTM3IiB4Mj0iMjQwLjA3NDA0IiB5MT0iMTQxLjE1MDkyIiB4MT0iMjQwLjA3NDA0Ij48c3RvcCBzdG9wLWNvbG9yPSIjMDBhNWZmIiBvZmZzZXQ9IjAiLz48c3RvcCBzdG9wLWNvbG9yPSIjMDA2NWZmIiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA0Ljc4MjQzLC0xMzkuNDk1NDcpIj48ZyBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2U9IiMwMDMxNmIiIGZpbGwtcnVsZT0ibm9uemVybyIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9Ij48cGF0aCBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJ1cmwoI2NvbG9yLTEpIiBkPSJNMjA3LjQzMDUyLDE4Ny4yNjY0MnYtNDIuNDU1NTRjMCwwIDcuNDUwMDgsLTMuNjU5OTYgMTUuODExNzEsLTMuNjU5OTZjOC45ODk3MywwIDI1LjQ3NjM1LDguMjM0OTEgMzMuODMzNjYsOC4yMzQ5MWM4LjI5MjM0LDAgMTUuNjQxNjksLTQuNTc0OTUgMTUuNjQxNjksLTQuNTc0OTV2NDIuNDU1NTRjMCwwIC03LjM3NzI1LDQuNTc0OTUgLTE1LjY0MTY5LDQuNTc0OTVjLTcuNTEwNzcsMCAtMjQuNTc4NzMsLTguMjM0OTEgLTMyLjk4MzU3LC04LjIzNDkxYy04LjczMDY1LDAgLTE2LjY2MTgsMy42NTk5NiAtMTYuNjYxOCwzLjY1OTk2eiIvPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI1IiBmaWxsPSJub25lIiBkPSJNMjA3LjI4MjQ0LDIxOC44NDkwOHYtNzYuODUzNjEiLz48L2c+PC9nPjwvc3ZnPgo8IS0tcm90YXRpb25DZW50ZXI6MzUuMjE3NTY1MDAwMDAwMDE6NDAuNTA0NTI5OTk5OTk5OTktLT4=) Custom Icon Extension
```

## Custom Block Shapes and Colors
Custom block definitions can now be forced into reporter or boolean shapes. Additionally, you can provide a hex color directly in the definition. The corresponding calling blocks will automatically inherit this color.

Example:

```
define hello (name)::reporter #2788e8
return (join [Hello, ] (name) [!]::operators) :: cap custom

when flag clicked
say (hello [Gen1x])
```


```blocks
define hello (name)::reporter #2788e8
return (join [Hello, ] (name) [!]::operators) :: cap custom

when flag clicked
say (hello [Gen1x])
```

The example above defines a reporter custom block with a blue background. When the block is called later, it maintains that specific styling.

# JavaScript API
TODO, sorry :P