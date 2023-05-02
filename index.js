const chalk = require('chalk');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const { Logging } = require('./library/logging');

const authRoutes = require("./routes/user.js");
const adminRoutes = require("./routes/admin.js");
const postRoutes = require("./routes/post.js");
const requestRoutes = require("./routes/request.js");
const recommendRoutes = require("./routes/recommend.js");

const router = express();
const PORT = process.env.PORT || 5000;

const MONGO_UNAME = process.env.MONGO_UNAME || '';
const MONGO_PASS = process.env.MONGO_PASS || '';
const MONGO_URL = `mongodb+srv://${MONGO_UNAME}:${MONGO_PASS}@cluster0.4otsw.mongodb.net/utmsir`;

mongoose
    .connect(MONGO_URL, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('connected to MongoDB');
        StartServer();
    })
    .catch((err) => {
        Logging.err('Unable to connect');
        Logging.err(err);
    });

/** Only start the server if its connected to mongo **/
const StartServer = () => {
    router.use((req, res, next) => {
        /** Log the Request */
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the Response */
            Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    router.use(cors());
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));
    router.use(bodyParser.urlencoded({ extended: true }));

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    router.use('/user', authRoutes);
    router.use('/admin', adminRoutes);
    router.use('/post', postRoutes);
    router.use('/request', requestRoutes);
    // router.use('/recommend', recommendRoutes);

    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    /** Error Handling */
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging.err(error);

        return res.status(404).json({ message: error.message });
    });

    router.listen(PORT, () => Logging.info(`Server is running on port ${PORT}`));
};