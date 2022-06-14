const axios = require('axios')
// Fetch Weather from API

let apiKey = "";
let units = "metric";
let city = "seoul";
let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+units+"&appid="+apiKey;


// 각자의 정보를 제공하는 함수들
async function current_temp() {
    await axios.get(url)
            .then(responseData => {
                let jsonData = responseData.data;
                const cur_t = jsonData.main.temp;
                const place = jsonData.name;
                const country = jsonData.sys.country;
                let phrase = `The current temperature in ${place}(${country}) is ${cur_t} degrees celcius.`;
                console.log(phrase);
            })
            .catch(error => {
                if(error.response)
                console.log("Check the name of the city!");
            });
}

async function min_temp() {
    await axios.get(url)
    .then(responseData => {
        let jsonData = responseData.data;
        const min_t = jsonData.main.temp_min;
        const place = jsonData.name;
        const country = jsonData.sys.country;
        let phrase = `The minimum temperature at the moment in ${place}(${country}) is ${min_t} degrees celcius.`;
        console.log(phrase);
    })
    .catch(error => {
        if(error.response)
        console.log("Check the name of the city!");
    });
}
async function max_temp() {
    await axios.get(url)
    .then(responseData => {
        let jsonData = responseData.data;
        const max_t = jsonData.main.temp_max;
        const place = jsonData.name;
        const country = jsonData.sys.country;
        let phrase = `The maximum temperature at the moment in ${place}(${country}) is ${max_t} degrees celcius.`;
        console.log(phrase);
    })
    .catch(error => { if(error.response) console.log("Check the name of the city!");});
}
async function humidity() {
    await axios.get(url)
    .then(responseData => {
        let jsonData = responseData.data;
        const humidity = jsonData.main.humidity;
        const place = jsonData.name;
        const country = jsonData.sys.country;
        let phrase;
        if(humidity > 70) {
            phrase = `The humidity in ${place}(${country}) is ${humidity}%! It may be an unpleasant day...`;
        }
        else {
            phrase = `The humidity in ${place}(${country}) is ${humidity}%. Have a pleasant day!`;
        }
        console.log(phrase);
    })
    .catch(error => {
        if(error.response)
        console.log("Check the name of the city!");
    });
}
async function clouds() {
    await axios.get(url)
    .then(responseData => {
        let jsonData = responseData.data;
        const cloudy = jsonData.clouds.all;
        const place = jsonData.name;
        const country = jsonData.sys.country;
        let phrase;
        if(cloudy < 50) {
            phrase = `The sky is clear with ${cloudy}% cloudiness in ${place}(${country}).`;
        }
        else if(cloudy < 80) {
            phrase = `It is a bit cloudy with ${cloudy}% cloudiness in ${place}(${country}).`;
        }
        else { // cloudy >= 80
            phrase = `It is cloudy with ${cloudy}% cloudiness in ${place}(${country}).`;
        }
        console.log(phrase);
    })
    .catch(error => {
        if(error.response)
        console.log("Check the name of the city!");
    });
}
function convertTime(unix_timestamp, offset){
    // convert number to a 2-digit string
    const twoDigits = (val) => {
        return ('0' + val).slice(-2);
    };
    let date = new Date((unix_timestamp + offset)* 1000);
    // Hours part from the timestamp
    let hours = date.getUTCHours();
    // Minutes part from the timestamp
    let minutes = twoDigits(date.getUTCMinutes());
    // Seconds part from the timestamp
    let seconds = twoDigits(date.getUTCSeconds());
    
    let formattedTime = twoDigits(hours) + ':' + minutes + ':' + seconds;

    if(hours > 12) {
        formattedTime = twoDigits(hours-12) + ':' + minutes + ':' + seconds + " PM";
    }
    else {
        formattedTime = twoDigits(hours) + ':' + minutes + ':' + seconds + " AM";
    }

    return formattedTime;
}
async function sunrise() {
    await axios.get(url)
    .then(responseData => {
        let jsonData = responseData.data;
        const sunrise = convertTime(jsonData.sys.sunrise, jsonData.timezone);
        const place = jsonData.name;
        const country = jsonData.sys.country;
        let phrase = `The sun rises at ${sunrise} in ${place}(${country})`;
        console.log(phrase);
    })
    .catch(error => {
        if(error.response)
        console.log("Check the name of the city!");
    });
}
async function sunset() {
    await axios.get(url)
    .then(responseData => {
        let jsonData = responseData.data;
        const sunset = convertTime(jsonData.sys.sunset, jsonData.timezone);
        const place = jsonData.name;
        const country = jsonData.sys.country;
        let phrase = `The sun sets at ${sunset} in ${place}(${country})`;
        console.log(phrase);
    })
    .catch(error => {
        if(error.response)
        console.log("Check the name of the city!");
    });
}
async function weather_desc() {
    await axios.get(url)
    .then(responseData => {
        let jsonData = responseData.data;
        const weatherDescription = jsonData.weather[0].description;
        const place = jsonData.name;
        const country = jsonData.sys.country;
        let phrase = `The weather is depicted as ${weatherDescription} in ${place}(${country}) today.`;
        console.log(phrase);
    })
    .catch(error => {
        if(error.response)
        console.log("Check the name of the city!");
    });
}

async function change_commands(_command, city1) {
    url = "https://api.openweathermap.org/data/2.5/weather?q="+city1+"&units="+units+"&appid="+apiKey;
    switch(_command) {
        case "current_temp":
            current_temp();
            break;
        case "min_temp":
            min_temp();
            break;
        case "max_temp":
            max_temp();
            break;
        case "humidity":
            humidity();
            break;
        case "clouds":
            clouds();
            break;
        case "how_is_the_weather":
            weather_desc();
            break;
        case "sunrise":
            sunrise();
            break;
        case "sunset":
            sunset();
            break;
        default:
            console.log("Wrong command... ");
            break;          
    }
}
module.exports = {
    convertTime,
    current_temp,
    min_temp,
    max_temp,
    humidity,
    clouds,
    sunrise,
    sunset,
    weather_desc,
    change_commands
}
