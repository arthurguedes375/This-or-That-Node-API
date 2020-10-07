// Dotenv
const path = require('path');
require('dotenv').config({ path: path.resolve('.env') });

// MongoDB
const mongoose = require('mongoose');
const mongoConfig = require('./config/mongo.config');
mongoose.connect(mongoConfig.url, mongoConfig.connectionConfigs);

// Express
const express = require('express');
const app = express();

// Mids Require
const morgan = require('morgan');
const cors = require('cors');

// Routes
const routes = require('./routes');

// Mids
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(routes);




// Cluster
const cluster = require('cluster');


if (cluster.isMaster) {
    const numCPUs = require('os').cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    app.listen(process.env.HTTP_PORT || 3333);
}