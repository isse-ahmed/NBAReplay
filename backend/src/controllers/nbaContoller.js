const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");

//Variable to track if a game is playing
let gameStatus = {
  gameId: null,
  status: "idle", //in-progress or idle
};

//Connect to database
const db = new sqlite3.Database(`./../database/nba_data.db`, (err) => {
  if (err) {
    console.error(err.messaage);
  }
});

//Respond with all NBA Games on database
exports.getAllGames = async (req, res) => {
  try {
    const games = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM nba_games", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          console.log("Query executed successfully, row count:", rows.length);
          resolve(rows);
        }
      });
    });

    res.json(games);
  } catch (error) {
    res.status(500).json({ error: "Database Error" });
  }
};

//Start playing NBA game by Id given a URL
exports.startGameById = async (req, res) => {
  //Parsing input from URL
  const game_id = req.params.id;
  const url = req.query.url;

  if (!validUrl.isUri(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  if (gameStatus.status === "in-progress") {
    return res.status(409).json({ error: "Another game is in progress" });
  }

  try {
    const plays = await new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM plays WHERE game_id = ?",
        [game_id],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });

    gameStatus.gameId = game_id;
    gameStatus.status = "in-progress";

    //Sending a success response
    res.status(200).json({ message: "Game Started" });

    async () => {
      for (const play of plays) {
        console.log(`Sending ${play.score} to ${url}`);
        await new Promise((r) => setTimeout(r, 2000));
      }

      gameStatus.gameId = null;
      gameStatus.status = "idle";
    };
  } catch (error) {
    res.status(500).json({ error: "Database Error" });
  }
};

exports.getPlayingStatus = async (req, res) => {
  res.json(gameStatus);
};
