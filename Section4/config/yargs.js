const argv = require('yargs')
                .options({
                    'b':{            
                        alias: 'base',
                        type: 'number',
                        demandOption: true,
                        describe: 'Agrega una descripcion'
                    },
                    'l':{
                        alias: 'list',
                        type: 'boolean',
                        default: false
                    },
                    'limit':{
                        type: 'number',
                        describe: 'Use limit arg to indicate the laps count of for function',
                        demandOption: true
                    }    
                })
                .check(( argv, options ) => {
                    if( isNaN( argv.base ) || isNaN( argv.limit )) throw 'The base must be a number'
                    return true
                })     
                .argv

module.exports = {
    argv
}