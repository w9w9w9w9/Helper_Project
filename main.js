#!/opt/homebrew/bin/node
var request = require('request');
var covid = require("./covid");
var cheerio = require("cheerio");
var policies = require("./covid");


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
        let covidpolcies = covid.getpolicies();
        request({
            url: covidurl,
            method: 'GET'
        }, function (error, response, body) {
            var $ = cheerio.load(body);
            switch(options){
                //prints number of Confirmed Case by Covid -19
                case "-cr":
                    console.log("Number of Confirmed Case by Covid-19:",$('item').children('decideCnt').text());
                    break;
                //prints number of Death Case by Covid -19
                case "-dc":
                    console.log("Number of Death by Covid-19:",($('item').children('deathCnt').text()));
                    break;
                //prints when the data was updated
                case "-tc":
                    console.log("Updated Time:",($('item').children('createDt').text()));
                    break;

                case "-pc":
                    console.log(covidpolcies);
                    break                              
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

