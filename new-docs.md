# PenguinBlocks
## What's this?
`penguinblocks` is a fork of `scratchblocks`, adapted for the needs of PenguinMod.

It introduces a new syntax, which will be documented here as the fork progresses.
This documentation covers both the block code syntax and the JavaScript APIs provided by the library.

## Fork Notice
This fork is not affiliated with the original `scratchblocks` library. It is a separate project with its own syntax and features.

`penguinblocks` was made specifically from `scratchblocks`'s v3.6.4. Almost all features from the original library up until that version are preserved, with the exception of 2.0 support.

## 2.0 Deprecation
`penguinblocks` is focused on adding PenguinMod-specific features. Since PenguinMod does not use Scratch 2.0, there is no reason to keep 2.0 support. We do not plan to backport any `penguinblocks` features to 2.0.

If you need 2.0 support, you can use the standard `scratchblocks` library instead.
We apologize for the inconvenience, but this change makes the fork significantly easier to maintain.

# Block Code
This section will explain everything related to the block code syntax.

## Inline Reporters
Standard blocks can be used as inline elements inside other blocks by wrapping them in curly braces. This is useful for building complex nested structures that still read naturally.

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
You can manually specify internal metadata for blocks, such as opcodes and argument names. One example use case is building automated tools that scrape data from the PenguinMod wiki.

Example:
```
block with @argumentname(yes)() at @argumentname(x)()::@opcode(ext_block)
```
```blocks
block with @argumentname(yes)() at @argumentname(x)()::@opcode(ext_block)
```
It looks identical when rendered, but the internal SVG metadata is used to identify the block and its arguments. Try inspecting the element to see the difference!

## Data URI Icons
You can embed custom icons directly into blocks using Data URIs. When an icon is placed at the start of a block, it will be rendered in the extension style, which includes a vertical separator line.

Example: `@(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwLDAsNjku...) Custom Icon Extension`
```blocks
@(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwLDAsNjkuNDM1MTQsODEuODUzNjEiIGhlaWdodD0iODEuODUzNjEiIHdpZHRoPSI2OS40MzUxNCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImNvbG9yLTEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB5Mj0iMTkxLjg0MTM3IiB4Mj0iMjQwLjA3NDA0IiB5MT0iMTQxLjE1MDkyIiB4MT0iMjQwLjA3NDA0Ij48c3RvcCBzdG9wLWNvbG9yPSIjMDBhNWZmIiBvZmZzZXQ9IjAiLz48c3RvcCBzdG9wLWNvbG9yPSIjMDA2NWZmIiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA0Ljc4MjQzLC0xMzkuNDk1NDcpIj48ZyBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2U9IiMwMDMxNmIiIGZpbGwtcnVsZT0ibm9uemVybyIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9Ij48cGF0aCBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJ1cmwoI2NvbG9yLTEpIiBkPSJNMjA3LjQzMDUyLDE4Ny4yNjY0MnYtNDIuNDU1NTRjMCwwIDcuNDUwMDgsLTMuNjU5OTYgMTUuODExNzEsLTMuNjU5OTZjOC45ODk3MywwIDI1LjQ3NjM1LDguMjM0OTEgMzMuODMzNjYsOC4yMzQ5MWM4LjI5MjM0LDAgMTUuNjQxNjksLTQuNTc0OTUgMTUuNjQxNjksLTQuNTc0OTV2NDIuNDU1NTRjMCwwIC03LjM3NzI1LDQuNTc0OTUgLTE1LjY0MTY5LDQuNTc0OTVjLTcuNTEwNzcsMCAtMjQuNTc4NzMsLTguMjM0OTEgLTMyLjk4MzU3LC04LjIzNDkxYy04LjczMDY1LDAgLTE2LjY2MTgsMy42NTk5NiAtMTYuNjYxOCwzLjY1OTk2eiIvPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI1IiBmaWxsPSJub25lIiBkPSJNMjA3LjI4MjQ0LDIxOC44NDkwOHYtNzYuODUzNjEiLz48L2c+PC9nPjwvc3ZnPgo8IS0tcm90YXRpb25DZW50ZXI6MzUuMjE3NTY1MDAwMDAwMDE6NDAuNTA0NTI5OTk5OTk5OTktLT4=) hello!! :: extension // custom icon

go to [nose v] // vanilla icon
```

**Tip**: If you're using the site, you can check the Settings menu to register any icon and summon it without having to enter the URI every time!

## Custom Block Shapes and Colors
Custom block definitions can now be given a reporter or boolean shape. You can also provide a hex color directly in the definition, and any blocks that call it will automatically inherit that color.

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

The example above defines a custom reporter block with a blue background. When the block is called elsewhere, it keeps that styling.

## `else if` Support
Conditional blocks now support multiple `else if` branches, allowing you to write cleaner multi-path logic.

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
Empty boolean inputs can now be rendered as shadow inputs, just like in PenguinMod. To create one, use a predicate with boolean text and append the `::shadow` override.

Example: `check it! <true::shadow>`
```blocks
check it! <true::shadow>
check it! <false::shadow>
```

## New Block Shapes
Several new shapes have been added for both blocks and inputs to support a wider range of visual styles. Available shapes include: `octagonal`, `square`, `leaf`, `plus`, `ticket`, `bumped`, `indented`, `scrapped`, and `arrow`.

Example: `ticket shape block::ticket`
```blocks
ticket shape block::ticket
square input [text]::square
```

## New PM Block Detection
This fork will also add several blocks from PenguinMod that will be detected automatically.
As an example, any block that starts with the word "return" (case-insensitive) will now be automatically be rendered as a cap block, just like the one in PenguinMod!

Example:
```
define hi!
return [value]
```
```blocks
define hi!
return [value]
```

## Plus and Minus icons
The Plus and Minus icons from PenguinMod can be summoned using `[+]`, `[-]`, `@plus`, or `@minus`. They natively support C-blocks and are automatically added to `if` blocks.

Examples:
```
hi i have @plus and @minus :: extension
```
```blocks
hi i have @plus and @minus :: extension
```

```
C-Block {
hello world
} @plus @minus :: control
```
```blocks
C-Block {
hello world
} @plus @minus :: control
```

# JavaScript API
This section will be updated often as new APIs are added.

## Compatibility Alias (`scratchblocks`)
`penguinblocks` is designed to be a drop-in replacement for `scratchblocks`. To make this easy, it exposes a universal `scratchblocks` alias that works across all environments.

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
The Block Detection API lets you define "macros" that automatically expand short-form syntax into long-form block code. This is especially useful for building domain-specific languages on top of the standard syntax.

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
You can register custom icons for use in your blocks via the `icons` option in the rendering functions. Icons can be images (via URL or Data URI) or raw SVG strings.

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

If an icon is a raw SVG string (starting with `<svg` or `<g`), it will be embedded directly into the generated SVG. Otherwise, it will be treated as an image source.

## Custom Block Shapes
You can register custom block shapes via the `shapes` option in the rendering functions. Shapes can be functions that return an SVG path, or objects containing a path string (with `{w}` and `{h}` placeholders) or a path function.

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
You can register custom categories (which behave like extensions) via the `categories` option. This lets extensions use global colors and custom side-icons without adding extra syntax.

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