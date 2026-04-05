# What's this about?
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

Example:
```
block with @argumentname(yes)() at @argumentname(x)()::@opcode(ext_block)
```
```blocks
block with @argumentname(yes)() at @argumentname(x)()::@opcode(ext_block)
```
It looks the same when rendered, but the internal SVG metadata is used to identify the block and its arguments. Try using inspect element on this block to see the difference!

## Data URI Icons
You can embed custom icons directly into blocks using Data URIs. If an icon is placed at the start of a block, it will be rendered in the extension style, which includes a vertical separator line.

Example: `@(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwLDAsNjku...) Custom Icon Extension`
```blocks
@(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwLDAsNjkuNDM1MTQsODEuODUzNjEiIGhlaWdodD0iODEuODUzNjEiIHdpZHRoPSI2OS40MzUxNCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImNvbG9yLTEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB5Mj0iMTkxLjg0MTM3IiB4Mj0iMjQwLjA3NDA0IiB5MT0iMTQxLjE1MDkyIiB4MT0iMjQwLjA3NDA0Ij48c3RvcCBzdG9wLWNvbG9yPSIjMDBhNWZmIiBvZmZzZXQ9IjAiLz48c3RvcCBzdG9wLWNvbG9yPSIjMDA2NWZmIiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA0Ljc4MjQzLC0xMzkuNDk1NDcpIj48ZyBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2U9IiMwMDMxNmIiIGZpbGwtcnVsZT0ibm9uemVybyIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9Ij48cGF0aCBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJ1cmwoI2NvbG9yLTEpIiBkPSJNMjA3LjQzMDUyLDE4Ny4yNjY0MnYtNDIuNDU1NTRjMCwwIDcuNDUwMDgsLTMuNjU5OTYgMTUuODExNzEsLTMuNjU5OTZjOC45ODk3MywwIDI1LjQ3NjM1LDguMjM0OTEgMzMuODMzNjYsOC4yMzQ5MWM4LjI5MjM0LDAgMTUuNjQxNjksLTQuNTc0OTUgMTUuNjQxNjksLTQuNTc0OTV2NDIuNDU1NTRjMCwwIC03LjM3NzI1LDQuNTc0OTUgLTE1LjY0MTY5LDQuNTc0OTVjLTcuNTEwNzcsMCAtMjQuNTc4NzMsLTguMjM0OTEgLTMyLjk4MzU3LC04LjIzNDkxYy04LjczMDY1LDAgLTE2LjY2MTgsMy42NTk5NiAtMTYuNjYxOCwzLjY1OTk2eiIvPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI1IiBmaWxsPSJub25lIiBkPSJNMjA3LjI4MjQ0LDIxOC44NDkwOHYtNzYuODUzNjEiLz48L2c+PC9nPjwvc3ZnPgo8IS0tcm90YXRpb25DZW50ZXI6MzUuMjE3NTY1MDAwMDAwMDE6NDAuNTA0NTI5OTk5OTk5OTktLT4=) hello!! :: extension // custom icon

go to [nose v] // vanilla icon
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

## `else if` Support
Conditional blocks now support multiple `else if` branches, letting you create cleaner multi-path logic.

Example:
```
if <key [space v] pressed?> then
    say [Space!]
else if <mouse down?> then
    say [Click!]
else
    say [Nothing...]
end
```
```blocks
if <key [space v] pressed?> then
    say [Space!]
else if <mouse down?> then
    say [Click!]
else
    say [Nothing...]
end
```

## Shadow Inputs
Empty boolean inputs can now be rendered as shadow inputs, like how they do in PenguinMod. To create one, use a predicate with boolean text and append the `::shadow` override.

Example: `check it! <true::shadow>`
```blocks
check it! <true::shadow>
check it! <false::shadow>
```

## New Block Shapes
We've added several new shapes for both blocks and inputs to support a wider range of visual styles. Available shapes include: `octagonal`, `square`, `leaf`, `plus`, `ticket`, `bumped`, `indented`, `scrapped`, and `arrow`.

Example: `ticket shape block::ticket`
```blocks
ticket shape block::ticket
square input [text]::square
```

## Automatic Cap Blocks
Any block that starts with the word "return" (case-insensitive) will automatically be rendered as a cap block, just like in PenguinMod!

Example:
```
define hi!
return [value]
```
```blocks
define hi!
return [value]
```

# JavaScript API
This section will be updated often as new APIs are added.

## Compatibility Alias (`scratchblocks`)
`penguinblocks` is designed to be a drop-in replacement for `scratchblocks`. To facilitate this, it provides a universal `scratchblocks` alias that works across all environments.

### Browser Environment
When used in a browser, the library automatically registers itself to both `window.penguinblocks` and `window.scratchblocks`.

```javascript
// both of these are equivalent
penguinblocks.renderMatching();
scratchblocks.renderMatching();
```

### Modern JavaScript Environments
For projects using ES modules (like Node.js or bundlers like Webpack and Rollup), you can import the library using either name. We recommend using `penguinblocks` to avoid confusion.

```javascript
// using penguinblocks
import penguinblocks from 'penguinblocks';

