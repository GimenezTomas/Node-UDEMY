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
                    value: 1,
                    name: `${'1.'.green} Search city` 
                },{
                    value: 2,
                    name: `${'2.'.green} Search history` 
                },{
                    value: 0,
                    name: '0.'.green +' Exit' 
                }
            ]
        }
    ]
}

const listPlaces = async(places = []) => {
    let choices =  [{
        value: '0',
        name: '0.'.green + ' Cancel'
    }]

    choices = choices.concat(places.map( (place, i) => {
        return{
            value: place.id,
            name: ((i+1)+ '. ').green + place.place
        }
    }))
    
    questions = [
        {
            name: 'id',
            type: 'list',
            message: 'Please select a place',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions)
    return id
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

    const { option } = await inquirer.prompt(questions)
    return option
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

    const { desc } = await inquirer.prompt( question )
    return desc
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
    listPlaces,
    confirmAlert,
    completeTask
}