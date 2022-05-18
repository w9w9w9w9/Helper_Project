import fetch from 'node-fetch';
// Fetch Weather from API

export let jsonData;

export async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

export async function getWeather(city) {
    let apiKey = "dcd483fc5dd0421fddbc501e1661a8cd";
    let units = "metric";
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+units+"&appid="+apiKey;

    jsonData = await getJson(url);
    //console.log(jsonData);
}

// add convertTime function here - for sunrise, sunset

// 각자의 정보를 제공하는 함수들
export async function current_temp() {
    const cur_t = jsonData.main.temp;
    const place = jsonData.name;
    const country = jsonData.sys.country;
    let phrase = `The current temperature in ${place}(${country}) is ${cur_t} degrees celcius.`;
    console.log(phrase);
}

export async function min_temp() {
    const min_t = jsonData.main.temp_min;
    const place = jsonData.name;
    const country = jsonData.sys.country;
    let phrase = `The minimum temperature at the moment in ${place}(${country}) is ${min_t} degrees celcius.`;
    console.log(phrase);
}
export async function max_temp() {
    const max_t = jsonData.main.temp_max;
    const place = jsonData.name;
    const country = jsonData.sys.country;
    let phrase = `The maximum temperature at the moment in ${place}(${country}) is ${max_t} degrees celcius.`;
    console.log(phrase);
}
export async function humidity() {
    const humidity = jsonData.main.humidity;
    const place = jsonData.name;
    const country = jsonData.sys.country;
    let phrase;
    if(humidity > 70) {
        phrase = `The humidity in ${place}(${country}) is ${humidity}%! It may be an unpleasant day...`;
    }
    else {
        phrase = `The humidity is in ${place}(${country}) ${humidity}%. Have a pleasant day!`;
    }
    console.log(phrase);
}
export async function clouds() {
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
}

export async function change_location(new_city) {
    getWeather(new_city);
}
export async function weather_desc() {
    const weatherDescription = jsonData.weather[0].description;
    const place = jsonData.name;
    const country = jsonData.sys.country;
    let phrase = `The weather is depicted as ${weatherDescription} in ${place}(${country}) today.`;
    console.log(phrase);
}

