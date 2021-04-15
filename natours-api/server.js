const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
    path: './config.env'
});

process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(con => {
    console.log('Connection successful!');
})

const server = app.listen(3000, () => console.log(`[${process.env.APP_NAME}] Listening port 3000...`));

process.on('unhandledRejection', err => {
    console.log("Unhandled Rejection, shutting down...");
    console.log(err.name, err.message);
    server.close( () => {
        process.exit(1);
    });
});
process.on('SIGTERM', () => {
    console.log("Shutting down");
    server.close(() => {
        console.log('Process terminated!');
    });
});