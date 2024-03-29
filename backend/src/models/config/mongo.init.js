import mongoose from 'mongoose';
import app from '../../../app.js';
import { backendPort } from '../../../config/serverConfig.js';
import mongoUri from './mongo.config.js';

const mongoInit = () => {
    try {
        mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 500,
        });
        console.log('Mongoose is connected.');
        app.listen(backendPort, () => {
            console.log('Server listening on port 3001');
        });
    } catch (err) {
        console.error('Could not connect Mongoose => ', err);
    }
};

export default mongoInit;
