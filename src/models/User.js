const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const { SALTROUNDS } = require('../constants')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        minlength: [4, 'Username cannot be with less then 3 characters'],
    },
    password: {
        type: String,
        required: true,
        minlength: [3, 'Your password should be at least 4 characters']

    },
    address: {
        type: String,
        required: true,
        maxlength: [20, 'The address should be a maximum of 20 characters long']
    },
    myPublications: [{
        type: mongoose.Types.ObjectId,
        ref: 'Publications'
    }]

})


userSchema.pre('save', function (next) {

    bcrypt.hash(this.password, SALTROUNDS)
        .then(hash => {

            this.password = hash;
            next()
        })

})
const User = mongoose.model('User', userSchema);

module.exports = User;