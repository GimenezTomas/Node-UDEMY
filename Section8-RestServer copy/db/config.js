const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN, {
            'useNewUrlParser': true
        })

        console.log('Db running')

    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la db')
    }
}

module.exports = {
    dbConnection
}