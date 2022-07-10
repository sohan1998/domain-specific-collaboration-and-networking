import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            default: [],
        },
    ],
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: true,
    },
});

const Projects = mongoose.model('projects', projectSchema);

export default Projects;
