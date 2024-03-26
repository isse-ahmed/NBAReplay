/*
This web-scarper that takes a url to the play-by-play page of a 
basketball game on the Basketball Reference Website
eg. "https://www.basketball-reference.com/boxscores/pbp/201606190GSW.html"
*/

"use strict";

//Importing Libraries
import got from 'got';
import cheerio from 'cheerio';

//Getting HTML
let url = "https://www.basketball-reference.com/boxscores/pbp/201606190GSW.html";
let response = await got(url);
let responseHTML = response.body;
const $ = cheerio.load(responseHTML);
var quarter = 1;


//Parsing the HTML to get the play-by-play data
$('tr').each(function(){

    //Time in the Quarter
    let quarterTime = $(this).find('td:first-child').text().trim();
    let play;

    //Check if play is by the Away Team or the End of Quarter
    if($(this).find('td').eq(1).text().trim() !== "")
    {
        play = $(this).find('td').eq(1).text().trim();
        //Check if End of Quarter
        if(play.includes("End"))
        {
            quarter++;
        }
    }
    else
    {
        play = $(this).find('td:last-child').text().trim();
    }
    
    if(quarterTime !== "")
    {
        console.log(quarter);
        console.log(quarterTime);
        console.log(play);
    }

})





