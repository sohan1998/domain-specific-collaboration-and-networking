import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobs',
        required: true,
    },
    messageApplication: {
        type: String,
        required: true,
    },
    // resumeUrl: {
    //     type: String,
    //     required: true,
    // },
    applicationStatus: {
        type: String,
        default: 'Applied',
    },
});

const Applications = mongoose.model('applications', applicationSchema);

export default Applications;
