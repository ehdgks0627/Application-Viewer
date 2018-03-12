const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  sid: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  pnumber: { type: String, required: true },
  email: { type: String, required: true },
  hobby: { type: String, required: true },
  strong: { type: String, required: true },
  study: { type: String, required: true },
  profile: { type: String, required: true },
  last: { type: String, required: true },
  questionList: { type: Array, required: false, default: [] },
  major: { type: Array, required: false, default: [] },
  special: { type: Array, required: false, default: [] },
  answer: { type: String, required: false, default: '' },
  startTime: {type: Date, required: false },
  endTime: {type: Date, required: false }
},
{
  timestamps: true
});

// Create Model & Export
module.exports = mongoose.model('Application', ApplicationSchema);
