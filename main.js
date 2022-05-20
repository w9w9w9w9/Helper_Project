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
    case "-t":
        var len = process.argv.length;
        var sentence = "";
        for(var i = 4; i < len; i++){
            sentence += process.argv[i];
        }
        translate.translate(process.argv[3], sentence);
        break;

    //case ~

    //case ~ 

    case "man":
        //manual page
        break;
    default:
        console.log("Worng command");
        process.exit(1);
}