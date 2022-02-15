const Publications = require('../models/Publications')
const User = require('../models/User.js')

exports.create = (artData) => Publications.create(artData);

exports.getAll = () => Publications.find().lean();

exports.getAllShared = () => Publications.find().populate('usersShared');

exports.getOne = (artId) => Publications.findById(artId).populate('usersShared');

exports.getAuthor = (artId) => Publications.findById(artId).populate('author');

exports.editOne = (artId, artData) => Publications.findByIdAndUpdate(artId, artData, { runValidators: true })

exports.deleteOne = (artId) => Publications.findByIdAndDelete(artId);



exports.share = (artId, votersId) => {


    return Publications.findOneAndUpdate({ _id: artId }, { $push: { usersShared: votersId }, $inc: { userSharedCount: +1 } })

}