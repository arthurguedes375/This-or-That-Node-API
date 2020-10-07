const express = require('express');
const routes = express.Router();

routes.get("/", (req, res) => {
    res.status(200).json({ message: process.env.HTTP_PORT });
})

module.exports = routes;