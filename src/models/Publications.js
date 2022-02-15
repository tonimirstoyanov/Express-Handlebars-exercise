const mongoose = require('mongoose');

const PublicationsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minlength: [6, 'The Title should be a minimum of 6 characters long'],
    },
    technique: {
        type: String,
        required: true,
        maxlength: [15, 'The Painting technique should be a maximum of 15 characters long']

    },
    artPicture: {
        type: String,
        required: true,
        validate: [/^https?:\/\//i, 'Invalid image url']
    },
    certificate: {
        type: String,
        required: true,
        enum:['Yes', 'No']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    usersShared: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    userSharedCount:{
        type: Number,
        default: 0
    }
    
})



const Publications = mongoose.model('Publications', PublicationsSchema);

module.exports = Publications;