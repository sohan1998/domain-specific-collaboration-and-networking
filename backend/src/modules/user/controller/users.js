import bcrypt from 'bcrypt';
import userSchema from './../../../models/mongoDB/User.js';

export class UserController {
    login = async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            userSchema.findOne({ email }).then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'Email Not Found! ' });
                } else {
                    bcrypt.compare(password, user.password).then((isMatch) => {
                        if (isMatch) {
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end('Successful Login');
                        } else {
                            return res.status(404).json({ message: 'Incorrect Password! ' });
                        }
                    });
                }
            });
        } catch (err) {
            console.error(err);
        }
    };
    validateRegisteredUser = async (req, res) => {
        try {
            const email = req.query.email;
            console.log(email);
            userSchema.findOne({ email }).then((user) => {
                console.log(user);
                if (!user) {
                    return res.status(200).json({ message: 'Success, No user found' });
                } else {
                    return res.send({ message: 'User Already Exist' });
                }
            });
        } catch (err) {
            console.error(err);
        }
    };
    register = async (req, res) => {
        userSchema.findOne({ email: req.body.email }).then((user) => {
            if (user) {
                return res.status(400).json({ message: 'User Already Exists!' });
            } else {
                const newUser = new userSchema({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    education: req.body.education,
                    professionalExperience: req.body.professionalExperience,
                    interests: req.body.interests,
                    skills: req.body.skills,
                    status: req.body.status,
                    about_me: req.body.about_me,
                    connections: req.body.connections,
                    timeStamp: req.body.timeStamp,
                    ratings: req.body.ratings,
                });
                bcrypt.genSalt(15, (err, salt) => {
                    if (newUser.password !== undefined) {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then((user) => res.json(user))
                                .catch((err) => console.log(err));
                        });
                    }
                });
            }
        });
    };
    userConnections = async (req, res) => {
        try {
            let userId1 = req.query._id;
            const userId2 = req.body.userId2;

            const connectionExists = await userSchema.findOne({ connections: userId2 });
            if (connectionExists) return res.status(401).json({ message: 'Connection already exists!' });

            await userSchema.updateOne({ _id: userId1 }, { $push: { connections: userId2 } });
            await userSchema.updateOne({ _id: userId2 }, { $push: { connections: userId1 } });
            return res.status(200).json({ message: 'Connected Successfully!' });
        } catch (err) {
            console.error(err);
            return res.status(404).json({ message: 'Error Connecting' });
        }
    };
}
export default UserController;
