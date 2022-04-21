const inquirer = require('inquirer')
require('colors')

const setQuestionsHome = () => {
    questions = [
        {
            name: 'option',
            type: 'list',
            message: 'What do you want to do?',
            choices: [
                {
                    value: '1',
                    name: `${'1.'.green} Create task` 
                },{
                    value: '2',
                    name: `${'2.'.green} List task` 
                },{
                    value: '3',
                    name: '3.'.green + ' List completed task' 
                },{
                    value: '4',
                    name: '4.'.green + ' List pendient task' 
                },{
                    value: '5',
                    name: '5.'.green + ' Complete task(s)' 
                },{
                    value: '6',
                    name: '6.'.green +' Remove task' 
                },{
                    value: '0',
                    name: '0.'.green +' Exit' 
                }
            ]
        }
    ]
}

const setQuestionsDelete = (tasks) => {
    let choices =  [{
        value: '0',
        name: '0.'.green + ' Cancel'
    }]

    tasks.forEach( (task, i) => {
        choices.push({
            value: task.id,
            name: ((i+1)+ '. ').green + task.desc
        })
    })
    
    questions = [
        {
            name: 'option',
            type: 'list',
            message: 'What do you want to delete?',
            choices
        }
    ]
}

const completeTask = async(tasks) => {
    let choices =  [{
        value: '0',
        name: '0.'.green + ' Cancel',
        checked: false
    }]
    
    tasks.forEach( (task, i) => {
        choices.push({
            value: task.id,
            name: ((i+1)+ '. ').green + task.desc,
            checked: false
        })
    })
    
    questions = [
        {
            name: 'ids',
            type: 'checkbox',
            message: 'Select all the tasks that you want to complete',
            choices
        }
    ]

    return { ids } = await inquirerMenu()
}

const inquirerMenu = async() => {
    
    console.clear()
    console.log('==========================='.green)
    console.log('CHOOSE AN OPTION'.green)
    console.log('==========================='.green)

    return { option } = await inquirer.prompt(questions)
}

const pauseMSG = async() => {
    const question = [
        {
            name: 'pause',
            type: 'input',
            message: "Please push"+" ENTER ".green+"to continue",
        }
    ]
    console.log('\n')
    await inquirer.prompt(question)
}

const readInput = async( message ) => {
    const question = [{
        type: 'input', 
        name: 'desc',
        message,
        validate( value ){
            if( value.length === 0 ){
                return 'Please type something to continue'
            }
            return true
        }
    }]

    return { desc } = await inquirer.prompt( question )
}

const confirmAlert = async( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    return { ok } = await inquirer.prompt( question )
}

module.exports = {
    inquirerMenu,
    pauseMSG,
    readInput,
    setQuestionsHome,
    setQuestionsDelete,
    confirmAlert,
    completeTask
}