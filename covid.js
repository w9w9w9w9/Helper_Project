//importing modules
var request = require('request');
var cheerio = require("cheerio");

//get current date for Covid-19
var currentdate = new Date();
var currentday = currentdate.getFullYear() + (('0' + (currentdate.getMonth() + 1)).slice(-2)) + (('0' + currentdate.getDate()).slice(-2));

//get data from api
var url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=z1Wb1B30STzrsT5oPiC%2FIAbzWNPUKrLUV5snIA%2Bt7YqQ9BTaeAwqcx7JPxVB8zUzwr8Bh%2BVOVdIyw0%2FepTl7Jw%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent(currentday); /* */
queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent(currentday); /* */

//parsing and get data 
request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    var $ = cheerio.load(body);
    $('item').each(function(index,element){
        var  CumulativeConfirmationRate= $(element).children('accDefRate').text();
        var confirmedCase = $(element).children('decideCnt').text();
        var deathCount = $(element).children('deathCnt').text();
        var CumulativeExamineRate = $(element).children('accExamCn').text();
    })

});