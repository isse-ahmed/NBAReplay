const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const router = express.Router();

//Connect to database
const db = new sqlite3.Database(`./../database/nba_data.db`, (err) => {
  if (err) {
    console.error(err.messaage);
  }
  console.log("Connected to nba_data.db");
  db.get("SELECT COUNT(*) as count FROM nba_games", (err, row) => {
    if (err) {
      console.error("Database connection error:", err.message);
    } else {
      console.log(row.count);
    }
  });
});

//Respond with all NBA Games on database
exports.getAllGames = async (req, res) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      console.log("In here");
      db.all("SELECT * FROM nba_games", (err, row) => {
        console.log("here 2");
        if (err) {
          console.log("here 3");
          reject(err);
        } else {
          console.log("Query executed successfully, row count:", row.length);
          resolve(row);
        }
      });
    });

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Database Error" });
  }
};
