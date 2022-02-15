const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User');
const { JWT_SECRET } = require('../constants')
const { sign } = require('../utils/jwt')

exports.login = async ({username, password}) => {

    let user = await User.findOne({ username })
        
    // console.log(user)
    if (user) {
        
        let isValid = await bcrypt.compare(password, user.password)

        // console.log(isValid)
        if (isValid) {
            // console.log(user)
            return user
        } else {
            throw new Error('Username or password are invalid')
        }
    } else {
        throw new Error('Username or password are invalid')
    }


}
exports.register = (userData) => User.create(userData)

exports.createToken = (user) => {

    let payload = {
        _id: user._id,
        username: user.username,
        address: user.address
    
    }

    return sign(payload, JWT_SECRET)
}