const fs = require('fs');
require('colors')

const createFile = ( base, list, limit ) => {
    return new Promise(( resolve, reject) => {
            
        let output = ''
        
        for (let index = 1; index <= limit; index++) {
            output += `${base} * ${index} = ${index * base}\n`
        }
        
        fs.writeFile(`./outputs/table${base}.txt`, output, ( err ) => {
            if ( err ) throw err
            
            if ( list ){
                        
                console.log(`
                ===========================
                table DEL ${base}
                =========================== 
                `.green)
                console.log(output)
            }
            resolve('created')
        })    
    })
}

module.exports = {
    createFile
}