const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name!!']
    },mail: {
        type: String,
        required: [true, 'The mail!!']
    },password: {
        type: String,
        required: [true, 'The password!!']
    },img: {
        type: String,
    },role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },state: {
        type: Boolean,
        default: false
    },google: {
        type: Boolean,
        default: false
    }
})

module.exports = model('User', UserSchema)