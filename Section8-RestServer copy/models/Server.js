const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../db/config')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT 

        this.usersPath = '/api/users'

        this.connectDB()

        this.middleweares()

        this.routes()
        this.listen()
    }

    async connectDB(){
        await dbConnection()
    }

    middleweares(){
        this.app.use( cors() )

        this.app.use( express.json() )

        this.app.use( express.static('public') ) 
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('running in '+ this.port)
        })
    }
}

module.exports = Server