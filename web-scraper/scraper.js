/*
This web-scraper takes a url of the play-by-play page of a 
basketball game on the Basketball Reference Website
eg. "https://www.basketball-reference.com/boxscores/pbp/201606190GSW.html"
*/

"use strict";

//Importing Libraries
import got from "got";
import cheerio from "cheerio";
import fs from "node:fs";

//URL of the Play-by-play on the Basketball Reference Website
const url =
  "https://www.basketball-reference.com/boxscores/pbp/202406120DAL.html";
const response = await got(url);

function main() {
  //Variables for getting HTML
  let responseHTML = response.body;
  const $ = cheerio.load(responseHTML);
  let stream;
  let gameID;

  //HTML containing the team names
  const teamNames = $(".scorebox").find("strong");

  //Variables for play-by-play information
  let homeTeam;
  let awayTeam;
  let teamCounter = 0;

  //Getting date information
  let gameDate = $(".scorebox_meta")
    .find("div:first-child")
    .text()
    .trim()
    .replaceAll(" ", "");

  //Path for saved File
  let filePath = "exportedPBP/";

  //Getting Team Names
  teamNames.each(function () {
    let teamName = $(this).text().trim();

    if (teamCounter === 0) {
      awayTeam = teamName;
    } else {
      homeTeam = teamName;
    }

    teamCounter++;
  });

  //Creating file path from team names and date
  filePath = filePath.concat(awayTeam.replaceAll(" ", "-"), "vs");
  filePath = filePath.concat(homeTeam.replaceAll(" ", "-"), gameDate);
  filePath = filePath.concat(".txt");

  //Creating GameID
  gameID = `${gameDate
    .slice(gameDate.indexOf(","))
    .replaceAll(",", "")}${homeTeam.slice(0, 3)}vs${awayTeam.slice(0, 3)}`;

  //Creating WriteStream for file writing
  stream = fs.createWriteStream(filePath, { flags: "a" });
  stream.write("GameID,gameDate,HomeTeam,AwayTeam" + "\n");
  stream.write(
    `${gameID},${gameDate.replaceAll(",", "-")},${homeTeam},${awayTeam}\n`
  );
  stream.write("GameID,Score,Quarter,QuarterTime,Team,Play" + "\n");
  parsePbP($, stream, homeTeam, awayTeam, gameID);
}

function parsePbP($, stream, homeTeam, awayTeam, gameID) {
  let quarter = 1;
  let playTeam;
  let play;
  let quarterTime;
  let score;
  //Parsing the HTML to get the play-by-play data
  $("tr").each(function () {
    //Time in the Quarter
    quarterTime = $(this).find("td:first-child").text().trim();
    score = $(this).find(".center").text().trim();
    //Check if play is in the second child tag
    if ($(this).find("td").eq(1).text().trim() !== "") {
      play = $(this).find("td").eq(1).text().trim();
      playTeam = awayTeam;
      //Check if End of Quarter
      if (play.includes("End")) {
        quarter++;
      }
    } else {
      play = $(this).find("td:last-child").text().trim();
      playTeam = homeTeam;
    }

    if (
      quarterTime !== "" &&
      !play.includes("misses") &&
      !play.includes("enters") &&
      !play.includes("Violation") &&
      !play.includes("foul") &&
      !play.includes("Turnover") &&
      !play.includes("timeout") &&
      !play.includes("Start") &&
      !play.includes("End")
    ) {
      if (play.indexOf("(") != -1) {
        play = play.slice(0, play.indexOf("(") - 1);
      }
      if (score.includes("Jump")) {
        score = "0-0";
      }
      stream.write(
        `${gameID},${score},${quarter},${quarterTime},${playTeam},${play}\n`
      );
    }
  });
}

main();
