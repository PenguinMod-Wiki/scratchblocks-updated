import SVG from "./draw.js"
import Filter from "./filter.js"
import cssContent from "./style.css.js"

export default class Style {
  static get cssContent() {
    return cssContent
  }

  static makeIcons() {
    return [
      SVG.el("path", {
        d: "M1.504 21L0 19.493 4.567 0h1.948l-.5 2.418s1.002-.502 3.006 0c2.006.503 3.008 2.01 6.517 2.01 3.508 0 4.463-.545 4.463-.545l-.823 9.892s-2.137 1.005-5.144.696c-3.007-.307-3.007-2.007-6.014-2.51-3.008-.502-4.512.503-4.512.503L1.504 21z",
        fill: "#3f8d15",
        id: "greenFlag",
      }),
      SVG.setProps(
        SVG.withChildren(
          SVG.el("symbol", {
            viewBox: "0 0 69.43514 81.85361",
            preserveAspectRatio: "xMidYMid meet",
          }),
          [
            SVG.withChildren(
              SVG.el("defs"),
              [
                SVG.withChildren(
                  SVG.el("linearGradient", {
                    id: "blueFlag-color-1",
                    gradientUnits: "userSpaceOnUse",
                    y2: "191.84137",
                    x2: "240.07404",
                    y1: "141.15092",
                    x1: "240.07404",
                  }),
                  [
                    SVG.el("stop", { "stop-color": "#00a5ff", offset: "0" }),
                    SVG.el("stop", { "stop-color": "#0065ff", offset: "1" }),
                  ],
                ),
              ],
            ),
            SVG.withChildren(
              SVG.el("g", { transform: "translate(-204.78243,-139.49547)" }),
              [
                SVG.withChildren(
                  SVG.el("g", { stroke: "#00316b", "fill-rule": "nonzero" }),
                  [
                    SVG.el("path", {
                      "stroke-linecap": "butt",
                      "stroke-width": "3",
                      fill: "url(#blueFlag-color-1)",
                      d: "M207.43052,187.26642v-42.45554c0,0 7.45008,-3.65996 15.81171,-3.65996c8.98973,0 25.47635,8.23491 33.83366,8.23491c8.29234,0 15.64169,-4.57495 15.64169,-4.57495v42.45554c0,0 -7.37725,4.57495 -15.64169,4.57495c-7.51077,0 -24.57873,-8.23491 -32.98357,-8.23491c-8.73065,0 -16.6618,3.65996 -16.6618,3.65996z",
                    }),
                    SVG.el("path", {
                      "stroke-linecap": "round",
                      "stroke-width": "5",
                      fill: "none",
                      d: "M207.28244,218.84908v-76.85361",
                    }),
                  ],
                ),
              ],
            ),
          ],
        ),
        {
          id: "blueFlag",
        },
      ),
      SVG.setProps(
        SVG.withChildren(
          SVG.el("symbol", {
            id: "stopSign",
            viewBox: "0 0 80.48145 80.48145",
            preserveAspectRatio: "xMidYMid meet"
          }),
          [
            SVG.withChildren(
              SVG.el("defs"),
              [
                SVG.withChildren(
                  SVG.el("linearGradient", {
                    id: "stop-color-1",
                    gradientUnits: "userSpaceOnUse",
                    x1: "240.00001",
                    y1: "141.25928",
                    x2: "240.00001",
                    y2: "218.74073"
                  }),
                  [
                    SVG.el("stop", { "stop-color": "#ff2484", offset: "0" }),
                    SVG.el("stop", { "stop-color": "#c40056", offset: "1" })
                  ]
                ),
              ]
            ),
            SVG.withChildren(
              SVG.el("g", { transform: "translate(-199.75928,-139.75928)" }),
              [
                SVG.withChildren(
                  SVG.el("g", {
                    fill: "url(#stop-color-1)",
                    stroke: "#780034",
                    "stroke-width": "3"
                  }),
                  [
                    SVG.el("path", {
                      d: "M223.95307,218.74073l-22.69379,-22.69379v-32.09387l22.69379,-22.69379h32.09387l22.69379,22.69379v32.09387l-22.69379,22.69379z"
                    })
                  ]
                ),
              ]
            ),
          ]
        ),
        {}
      ),
      SVG.setProps(
        SVG.withChildren(
          SVG.el("symbol", {
            id: "pause",
            viewBox: "0 0 73.77982 80.52076",
            preserveAspectRatio: "xMidYMid meet"
          }),
          [
            SVG.withChildren(
              SVG.el("defs"),
              [
                SVG.withChildren(
                  SVG.el("linearGradient", {
                    id: "pause-color-1",
                    gradientUnits: "userSpaceOnUse",
                    y2: "218.76038",
                    x2: "218.00326",
                    y1: "141.23962",
                    x1: "218.00326"
                  }),
                  [
                    SVG.el("stop", { "stop-color": "#ffe100", offset: "0" }),
                    SVG.el("stop", { "stop-color": "#ffb200", offset: "1" })
                  ]
                ),
                SVG.withChildren(
                  SVG.el("linearGradient", {
                    id: "pause-color-2",
                    gradientUnits: "userSpaceOnUse",
                    y2: "218.76038",
                    x2: "261.99673",
                    y1: "141.23962",
                    x1: "261.99673"
                  }),
                  [
                    SVG.el("stop", { "stop-color": "#ffe100", offset: "0" }),
                    SVG.el("stop", { "stop-color": "#ffb200", offset: "1" })
                  ]
                ),
              ]
            ),
            SVG.withChildren(
              SVG.el("g", { transform: "translate(-203.11009,-139.73962)" }),
              [
                SVG.withChildren(
                  SVG.el("g", {
                    "stroke": "#9b4e00",
                    "stroke-width": "3",
                    "fill-rule": "nonzero"
                  }),
                  [
                    SVG.el("path", { fill: "url(#pause-color-1)", d: "M204.61009,218.76038v-77.52076h26.78635v77.52076z" }),
                    SVG.el("path", { fill: "url(#pause-color-2)", d: "M248.60356,218.76038v-77.52076h26.78635v77.52076z" })
                  ]
                ),
              ]
            ),
          ]
        ),
        {}
      ),
      SVG.setProps(
        SVG.withChildren(
          SVG.el("symbol", {
            id: "play",
            viewBox: "0 0 66.22807 81.50462",
            preserveAspectRatio: "xMidYMid meet"
          }),
          [
            SVG.withChildren(
              SVG.el("defs"),
              [
                SVG.withChildren(
                  SVG.el("linearGradient", {
                    id: "play-color-1",
                    gradientUnits: "userSpaceOnUse",
                    x1: "244.70092",
                    y1: "141.93193",
                    x2: "244.70092",
                    y2: "218.06809"
                  }),
                  [
                    SVG.el("stop", { "stop-color": "#ffe100", offset: "0" }),
                    SVG.el("stop", { "stop-color": "#ffb200", offset: "1" })
                  ]
                ),
              ]
            ),
            SVG.withChildren(
              SVG.el("g", { transform: "translate(-212.268,-139.2477)" }),
              [
                SVG.withChildren(
                  SVG.el("g", {
                    fill: "url(#play-color-1)",
                    "fill-rule": "nonzero",
                    stroke: "#9b4e00",
                    "stroke-width": "3",
                    "stroke-linecap": "butt",
                    "stroke-linejoin": "miter",
                    "stroke-miterlimit": "10"
                  }),
                  [
                    SVG.el("path", {
                      d: "M213.768,141.93193l61.86583,38.06808l-61.86583,38.06808z"
                    })
                  ]
                ),
              ]
            ),
          ]
        ),
        {}
      ),
      SVG.el("path", {
        d: "M6.724 0C3.01 0 0 2.91 0 6.5c0 2.316 1.253 4.35 3.14 5.5H5.17v-1.256C3.364 10.126 2.07 8.46 2.07 6.5 2.07 4.015 4.152 2 6.723 2c1.14 0 2.184.396 2.993 1.053L8.31 4.13c-.45.344-.398.826.11 1.08L15 8.5 13.858.992c-.083-.547-.514-.714-.963-.37l-1.532 1.172A6.825 6.825 0 0 0 6.723 0z",
        fill: "#fff",
        id: "turnRight",
      }),
      SVG.el("path", {
        d: "M3.637 1.794A6.825 6.825 0 0 1 8.277 0C11.99 0 15 2.91 15 6.5c0 2.316-1.253 4.35-3.14 5.5H9.83v-1.256c1.808-.618 3.103-2.285 3.103-4.244 0-2.485-2.083-4.5-4.654-4.5-1.14 0-2.184.396-2.993 1.053L6.69 4.13c.45.344.398.826-.11 1.08L0 8.5 1.142.992c.083-.547.514-.714.963-.37l1.532 1.172z",
        fill: "#fff",
        id: "turnLeft",
      }),
      SVG.el("path", {
        d: "M0 0L4 4L0 8Z",
        fill: "#111",
        id: "addInput",
      }),
      SVG.el("path", {
        d: "M4 0L4 8L0 4Z",
        fill: "#111",
        id: "delInput",
      }),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M8 0l2 -2l0 -3l3 0l-4 -5l-4 5l3 0l0 3l-8 0l0 2",
            fill: "#000",
            opacity: "0.3",
          }),
          SVG.move(
            -1,
            -1,
            SVG.el("path", {
              d: "M8 0l2 -2l0 -3l3 0l-4 -5l-4 5l3 0l0 3l-8 0l0 2",
              fill: "#fff",
              opacity: "0.9",
            }),
          ),
        ]),
        {
          id: "loopArrow",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("rect", {
            x: "0",
            y: "0",
            width: "12",
            height: "14",
            fill: "#000",
            opacity: "0.25",
          }),
          SVG.el("rect", {
            x: "1",
            y: "1",
            width: "1",
            height: "13",
            fill: "#fff",
          }),
          SVG.el("rect", {
            x: "11",
            y: "1",
            width: "1",
            height: "13",
            fill: "#fff",
          }),
          SVG.el("rect", {
            x: "2",
            y: "1",
            width: "9",
            height: "1",
            fill: "#fff",
          }),
          SVG.el("rect", {
            x: "2",
            y: "5",
            width: "9",
            height: "1",
            fill: "#fff",
          }),
          SVG.el("rect", {
            x: "2",
            y: "9",
            width: "9",
            height: "1",
            fill: "#fff",
          }),
          SVG.el("rect", {
            x: "2",
            y: "13",
            width: "9",
            height: "1",
            fill: "#fff",
          }),
          SVG.el("rect", {
            x: "2",
            y: "2",
            width: "9",
            height: "2",
            fill: "#ea8d1c",
          }),
          SVG.el("rect", {
            x: "2",
            y: "6",
            width: "9",
            height: "2",
            fill: "#ea8d1c",
          }),
          SVG.el("rect", {
            x: "2",
            y: "10",
            width: "9",
            height: "2",
            fill: "#ea8d1c",
          }),
          SVG.el("rect", {
            x: "11",
            y: "0",
            width: "1",
            height: "1",
            fill: "#ea8d1c",
          }),
          SVG.el("rect", {
            x: "0",
            y: "13",
            width: "1",
            height: "1",
            fill: "#ea8d1c",
          }),
        ]),
        {
          id: "list",
        },
      ),
    ]
  }

  static makeStyle() {
    const style = SVG.el("style")
    style.appendChild(SVG.cdata(Style.cssContent))
    return style
  }

  static bevelFilter(id, inset) {
    const f = new Filter(id)

    const alpha = "SourceAlpha"
    const s = inset ? -1 : 1
    const blur = f.blur(1, alpha)

    f.merge([
      "SourceGraphic",
      f.comp(
        "in",
        f.flood("#fff", 0.15),
        f.subtract(alpha, f.offset(+s, +s, blur)),
      ),
      f.comp(
        "in",
        f.flood("#000", 0.7),
        f.subtract(alpha, f.offset(-s, -s, blur)),
      ),
    ])

    return f.el
  }

  static darkFilter(id) {
    const f = new Filter(id)

    f.merge([
      "SourceGraphic",
      f.comp("in", f.flood("#000", 0.2), "SourceAlpha"),
    ])

    return f.el
  }

  static darkRect(w, h, category, el) {
    return SVG.setProps(
      SVG.group([
        SVG.setProps(el, {
          class: `sb-${category} sb-darker`,
        }),
      ]),
      { width: w, height: h },
    )
  }

  static get defaultFontFamily() {
    return "Lucida Grande, Verdana, Arial, DejaVu Sans, sans-serif"
  }
}

