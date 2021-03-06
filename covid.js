//importing modules
const request = require('request');
const cheerio = require("cheerio");

//get current date for Covid-19
var currentdate = new Date();
var currentday = currentdate.getFullYear() + (('0' + (currentdate.getMonth() + 1)).slice(-2)) + (('0' + (currentdate.getDate() -1)).slice(-2));

//get data from api
var url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=z1Wb1B30STzrsT5oPiC%2FIAbzWNPUKrLUV5snIA%2Bt7YqQ9BTaeAwqcx7JPxVB8zUzwr8Bh%2BVOVdIyw0%2FepTl7Jw%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); 
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); 
queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent(currentday); 
queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent(currentday); 

//data of covid-19 polices
var policies = {
    socialDistancing : "NO-LIMIT",
    mask : "INSIDE-ONLY",
    privateGathering : "NO-LIMIT",
    operationHours : "NO-LIMIT"
}

function geturl(){
    var covidurl = url + queryParams;
    return covidurl
}

function getpolicies(){
   return policies
}
module.exports = {
    geturl,
    getpolicies,
};
