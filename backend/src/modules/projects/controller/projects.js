import { projectSchema } from '../../../models/mongoDB/Projects';

export class ProjectsController {
    createProject = async (req, res) => {
        try {
            const newProject = new projectSchema({
                onwerId: req.body.userId,
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
            });
            const response = await newProject.save();
            res.status(200).send(response);
        } catch (err) {
            console.error(err);
        }
    };

    viewAllProjects = async (req, res) => {
        try {
            const allProjects = projectSchema.find();
            res.status(200).send(allProjects);
        } catch (err) {
            console.error(err);
        }
    };

    viewParticularProject = async (req, res) => {
        try {
            const response = projectSchema.findOne({
                _id: req.query._id,
            });
            res.status(200).send(response);
        } catch (err) {
            console.error(err);
        }
    };
}

export default ProjectsController;
