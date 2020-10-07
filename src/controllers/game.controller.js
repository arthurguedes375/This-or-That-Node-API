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

    select: async (req, res) => {
        try {
            const { id: _id } = req.params;
            const { page, per_page } = req.query;

            if (_id) {
                const gameSelected = await Game.findOne({ _id }).exec();

                return res.status(200).json(gameSelected);
            } else {

                const pagination = {
                    page: (parseInt(page) - 1) || 0,
                    per_page: parseInt(per_page) || 5,
                };

                const gameSelected = await Game
                    .find()
                    .skip(pagination.page * pagination.per_page)
                    .limit(pagination.per_page)
                    .exec();

                return res.status(200).json(gameSelected);
            }
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    vote: async (req, res) => {
        try {
            const { id: _id } = req.params;
            const { option } = req.body;
            const options = {
                0: "firstVotes",
                1: "secoundVotes",
            };

            if (!options[option]) return res.status(400).json({ message: "Invalid Option" })

            const gameTot = await Game.findOne({ _id }).exec();

            if (!gameTot) return res.status(400).json({ message: "Game not Found" });


            const firstVote = (options[option] === 'firstVotes') ? gameTot.firstVotes + 1 : gameTot.firstVotes;
            const secoundVote = (options[option] === 'secoundVotes') ? gameTot.secoundVotes + 1 : gameTot.secoundVotes;

            const totalVotes = firstVote + secoundVote;

            const firstPercentage = (firstVote / totalVotes) * 100;
            const secoundPercentage = (secoundVote / totalVotes) * 100;

            const voting = await Game.findOneAndUpdate({ _id }, {
                [options[option]]: gameTot[options[option]] + 1,
                firstPercentage: Math.round(firstPercentage),
                secoundPercentage: Math.round(secoundPercentage),
            }).exec();

            if (!voting) return res.status(500).json({ message: "Internal Server Error" });

            return res.status(201).json({
                ...voting._doc,
                [options[option]]: gameTot[options[option]] + 1,
                firstPercentage: Math.round(firstPercentage) || 0,
                secoundPercentage: Math.round(secoundPercentage) || 0,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

};

module.exports = gameController;