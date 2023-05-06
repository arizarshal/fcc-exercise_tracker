const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    username: String,
    description: String,
    duration: Number,
    date: Date,
},  {versionKey: false})

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise