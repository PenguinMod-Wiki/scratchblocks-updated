import fs from "fs"

console.log = (...args) => {
  fs.writeFileSync(1, args.join(" ") + "\n")
}

console.warn = (...args) => {
  fs.writeFileSync(1, args.join(" ") + "\n")
}

console.error = (...args) => {
  fs.writeFileSync(2, args.join(" ") + "\n")
}