// using the scratchblocks alias
import scratchblocks from 'penguinblocks';

// or as a named export
import { scratchblocks } from 'penguinblocks';
```

## Block Detection (Macros)
The Block Detection API allows you to define "macros" that automatically expand short-form syntax into long-form block code. This is particularly useful for building domain-specific languages on top of the standard syntax.

### `addBlockDetection(short, long)`
Registers a new macro transformation.

```javascript
penguinblocks.addBlockDetection(
  "array builder (current)", 
  "array builder (current::square arrays) {}::arrays square"
);
```

To enable macro expansion during parsing, set the `detect_blocks` option to `true`:

```javascript
const doc = penguinblocks.parse(code, { detect_blocks: true });
```

## Custom Icons
You can register custom icons to be used throughout your blocks via the `icons` option in the rendering functions. These icons can be images (via URL or Data URI) or raw SVG strings.

### Usage
To register icons, provide an `icons` object in the options for `renderMatching`, `render`, or `newView`.

```javascript
penguinblocks.renderMatching('pre.blocks', {
  style: 'scratch3',
  icons: {
    // registrate with an URL
    'my-icon': 'https://example.com/icon.png',

    // registrate with a base64 data URI
    'data-icon': 'data:image/svg+xml;base64,...',

    // registrate with an SVG string and custom dimensions
    'svg-icon': {
      data: '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="red" /></svg>',
      width: 40,
      height: 40
    }
  }
});
```

Once registered, you can use these icons in your block syntax using the icon literal:

```
@(my-icon) This block uses a custom icon!
```

If an icon is provided as a raw SVG string (starting with `<svg` or `<g`), it will be embedded directly into the generated SVG. Otherwise, it will be treated as an image source.

## Custom Block Shapes
You can register custom block shapes to be used throughout your blocks via the `shapes` option in the rendering functions. These shapes can be functions that return an SVG path, or objects containing a path string (with `{w}` and `{h}` placeholders) or a path function.

### Usage
To register custom shapes, provide a `shapes` object in the options for `renderMatching`, `render`, or `newView`.

```javascript
penguinblocks.renderMatching('pre.blocks', {
  style: 'scratch3',
  shapes: {
    'my-custom-shape': {
      // height of the block
      height: 32,
      // padding for the block (top, bottom, left, right)
      padding: {
          top: 4,
          bottom: 4,
          left: 4,
          right: 4
      },
      // the path of the block shape
      path: 'm 0,0 m 20,0 H {w}-20 h 20 a 2 2 0 0 1 2 2 v {h}-4.7 a 2 2 0 0 1 -2 2 h -20 H 20 l -20 0 a 2 2 0 0 1 -2 -2 v -{h}+4.7 a 2 2 0 0 1 2 -2 h 20 z'
    }
  }
});
```

Once registered, you can use these shapes in your block syntax using the shape override:

```
my custom shape block::my-custom-shape
```

For more info on how PenguinMod uses custom block shapes in extensions, see the <a href="https://docs.penguinmod.com/development/extensions/api/blocks/custom-block-shape/" target="_blank">PenguinMod Custom Block Shape API</a>.

## Custom Categories / Extensions
You can register custom categories (which act like extensions) via the `categories` option. This allows extensions to seamlessly adopt global colors and custom side-icons without cluttering the syntax.

### Usage
Provide a `categories` object in the options for `renderMatching`, with a map of extension names to configuration objects.

An extension configuration object accepts the following properties:
* `icon` (optional, string): The registered icon ID to use on the left side of the block.
* `color` (optional, string): The hex color to apply. Defaults to the standard `extension` block color if not provided.

```javascript
penguinblocks.renderMatching('pre.blocks', {
  style: 'scratch3',
  categories: {
    'myCategory': {
      color: '#ff4c4c',
      icon: 'my-custom-icon' // note: the icon string must be defined in 'icons'
    }
  }
});
```

When authoring block code, simply append `::myCategory` to map the block to your extension:

```
new block for this extension :: myCategory
```