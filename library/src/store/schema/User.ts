import { Schema, model } from 'mongoose';
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({});

User.plugin(passportLocalMongoose);

export default model('User', User);
