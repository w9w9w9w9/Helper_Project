var request = require('request');
var cheerio = require("cheerio");

var url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=z1Wb1B30STzrsT5oPiC%2FIAbzWNPUKrLUV5snIA%2Bt7YqQ9BTaeAwqcx7JPxVB8zUzwr8Bh%2BVOVdIyw0%2FepTl7Jw%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20220510'); /* */
queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20220515'); /* */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    var $ = cheerio.load(body);
    $('item').each(function(index,element){
        var data3 = $(element).children('stateDt').text();
        var data1 = $(element).children('decideCnt').text();
        var data2 = $(element).children('deathCnt').text();
        console.log(data3);
        console.log(data1);

        console.log(data2);
    })

});