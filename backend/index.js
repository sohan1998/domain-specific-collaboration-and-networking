import app from './app.js';
import mongoInit from './src/models/config/mongo.init.js';
import userRouter from './src/modules/user/router/users.js';
import projectRouter from './src/modules/projects/router/projects.js';

mongoInit();

app.use(userRouter);
app.use(projectRouter);
