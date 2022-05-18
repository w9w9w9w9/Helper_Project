function translate(sd, sentence){
    const axios = require("axios");
    const url = "https://dapi.kakao.com/v2/translation/translate";
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization : "KakaoAK 1b20febe0d9526e269c8a1765c08496c"
    }
    switch(sd){
        case "k2e":
            axios({
                method: "post",
                url: url,
                headers: headers,
                data: {
                    "src_lang": "kr",
                    "target_lang": "en",
                },
                params: {
                    query: sentence
                }
            }).then(res => {
                if(res.status === 200){
                    console.log(res.data.translated_text);
                }else{
                    console.log("Server error! Please try again.");
                }
            });
            break;
        case "e2k":
            axios({
                method: "post",
                url: url,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization : authorization
                },
                data: {
                    "src_lang": "kr",
                    "target_lang": "en",
                },
                params: {
                    query: sentence
                }
            }).then(res => {
                if(res.status === 200){
                    console.log(res.data.translated_text);
                }else{
                    console.log("Server error! Please try again.");
                }
            })
            break;
        default:
            console.log("Worng Option!");
            break;

    }
}

module.exports = {
    translate
}