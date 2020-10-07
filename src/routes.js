const express = require('express');
const routes = express.Router();

// Controllers
const gameController = require('./controllers/game.controller');


// Game
routes.post("/games", gameController.createGame);
routes.put("/votes/:id", gameController.vote);


module.exports = routes;