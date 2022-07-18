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
            console.log(projectId);
            jobSchema.findOne(
                {
                    projectId: projectId,
                },
                function (err, allRoles) {
                    console.log(allRoles);
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
                    projectId: projectId,
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
    // acceptMemberForProject = async (req, res) => {
    //     try {
    //         let projectId = req.query._id;
    //         const userId = req.body.userId;

    //         await projectSchema.updateOne({ _id: projectId }, { $push: { members: userId } });
    //         return res.status(200).json({ message: 'Accepted Successfully!' });
    //     } catch (err) {
    //         console.error(err);
    //         return res.status(404).json({ message: 'Error Accepting' });
    //     }
    // };

    acceptOrRejectMemberForProject = async (req, res) => {
        try {
            let projectId = req.query._id;
            let jobId = req.query.jobId;
            const userId = req.body.userId;
            const result = req.body.message;

            if (result === 'Accept') {
                const membertoaccept = await projectSchema.findOne({ _id: projectId });
                if (membertoaccept) {
                    const memberExists = await projectSchema.findOne({ members: userId });
                    if (memberExists) return res.status(401).json({ message: 'Member already exists!' });
                    const applications = await applicationSchema.find({ userId: userId });
                    try {
                        if (applications.length > 0) {
                            await applicationSchema.updateOne(
                                { userId: userId },
                                {
                                    $set: { applicationStatus: 'Accepted' },
                                }
                            );
                        }
                    } catch (err) {
                        console.error('Unable to Accept Application');
                        return;
                    }
                    try {
                        await projectSchema.updateOne({ _id: projectId }, { $push: { members: userId } });
                    } catch (err) {
                        console.error('Unable to Accept');
                        return;
                    }
                    return res.json({ message: 'Accepted Successfully!' });
                } else {
                    return res.json({ message: 'Not able to Accept' });
                }
            } else if (result === 'Reject') {
                try {
                    const applicationExists = await applicationSchema.findOneAndUpdate(
                        {
                            projectId: projectId,
                            jobId: jobId,
                            userId: userId,
                        },
                        {
                            $set: { applicationStatus: 'Rejected' },
                        }
                    );
                    if (applicationExists) {
                        return res.json({ message: 'Rejected Successfully!' });
                    } else {
                        return res.json({ message: 'Not able to Reject' });
                    }
                } catch (err) {
                    console.error('Unable to Reject');
                }
            }
        } catch (err) {
            console.error(err);
        }
    };
}

export default ProjectsController;
