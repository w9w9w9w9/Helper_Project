#!/opt/homebrew/bin/node
const translate = require("./translate")
//const ~
//const ~

if(process.argv.length <= 2){
    console.log("Insufficient parameter");
    process.exit(1);
}

let command = process.argv[2];

switch(command){
    //case "-t"

    //case ~

    //case ~ 

    case "man":
        //manual page
        break;
    default:
        console.log("Worng command");
        process.exit(1);
}