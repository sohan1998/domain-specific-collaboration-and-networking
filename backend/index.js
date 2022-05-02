const app = require('./app.js');
const mongoInit = require('./src/models/config/mongo.init.js');
const userRouter = require('./src/modules/user/router/users.js');

mongoInit();

app.use(userRouter);
