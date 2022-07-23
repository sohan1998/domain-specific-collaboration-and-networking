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
            await projectSchema
                .findOne({
                    _id: projectId,
                })
                .populate('members')
                .exec(function (err, targetProject) {
                    if (err) {
                        console.error(err);
                    } else {
                        return res.json(targetProject);
                    }
                });
        } catch (err) {
            console.error(err);
        }
    };

    viewRolesOfParticularProject = async (req, res) => {
        try {
            let projectId = req.query.projectId;
            let userId = req.query.userId;

            const rolesSpecificToProjectOnly = await jobSchema.find({
                projectId: projectId,
            });

            // rolesSpecificToProjectOnly.map(x => console.log(JSON.stringify(x)));
            // console.log('Project roles => ', rolesSpecificToProjectOnly);

            const rolesSpecificToUserForProject = await applicationSchema.find({ $and: [{ projectId: projectId }, { userId: userId }] });
            // rolesSpecificToUserForProject.map(x => console.log(JSON.stringify(x)));
            // console.log('Roles within the project for which user has applied => ', rolesSpecificToUserForProject);

            // let result = [];
            // let ids = [];

            // for (const role of rolesSpecificToProjectOnly) {
            //     let flag = false;
            //     for (const appliedRole of rolesSpecificToUserForProject) {
            //         if (appliedRole.jobId.toString() === role.id.toString()) {
            //             const updatedRole = { ...role, isApplied: 'APPLIED' };
            //             result.push(updatedRole);
            //             ids.push(role.id.toString());
            //             flag = true;
            //         }
            //         if (flag === true) {
            //             break;
            //         }
            //     }
            // }
            // console.log(result);
            // console.log(result.length);
            // result.map((x) => console.log(JSON.stringify(x)));
            let final = [];
            let result = [];
            let ids = [];
            if (rolesSpecificToUserForProject.length === 0) {
                for (const role of rolesSpecificToProjectOnly) {
                    const updateFinalRole = { ...role, isApplied: 'NOT_APPLIED' };
                    final.push(updateFinalRole);
                }
                return res.status(200).send(final);
            } else {
                for (const role of rolesSpecificToProjectOnly) {
                    let flag = false;
                    for (const appliedRole of rolesSpecificToUserForProject) {
                        if (appliedRole.jobId.toString() === role.id.toString()) {
                            const updatedRole = { ...role, isApplied: 'APPLIED' };
                            result.push(updatedRole);
                            ids.push(role.id.toString());
                            flag = true;
                        }
                        if (flag === true) {
                            break;
                        }
                    }
                }
                for (const role of rolesSpecificToProjectOnly) {
                    // for (const appliedRoleInResult of result) {
                    if (!ids.includes(role.id.toString())) {
                        const updateFinalRole = { ...role, isApplied: 'NOT_APPLIED' };
                        result.push(updateFinalRole);
                        ids.push(role.id.toString());
                    }
                    // }
                }
                return res.status(200).send(result);
            }
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
                .populate('jobId')
                .lean();
            let result = [];
            allSubmissions.forEach((element) => {
                if (element.applicationStatus === 'Applied') {
                    result.push(element);
                }
                console.log(element.applicationStatus);
            });
            // console.log(allSubmissions)
            return res.status(200).send(result);
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
            let { projectId, userId } = req.body;
            let flag = false;
            const projectMembersToUpdate = await projectSchema.findOne({
                _id: projectId,
            });
            if (projectMembersToUpdate) {
                const tempArray = projectMembersToUpdate.members;
                tempArray.forEach((element) => {
                    if (element.toString() === userId) {
                        flag = true;
                    }
                });
            } else {
                return res.status(404).send({ message: 'No such project found!' });
            }
            if (flag) {
                const response = await projectSchema.findOneAndUpdate(
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
                    }
                );
                return res.status(200).send({ message: 'Removed successfully!', response });
            } else {
                return res.send({ message: 'No member exists' });
            }
        } catch (err) {
            console.log(err);
        }
    };

    acceptOrRejectMemberForProject = async (req, res) => {
        try {
            let projectId = req.query.projectId;
            let jobId = req.query.jobId;
            const userId = req.body.userId;
            const result = req.body.message;

            if (result === 'Accept') {
                const userCheck = await userSchema.findOne({ _id: userId });
                if (!userCheck) {
                    return res.status(401).json({ message: 'User does not exists!' });
                }
                const memberToAccept = await projectSchema.findOne({ _id: projectId });
                console.log('Project => ', memberToAccept);
                if (memberToAccept) {
                    const memberExists = await projectSchema.findOne({ members: userId });
                    // console.log(memberExists);
                    if (memberExists) {
                        return res.status(401).json({ message: 'Member already exists!' });
                    } else {
                        const applications = await applicationSchema.find({
                            $and: [{ userId: userId }, { projectId: projectId }, { jobId: jobId }],
                        });
                        if (applications.length > 0) {
                            try {
                                await applicationSchema.updateOne(
                                    { $and: [{ userId: userId }, { projectId: projectId }, { jobId: jobId }] },
                                    {
                                        $set: { applicationStatus: 'Accepted' },
                                    }
                                );
                            } catch (err) {
                                console.error('Unable to Accept Application');
                                return;
                            }
                            try {
                                await projectSchema.updateOne({ _id: projectId }, { $push: { members: userId } });
                            } catch (err) {
                                console.error('Unable to add user into member');
                            }
                            return res.json({ message: 'Accepted Successfully!' });
                        } else {
                            return res.status(401).json({ message: 'No such application found!' });
                        }
                    }
                } else {
                    return res.json({ message: 'Not able to Accept' });
                }
            } else if (result === 'Reject') {
                try {
                    const applicationExists = await applicationSchema.findOneAndUpdate(
                        { $and: [{ projectId: projectId }, { jobId: jobId }, { userId: userId }] },
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
