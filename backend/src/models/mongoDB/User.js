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
        default: {
            'Full-Stack Development': '0',
            'Machine Learning': '0',
            'Deep Learning': '0',
            'Data Science': '0',
            'Software Testing': '0',
            'Product Management': '0',
            'Project Management': '0',
            'Cloud Computing': '0',
            'Backend Development': '0',
            'UIUX Design': '0',
            'DevOps Domain': '0',
        },
        required: true,
    },
    skills: {
        type: Array,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    about_me: {
        type: String,
        default: '',
    },
    connections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            default: [],
        },
    ],
    timeStamp: {
        type: Date,
        default: Date.now,
    },
    ratings: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model('user', userSchema);

export default User;
