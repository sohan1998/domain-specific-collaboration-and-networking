import mongoose from 'mongoose';
import jobSchema from '../../../models/mongoDB/Jobs.js';
import applicationSchema from '../../../models/mongoDB/Applications.js';
import projectSchema from '../../../models/mongoDB/Projects.js';

export class RolesController {
    createJob = async (req, res) => {
        try {
            console.log(req.body.projectId);
            const newJob = new jobSchema({
                projectId: req.body.projectId,
                ownerId: req.body.ownerId,
                title: req.body.title,
                description: req.body.description,
                tags: req.body.tags,
            });
            const response = await newJob.save();
            res.status(200).send(response);
        } catch (err) {
            console.error(err);
        }
    };

    viewParticularJob = async (req, res) => {
        try {
            let jobId = req.query._id;
            jobSchema.findOne(
                {
                    _id: jobId,
                },
                function (err, targetJob) {
                    if (err) {
                        console.error(err);
                    } else {
                        return res.json(targetJob);
                    }
                }
            );
        } catch (err) {
            console.error(err);
        }
    };

    applyParticularJob = async (req, res) => {
        try {
            const { projectId, userId, jobId, messageApplication, applicationStatus } = req.body;
            const applicationExists = await applicationSchema.findOne({ projectId, userId, jobId });
            if (applicationExists) {
                return res.status(401).json({ message: 'Member has already applied to this job!' });
            } else {
                const memberAlreadyInProject = await projectSchema.findOne({ $and: [{ _id: projectId }, { members: userId }] });
                if (memberAlreadyInProject) {
                    const applyJob = new applicationSchema({
                        projectId,
                        userId,
                        jobId,
                        messageApplication,
                        applicationStatus: 'No Longer Under Consideration',
                    });
                    const response = await applyJob.save();
                    // await applicationSchema.updateMany(
                    //     { $and: [{ _id: projectId }, { userId: userId }] },
                    //     {
                    //         $set: { applicationStatus: 'No Longer Under Consideration' },
                    //     }
                    // );
                    return res.status(403).send({ message: 'Already part of the project so this application is no longer under consideration' });
                } else {
                    const applyJob = new applicationSchema({
                        projectId,
                        userId,
                        jobId,
                        messageApplication,
                        applicationStatus,
                    });
                    const response = await applyJob.save();
                    return res.status(200).send(response);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    appliedJob = async (req, res) => {
        try {
            let userId = req.query.userId;
            const appliedJobs = await applicationSchema
                .find({
                    userId: userId,
                })
                .populate('jobId')
                .lean();
            let response = appliedJobs.filter((element) => element.jobId !== null);
            return res.status(200).send(response);
        } catch (err) {
            console.error(err);
        }
    };

    viewAllJobs = async (req, res) => {
        try {
            jobSchema.find({}, function (err, jobs) {
                return res.json(jobs);
            });
        } catch (err) {
            console.error(err);
        }
    };

    deleteJob = async (req, res) => {
        try {
            let jobId = req.query._id;
            const jobtodelete = await jobSchema.findOne({ _id: jobId });
            if (jobtodelete) {
                const applications = await applicationSchema.find({ jobId: jobId });
                try {
                    if (applications.length > 0) {
                        await applicationSchema.updateMany(
                            { jobId: jobId },
                            {
                                $set: { applicationStatus: 'No Longer Under Consideration' },
                            }
                        );
                    }
                } catch (err) {
                    console.error('Unable to update applications');
                    return;
                }
                try {
                    await jobSchema.remove({
                        _id: jobId,
                    });
                } catch (err) {
                    console.error('Unable to delete');
                    return;
                }
                return res.json({ message: 'Deleted Successfully!' });
            } else {
                return res.json({ message: 'Job does not exist' });
            }
        } catch (err) {
            console.error(err);
        }
    };
}
export default RolesController;
