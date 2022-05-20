#!/opt/homebrew/bin/node
const translate = require("./translate")
const weather = require("./weather.js")
const readline = require("readline")
//const ~

if(process.argv.length <= 2){
    console.log("Insufficient parameter");
    process.exit(1);
}

let command = process.argv[2];

switch(command){
    //case "-t"

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
    //case ~ 

    case "man":
        //manual page
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