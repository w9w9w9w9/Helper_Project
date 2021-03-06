#!/opt/homebrew/bin/node
const request = require('request');
const covid = require("./covid");
const cheerio = require("cheerio");
const policies = require("./covid");
const translate = require("./translate")
const weather = require("./weather.js")
const readline = require("readline")


if(process.argv.length <= 2){
    console.log("Insufficient parameter");
    process.exit(1);
}

let command = process.argv[2];


switch(command){
    case "-t":
        var len = process.argv.length;
        var sentence = "";
        for(var i = 4; i < len; i++){
            sentence += process.argv[i];
        }
        translate.translate(process.argv[3], sentence);
        break;

    case "-w":
        if(process.argv.length < 4) {
            console.log("You need to enter what kind of information you want to see!");
            process.exit(1);
        }
        let inputs = process.argv.slice(3, process.argv.length); // array
        for(let i = 0; i < process.argv.length - 3; i++) {
            weather_commands(inputs[i]);
        }
        break;
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
                    console.log("Numver of Confirmed Case by Covid-19:",$('item').children('decideCnt').text());
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

    case "man":
        const fs = require("fs");
        fs.readFile("./manpage.txt", "utf8", (e, d) => {
            if(e){
                console.log(e);
            } else{
                console.log(d);
            }
        })
        break;
    default:
        console.log("Wrong command");
        process.exit(1);
}

// Function for weather commands to go to
async function weather_commands(_command) {
    switch(_command) {
        case "current_temp":
            await weather.current_temp();
            break;
        case "min_temp":
            await weather.min_temp();
            break;
        case "max_temp":
            await weather.max_temp();
            break;
        case "humidity":
            await weather.humidity();
            break;
        case "clouds":
            await weather.clouds();
            break;
        case "how_is_the_weather":
            await weather.weather_desc();
            break;
        case "sunrise":
            await weather.sunrise();
            break;
        case "sunset":
            await weather.sunset();
            break;
        case "change_location":
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            rl.question("Which city do you want to change to? ",  (input1) => {
                console.log(`The city is now set to ${input1}!`);
                rl.question("Now, What kind of information would you like to see?(Enter only one) ", (input2) => {
                    weather.change_commands(input2, input1);
                    rl.close();
                });
            });
            break;
        default:
            console.log("Wrong command... Try again!");
            break;          
    }
}
