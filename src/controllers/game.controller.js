const Game = require('../models/Game');

const gameController = {

    createGame: async (req, res) => {
        try {
            const { first, secound } = req.body;
            if (!first || !secound) return res.status(400).json({ message: "Missing Data" })

            const gameAlreadyExists = await Game.findOne({ first, secound }).exec();

            if (gameAlreadyExists) return res.status(401).json({ message: "This Game Already Exists" })

            const createGame = await new Game({
                first,
                secound,
            }).save();

            if (!createGame) return res.status(500).json({ message: "Internal Server Error" });
            return res.status(201).json(createGame);
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" })
        }
    },

};

module.exports = gameController;