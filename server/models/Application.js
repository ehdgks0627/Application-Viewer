import mongoose from 'mongoose';

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
    question: { type: Array, required: false, default: [] },
    questionIndex: { type: Number, required: false, default: 1 },
    major: { type: Array, required: false, default: [] },
    majorIndex: { type: Number, required: false, default: 1 },
    special: { type: Array, required: false, default: [] },
    specialIndex: { type: Number, required: false, default: 1 },
    answer: { type: String, required: false, default: '' },
    startTime: {type: Number, required: false, default: null },
    endTime: {type: Number, required: false, default: null },
});

// Create Model & Export
export default mongoose.model('Application', ApplicationSchema);
