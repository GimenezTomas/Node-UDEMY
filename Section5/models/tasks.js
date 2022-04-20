const Task = require('./task')
require('colors')

class Tasks{

    list = {}
    
    get listArray(){
        const list = []
        Object.keys(this.list).forEach( key => {
            list.push( this.list[key] )
        })

        return list
    }

    constructor(){
        this.list = {}
    }

    createTask( desc = '' ){
        const task = new Task(desc)
        this.list[ task.id ] = task
    }

    reloadList(tasks = []){
        tasks = JSON.parse(tasks)

        tasks.forEach( task => {
            this.list[task.id] = new Task(task.desc, task.id, task.date)
        })
    }

    listPretty(){
        let list = this.listArray

        for (let i = 0; i < list.length; i++) {
            let status = ( list[i].date ) ? 'Completed'.green : 'Pendient'.red
    
            console.log(`${(i+1).toString().green} ${list[i].desc} :: ${status}`)
        }
    }

    listPrettyByCompleted(completed = false){
        let list = this.listArray
        let laps = 0

        for (let i = 0; i < list.length; i++) {
            if( list[i].date != null && completed){
                laps++
                console.log(`${(i+1).toString()+'.'.green} ${list[i].desc} completed: ${list[i].date} `)
            }else if( !completed && list[i].date == null){
                laps++
                console.log(`${((i+1)+'.').red} ${list[i].desc}`)
            }
        }   
    }

    deleteTask(id){
       delete this.list[id]
    }

    completeTask(idsArray){
        idsArray.forEach(id => {
            this.list[id].completed()
        })
    }
}

module.exports = Tasks