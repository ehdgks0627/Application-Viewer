const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    sid: { type: Number, required: true, unique: true },
    photo: { type: String, required: false, default: '' },
    name: { type: String, required: true },
    pnumber: { type: String, required: true },
    email: { type: String, required: true },
    hobby: { type: String, required: false, default: '' },
    strong: { type: String, required: false, default: '' },
    study: { type: String, required: false, default: '' },
    profile: { type: String, required: false, default: '' },
    last: { type: String, required: false, default: '' },
    questionList: { type: Array, required: false, default: [] },
    major: { type: Array, required: false, default: [] },
    special: { type: Array, required: false, default: [] },
    answer: { type: String, required: false, default: '' },
    startTime: {type: Date, required: false, default: null },
    endTime: {type: Date, required: false, default: null }
},
{
    timestamps: true
});

// Create Model & Export
module.exports = mongoose.model('Application', ApplicationSchema);
