import languages from "../locales/all.js"
export default function init(penguinblocks) {
  penguinblocks.loadLanguages(languages)
}
init.languages = languages

