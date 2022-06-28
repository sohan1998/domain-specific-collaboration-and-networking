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
                    status: req.body.status,
                    connections: req.body.connections,
                    interests: req.body.interests,
                    timeStamp: req.body.timeStamp,
                    ratings: req.body.ratings,
                });
                bcrypt.genSalt(15, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then((user) => res.json(user))
                            .catch((err) => console.log(err));
                    });
                });
            }
        });
    };
}
export default UserController;
