var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UsersSchema = new Schema({

module.exports = mongoose.model('Users', UsersSchema)