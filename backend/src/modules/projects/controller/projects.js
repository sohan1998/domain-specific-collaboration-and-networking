import mongoose from 'mongoose';
import projectSchema from '../../../models/mongoDB/Projects.js';
import applicationSchema from '../../../models/mongoDB/Applications.js';
import userSchema from './../../../models/mongoDB/User.js';
import jobSchema from '../../../models/mongoDB/Jobs.js';

export class ProjectsController {
    createProject = async (req, res) => {
        try {
            const newProject = new projectSchema({
                ownerId: req.body.ownerId,
                title: req.body.title,
                members: req.body.members,
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
            projectSchema.find({}, function (err, projects) {
                return res.json(projects);
            });
        } catch (err) {
            console.error(err);
        }
    };

    viewParticularProject = async (req, res) => {
        try {
            const projectId = req.query._id;
            projectSchema.findOne(
                {
                    _id: projectId,
                },
                function (err, targetProject) {
                    if (err) {
                        console.error(err);
                    } else {
                        return res.json(targetProject);
                    }
                }
            );
        } catch (err) {
            console.error(err);
        }
    };
    viewRolesOfParticularProject = async (req, res) => {
        try {
            const projectId = req.query.projectId;
            jobSchema.findOne(
                {
                    _id: projectId,
                },
                function (err, allRoles) {
                    if (err) {
                        console.error(err);
                    } else {
                        return res.json(allRoles);
                    }
                }
            );
        } catch (err) {
            console.error(err);
        }
    };

    viewAllApplicationsForParticularProject = async (req, res) => {
        try {
            const projectId = req.query._id;
            const allSubmissions = await applicationSchema
                .find({
                    _id: projectId,
                })
                .populate('userId')
                .lean();
            return res.status(200).send(allSubmissions);
        } catch (err) {
            console.error(err);
        }
    };

    editProjectDetails = async (req, res) => {
        try {
            const { projectId, title, description, status } = req.body;
            const update = {
                title,
                description,
                status,
            };
            const response = await projectSchema.findOneAndUpdate(
                {
                    _id: projectId,
                },
                update
            );
            res.status(200).send({ message: 'Project Details Updated' });
        } catch (err) {
            console.error(err);
        }
    };

    removeMemberFromProject = async (req, res) => {
        try {
            const { projectId, userId } = req.body;
            await projectSchema.findOneAndUpdate(
                {
                    _id: projectId,
                },
                {
                    $pull: {
                        members: userId,
                    },
                },
                {
                    safe: true,
                    new: true,
                },
                (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.status(200).send({ message: 'Removed Successfully!', result });
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    };
}

export default ProjectsController;
