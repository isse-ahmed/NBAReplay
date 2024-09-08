const express = require("express");
const router = express.Router();
const nbaController = require(`../controllers/nbaController`);

//GET all NBA Games on the database
router.get("/games", nbaController.getAllGames);

//POST a new NBA game into the database
router.post("/games", nbaController.addNewGame);

//GET the info of a specific NBA game by ID
router.get("/games/:id", nbaController.getGameById);
