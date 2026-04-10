export const penguinModBlocks = [
  {
    id: "penguinmod:return",
    spec: "return %1",
    inputs: ["%s"],
    shape: "cap",
    category: "custom",
  },
  {
    id: "penguinmod:return_no_val",
    spec: "return",
    inputs: [],
    shape: "cap",
    category: "custom",
  },
  {
    id: "CONTROL_ELSEIF",
    selector: "doIfElse",
    spec: "else if %1 then",
    inputs: ["%b"],
    shape: "celse-if",
    category: "control",
  },
  {
    id: "penguinmod:break",
    spec: "break",
    inputs: [],
    shape: "cap",
    category: "control",
  },
  {
    id: "penguinmod:continue",
    spec: "continue",
    inputs: [],
    shape: "cap",
    category: "control",
  },
]

export const penguinModTranslations = {
  en: {
    "penguinmod:return": "return %1",
    "penguinmod:return_no_val": "return",
    CONTROL_ELSEIF: "else if %1 then",
    "penguinmod:break": "break",
    "penguinmod:continue": "continue",
  },
}

export function isReturnCapBlock(children) {
  const firstChild = children[0]
  return (
    firstChild &&
    firstChild.isLabel &&
    firstChild.value.toLowerCase().startsWith("return")
  )
}
