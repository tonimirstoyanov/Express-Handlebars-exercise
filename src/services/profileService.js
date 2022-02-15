const User = require('../models/User.js')


exports.profile = (username) => User.findOne({ _id: username }).lean();

