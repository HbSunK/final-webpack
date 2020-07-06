function extendPrototype () {
    Array.prototype.arrayConcat = function (target) {
        if (Array.isArray(target)) {
            this.push(...target)
        } else {
            this.push(target)
        }

        return this
    }
}

module.exports = extendPrototype