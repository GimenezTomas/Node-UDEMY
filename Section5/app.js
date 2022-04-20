const { showMenu, pause } = require('./helpers/message')
const { inquirerMenu, pauseMSG, readInput, setQuestionsHome, setQuestionsDelete, confirmAlert, completeTask } = require('./helpers/inquirer')
const Tasks = require('./models/tasks') 
const { saveDB, readDB } = require('./helpers/saveFile')

const main = async() => {
   
    let opt = ''
    const tasks = new Tasks()
    
    tasks.reloadList(readDB())

   do {
       setQuestionsHome()
       opt = await inquirerMenu()
       switch(opt.option){
            case '1':
                const desc = await readInput('Description: ')
                tasks.createTask(desc)
                break
            case '2':
                tasks.listPretty()
                break
            case '3':
                tasks.listPrettyByCompleted(true)
                break
            case '4':
                tasks.listPrettyByCompleted(false)
                break
            case '5':
                id = await completeTask(tasks.listArray)

                if (id.ids != 0) {
                    tasks.completeTask(id.ids)
                }

                break

            case '6':
                setQuestionsDelete(tasks.listArray)

                const deleteOp = await inquirerMenu()
                
                if(deleteOp.option != 0){                    
                    const ok = await confirmAlert('Are you sure?')
                    
                    if (!ok) {tasks.deleteTask(deleteOp.option)}
                }
                break
        }

        saveDB(tasks.listArray)

       await pauseMSG()

    }while ( opt.option != '0' )

}

main()