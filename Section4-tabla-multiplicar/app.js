//import { writeFile } from 'fs'
const { createFile } = require('./helpers/multiplication.js')
const { argv } = require('./config/yargs')

console.clear()

createFile( argv.base, argv.list, argv.limit )
    .then((result) => console.log( result ))
    .catch((err) => console.log( 'ERROR' ))
    