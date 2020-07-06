class Sparrow {
    constructor () {}

    apply (compiler) {
        compiler.hooks.run.tap('onCompile', name => {
            console.log('my plugin is run\n')
        })
    }
}

module.exports = Sparrow