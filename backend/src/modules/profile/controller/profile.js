import mongoose from 'mongoose';
import userSchema from '../../../models/mongoDB/User.js';
import jobSchema from '../../../models/mongoDB/Jobs.js';
import applicationSchema from '../../../models/mongoDB/Applications.js';

export class ProfileController {
    getUserProfile = async (req, res) => {
        try {
            const userId = req.query._id;
            userSchema.findOne(
                {
                    _id: userId,
                },
                function (err, userDetails) {
                    if (err) {
                        console.error(err);
                    } else {
                        return res.json(userDetails);
                    }
                }
            );
        } catch (err) {
            console.error(err);
        }
    };
    editUserDetails = async (req, res) => {
        try {
            const { userId, firstName, lastName, education, professionalExperience, interests, skills, status, about_me } = req.body;
            const update = {
                firstName,
                lastName,
                education,
                professionalExperience,
                interests,
                skills,
                status,
                about_me,
            };
            const response = await userSchema.findOneAndUpdate(
                {
                    _id: userId,
                },
                update,
                {
                    new: true,
                    safe: true,
                }
            );
            res.status(200).send({ message: 'Details Updated', response });
        } catch (err) {
            console.error(err);
        }
    };
}

export default ProfileController;
