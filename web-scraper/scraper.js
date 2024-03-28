/*
This web-scarper that takes a url to the play-by-play page of a 
basketball game on the Basketball Reference Website
eg. "https://www.basketball-reference.com/boxscores/pbp/201606190GSW.html"
*/

"use strict";

//Importing Libraries
import got from 'got';
import cheerio from 'cheerio';
import fs from 'node:fs';

//Getting HTML
let url = "https://www.basketball-reference.com/boxscores/pbp/201606190GSW.html";
let response = await got(url);
let responseHTML = response.body;
const $ = cheerio.load(responseHTML);
const teamNames = $('.scorebox').find('strong');
let gameDate = $('.scorebox_meta').find('div:first-child').text().trim().replaceAll(" ","");
let stream;
let gameID;
//Variables for play-by-play information
let quarter = 1
let homeTeam;
let awayTeam;
let teamCounter = 0;

//Path for saved File
let filePath = "exportedPBP/";

//Getting Team Names
teamNames.each(function(){
    let teamName = $(this).text().trim();

    if(teamCounter === 0)
    {
        awayTeam = teamName;
    }
    else
    {
        homeTeam = teamName;
    }

    teamCounter++;
})

//Creating file path
filePath = filePath.concat(awayTeam.replaceAll(" ","-"),"vs");
filePath = filePath.concat(homeTeam.replaceAll(" ", "-"),gameDate);
filePath = filePath.concat(".txt");

//Creating GameID
gameID = `${gameDate}-${awayTeam.replaceAll(" ","*")}vs${homeTeam.replaceAll(" ","*")}`.replaceAll(",","*");

//Creating WriteStream for file writing
stream = fs.createWriteStream(filePath,{flags:'a'});
stream.write("GameID,Quarter,Quarter_Time,Team,Play" + "\n");

//Parsing the HTML to get the play-by-play data
$('tr').each(function(){

    //Time in the Quarter
    let quarterTime = $(this).find('td:first-child').text().trim();
    let playTeam;
    let play;

    //Check if play is in the second child tag
    if($(this).find('td').eq(1).text().trim() !== "")
    {
        play = $(this).find('td').eq(1).text().trim();
        playTeam = awayTeam;
        //Check if End of Quarter
        if(play.includes("End"))
        {
            quarter++;
        }
    }
    else
    {
        play = $(this).find('td:last-child').text().trim();
        playTeam = homeTeam;
    }
    
    if(quarterTime !== "" && !play.includes("misses") && !play.includes("enters") && !play.includes("Violation") && !play.includes("foul") && !play.includes("Turnover") && !play.includes("timeout")
        && !play.includes("Start") && !play.includes("End"))
    {
        stream.write(`${gameID},${quarter},${quarterTime},${playTeam},${play}\n`)
    }
})





