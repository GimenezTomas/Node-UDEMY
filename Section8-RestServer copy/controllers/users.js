const bcryptjs = require('bcryptjs')

const User = require('../models/User')

const usersGET = (req, res) => {
    const { q, nombre = 'no name', apikey } = req.query
    
    res.json({
        msg: 'GET',
        q,
        nombre, 
        apikey
    })
}

const usersPUT = (req, res) => {
    const { id } = req.params
    
    res.json({
        msg: 'PUT', 
        id
    })
}

const usersPOST = async(req, res) => {
    
    const { name, password, role , mail } = req.body
    const user = new User( {name, password, role, mail} ) 
    
    const mailExists = await User.findOne({ mail })
    if ( mailExists ) {
        return res.status(400).json({
            msg: "El correo esta registradp"
        })
    }

    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync( password.toString(), salt )

    await user.save()

    res.json({
        user
    })
}

const usersDELETE = (req, res) => {
    res.json({
        msg: 'DELETE'
    })
}

const usersPATCH = (req, res) => {
    res.json({
        msg: 'PATCH'
    })
}
 
module.exports = {
    usersGET,
    usersDELETE,
    usersPATCH, 
    usersPOST, 
    usersPUT
}