const { v4: uudiv4 } = require('uuid')

class Task {
    id = ''
    desc = ''
    date = null  

    constructor(desc, id = uudiv4(), date = null){
        this.desc = desc
        this.id = id
        this.date = date
    }

    completed(){
        this.date = new Date().toISOString().replace("T", " ")
    }
}

module.exports = Task
