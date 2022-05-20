#!/opt/homebrew/bin/node
var request = require('request');
var covid = require("./covid");
var cheerio = require("cheerio");
var policies = require("./covid");
const translate = require("./translate")
import * as weather from './weather.js';
import readline from 'readline';
//const ~

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
        await weather.getWeather("seoul"); // Seoul as default
        let inputs = process.argv.slice(3, process.argv.length); // array
        for(let i = 0; i < process.argv.length - 3; i++) {
            weather_commands(inputs[i]);
        }
        break;
    //case ~ 

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

// Function for commands to go to
function weather_commands(_command) {
    switch(_command) {
        case "current_temp":
            weather.current_temp();
            break;
        case "min_temp":
            weather.min_temp();
            break;
        case "max_temp":
            weather.max_temp();
            break;
        case "humidity":
            weather.humidity();
            break;
        case "clouds":
            weather.clouds();
            break;
        case "how_is_the_weather":
            weather.weather_desc();
            break;
        case "sunrise":
            weather.sunrise();
            break;
        case "sunset":
            weather.sunset();
            break;
        case "change_location":
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            
            rl.question("Which city do you want to change to? ",  (input1) => {
                weather.change_location(input1)
                .catch((error) => console.log("Change Error:", error)); //
                console.log(`The city is now set to ${input1}!`);
                rl.question("Now, What kind of information would you like to see?(Enter only one) ", (input2) => {
                    weather_commands(input2);
                    rl.close();
                });
            });
            break;
        default:
            console.log("Wrong command... Try again!");
            break;          
    }
}
