class Scope {
    constructor() {
        this.value = new Map()
    }

    setValue(key, val) {
        return this.value.set(key, val)
    }

    getValue(key) {
        return this.value.get(key)
    }
    printAll() {
        for(let map of this.value){
            console.log(map)
        }
    }
}

exports.Scope = Scope