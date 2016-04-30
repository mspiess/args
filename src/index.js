import parser from 'minimist'

class Commander {
  constructor() {
    this.args = parser(process.argv.slice(2))
  }

  option (name, description, defaultValue) {
    let variants = []

    switch (name.constructor) {
      case String:
        variants[0] = name.charAt(0)
        variants[1] = name

        break
      case Array:
        variants.concat(name)
        break
      default:
        console.error(`Invalid name for option ${name}`)
    }

    this.setProperties(variants, defaultValue)
    return this
  }

  setProperties (names, initial) {
    let value = false

    for (let name of names) {
      let fromArgs = this.args[name]

      if (fromArgs) {
        value = fromArgs
      }
    }

    for (let name of names) {
      this[name] = value
    }
  }
}

export default new Commander
