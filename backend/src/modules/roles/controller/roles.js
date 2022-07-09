import mongoose from 'mongoose';
import jobSchema from '../../../models/mongoDB/Jobs.js';
import applicationSchema from '../../../models/mongoDB/Applications.js';

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
            const applyJob = new applicationSchema({
                projectId: req.body.projectId,
                userId: req.body.userId,
                jobId: req.body.jobId,
                messageApplication: req.body.messageApplication,
                applicationStatus: req.body.applicationStatus,
            });
            const response = await applyJob.save();
            res.status(200).send(response);
        } catch (err) {
            console.error(err);
        }
    };

    appliedJob = async (req, res) => {
        try {
            let userId = req.query.userId;
            applicationSchema.find(
                {
                    userId: userId,
                },
                function (err, appliedjobs) {
                    return res.json(appliedjobs);
                }
            );
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
