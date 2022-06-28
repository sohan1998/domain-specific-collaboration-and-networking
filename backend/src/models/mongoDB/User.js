import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    education: {
        schoolName: { type: String },
        degree: { type: String },
        major: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
    },
    professionalExperience: {
        employerName: { type: String },
        position: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
    },
    interests: {
        type: Map,
        of: String,
    },
    status: {
        type: Boolean,
        default: true,
    },
    connections: {
        type: Array,
        default: [],
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    },
    ratings: {
        type: Number,
        default: 5,
    },
});

const User = mongoose.model('user', userSchema);

export default User;
