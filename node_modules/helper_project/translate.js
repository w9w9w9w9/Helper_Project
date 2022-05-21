function translate(sd, sentence){
    switch(sd){
        case "-k2e":
            axios_call("kr", "en", sentence);
            break;
        case "-e2k":
            axios_call("en", "kr", sentence);
            break;
        case "-j2k":
            axios_call("jp", "kr", sentence);
            break;
        case "-k2j":
            axios_call("kr", "jp", sentence);
            break;
        case "-e2j":
            axios_call("en", "jp", sentence);
            break;
        case "-j2e":
            axios_call("jp", "en", sentence);
            break;
        case "-w":
            const axios = require("axios");
            axios({
                method: "post",
                url: "https://dapi.kakao.com/v3/translation/language/detect",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization : "KakaoAK 1b20febe0d9526e269c8a1765c08496c"
                },
                params: {
                    query: sentence,
                }
            }).then(res => {
                if(res.status === 200){
                    console.log(res.data.language_info[0].name);
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

function axios_call(src, target, sentence){
    const axios = require("axios");
    const url = "https://dapi.kakao.com/v2/translation/translate";
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization : "KakaoAK 1b20febe0d9526e269c8a1765c08496c"
    }
    axios({
        method: "post",
        url: url,
        headers: headers,
        params: {
            query: sentence,
            "src_lang": src,
            "target_lang": target,
        }
    }).then(res => {
        if(res.status === 200){
            console.log(res.data.translated_text[0][0]);
        }else{
            console.log("Server error! Please try again.");
        }
    }).catch(e => console.log(e));
}
module.exports = {
    translate
}