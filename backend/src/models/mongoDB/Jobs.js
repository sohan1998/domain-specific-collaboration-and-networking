import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const jobSchema = new Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects',
        required: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        default: [],
    },
});

const Jobs = mongoose.model('jobs', jobSchema);

export default Jobs;
