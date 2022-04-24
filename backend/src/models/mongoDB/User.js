const mongoose = require('mongoose');

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
        schoolName: {type: String, required: true},
        degree: {type: String, required: true},
        major: {type: String, required: true},
        startDate: {type: Date, required: true},
        endDate: {type: Date, required: true},
    },
    professionalExperience: {
        employerName: {type: String},
        position: {type: String, required: true},
        startDate: {type: Date, required: true},
        endDate: {type: Date, required: true},
    },
    interests: {
        type: Array,
        default: [],
    },
    status: {
        type: Boolean,
        default: true,
    }
});

const User = mongoose.model('user', userSchema);

export default User;
