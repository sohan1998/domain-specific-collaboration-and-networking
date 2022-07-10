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
            let projectId = req.query._id;
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
            let projectId = req.query.projectId;
            jobSchema.findOne(
                {
                    projectId: projectId,
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
            let projectId = req.query._id;
            const allSubmissions = await applicationSchema
                .find({
                    projectId: projectId,
                })
                .populate('userId')
                .lean();
            return res.status(200).send(allSubmissions);
        } catch (err) {
            console.error(err);
        }
    };
}

export default ProjectsController;
