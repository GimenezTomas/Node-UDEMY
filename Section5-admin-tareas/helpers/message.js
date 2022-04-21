const { resolve } = require('path')

require('colors')

const showMenu = () => {
    return new Promise( resolve => {
      
        console.clear()
        console.log('==========================='.green)
        console.log('CHOOSE AN OPTION'.green)
        console.log('==========================='.green)

        console.log(`${'1.'.green} Create task`)
        console.log(`${'2.'.green} List tasks`)
        console.log(`${'3.'.green} List completed tasks`)
        console.log(`${'4.'.green} List pendient tasks`)
        console.log(`${'5.'.green} Complete task(s)`)
        console.log(`${'6.'.green} Remove task`)
        console.log(`${'0.'.green} Exit`)

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question('Choose an option: ', ( opt ) => {
            console.log({ opt })
            resolve(opt)
            readline.close()
        })  
    })
}

const pause = () => {
    return new Promise( resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`\nPush ${'ENTER'.green} to continue\n`, ( opt ) => {
            readline.close()
            resolve()
        })
    }) 
}

module.exports = {
    showMenu,
    pause
}