#!/opt/homebrew/bin/node
var request = require('request');
var covid = require("./covid");
var cheerio = require("cheerio");

//const ~

if(process.argv.length <= 2){
    console.log("Insufficient parameter");
    process.exit(1);
}

let command = process.argv[2];


switch(command){
    //case "-t"

    
    case "-cv":
        let options = process.argv[3];
        let covidurl = covid.geturl();
        let day = covid.getday();
        request({
            url: covidurl,
            method: 'GET'
        }, function (error, response, body) {
            var $ = cheerio.load(body);
            switch(options){
                case "-cr":
                    console.log(($('item').children('decideCnt').text()));
                    break;
                case "-dc":
                    console.log(($('item').children('deathCnt').text()));
                    break;
            }
            
        });
        break;

    //case ~ 

    case "man":
        //manual page
        break;
    default:
        console.log("Worng command");
        process.exit(1);
}

