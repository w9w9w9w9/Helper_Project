function translate(sd, sentence){
    const axios = require("axios");
    const url = "https://dapi.kakao.com/v2/translation/translate";
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization : "KakaoAK 1b20febe0d9526e269c8a1765c08496c"
    }
    switch(sd){
        case "-k2e":
            axios({
                method: "post",
                url: url,
                headers: headers,
                params: {
                    query: sentence,
                    "src_lang": "kr",
                    "target_lang": "en",
                }
            }).then(res => {
                if(res.status === 200){
                    var result = "";
                    console.log(res.data.translated_text[0][0]);
                }else{
                    console.log("Server error! Please try again.");
                }
            }).catch(e => console.log(e));
            break;
        case "-e2k":
            axios({
                method: "post",
                url: url,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization : authorization
                },
                params: {
                    query: sentence,
                    "src_lang": "kr",
                    "target_lang": "en",
                }
            }).then(res => {
                if(res.status === 200){
                    console.log(res.data.translated_text[0][0]);
                }else{
                    console.log("Server error! Please try again.");
                }
            }).catch(e => console.log(e));
            break;
        default:
            console.log("Worng Option!");
            break;

    }
}

module.exports = {
    translate
}