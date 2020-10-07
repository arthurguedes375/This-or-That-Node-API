const express = require('express');
const routes = express.Router();

// Controllers
const gameController = require('./controllers/game.controller');


// Game
routes.get("/games", gameController.select);
routes.get("/games/:id", gameController.select);
routes.post("/games", gameController.createGame);

// Votes
routes.put("/votes/:id", gameController.vote);


module.exports = routes;