const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema, model } = mongoose;

const User = new Schema({});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
