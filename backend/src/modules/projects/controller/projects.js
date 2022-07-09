import mongoose from 'mongoose';
import projectSchema from '../../../models/mongoDB/Projects.js';
import applicationSchema from '../../../models/mongoDB/Applications.js';
import userSchema from './../../../models/mongoDB/User.js';

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

    displayProjectDescription = async (req, res) => {
        try {
            let projectId = req.query._id;
            projectSchema.findOne(
                {
                    _id: projectId,
                },
                function (err, projectDesc) {
                    if (err) {
                        console.error(err);
                    } else {
                        return res.json(projectDesc.description);
                    }
                }
            );
        } catch (err) {
            console.error(err);
        }
    };
    displayProjectTitle = async (req, res) => {
        try {
            let projectId = req.query._id;
            projectSchema.findOne(
                {
                    _id: projectId,
                },
                function (err, projectTitle) {
                    if (err) {
                        console.error(err);
                    } else {
                        return res.json(projectTitle.title);
                    }
                }
            );
        } catch (err) {
            console.error(err);
        }
    };
    viewAllMembers = async (req, res) => {
        try {
            let projectId = req.query._id;
            projectSchema.findOne(
                {
                    _id: projectId,
                },
                function (err, projectMembers) {
                    if (err) {
                        console.error(err);
                    } else {
                        return res.json(projectMembers.members);
                    }
                }
            );
        } catch (err) {
            console.error(err);
        }
    };
    viewAllApplications = async (req, res) => {
        try {
            let projectId = req.query.projectId;
            applicationSchema.findOne(
                {
                    projectId: projectId,
                },
                function (err, allApplicants) {
                    if (err) {
                        console.error(err);
                    } else {
                        // console.log(allApplicants);
                        // const a = allApplicants.userId;
                        // try {
                        //     userSchema.findOne({ a }).then((user) => {
                        //         return res.json(user.firstName);
                        //     });
                        // } catch (err) {
                        //     console.error(err);
                        // }
                        return res.json(allApplicants.userId);
                    }
                }
            );
        } catch (err) {
            console.error(err);
        }
    };
    viewAllRoles = async (req, res) => {
        try {
            let projectId = req.query.projectId;
            applicationSchema.findOne(
                {
                    projectId: projectId,
                },
                function (err, allRoles) {
                    if (err) {
                        console.error(err);
                    } else {
                        return res.json(allRoles.jobId);
                    }
                }
            );
        } catch (err) {
            console.error(err);
        }
    };
}

export default ProjectsController;
