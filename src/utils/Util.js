// import {AES,enc} from "crypto-js";

// const AES_PWD = "evidence";



class Util {
    formatDateTime(timestamp) {
        var inputTime = Number.parseInt(timestamp, 10);
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }

    randCode() {
        let code = "";
        for (var i = 0; i < 6; ++i) {
            code += Math.floor(Math.random() * 10);
        }
        return code;
    }

    formatFormData(jsondata) {
        let result = "";
        for (let key in jsondata) {
            let tmp = key + "=" + jsondata[key] + "&";
            result += tmp;
        }

        return result.length > 1 ? result.substring(0, result.length - 1) : result;
    }

    connectSocket(url, message) {
        let websocket = null;
        if ('WebSocket' in window) {
            websocket = new WebSocket(url);
        }
        else {
            alert('Not support websocket');
            return;
        }

        //连接发生错误的回调方法
        websocket.onerror = function () {
            console.error("error");
            if (message) {
                message.error("error", 2);
            }
        };

        //连接成功建立的回调方法
        websocket.onopen = function (event) {
            console.log(event);
            if (message) {
                message.success("websocket success", 2);
            }
        };

        //接收到消息的回调方法
        websocket.onmessage = function (event) {
            console.log(event.data);
            let data = event.data;
            let jsonObj = JSON.parse(data);
            console.log(jsonObj);
            // if (jsonObj.event == "connected") {
            //     if (message) message.info("websocket连接成功", 2);
            // }
            if (jsonObj.event == "AssetPoolCreated") {
                if (message) {
                    message.info("写入成功，资产池id:" + jsonObj.message, 10);
                    message.info("该笔交易hash: " + jsonObj.txHash, 10);
                }
            }
            if (jsonObj.event == "AssetPoolFailedToCreate") {
                if (message) message.info("写入失败", 2);
            }
        };

        //连接关闭的回调方法
        websocket.onclose = function () {
            console.log("websocket close");
            if (message) {
                message.info("websocket close", 2);
            }
        }
    }

    // setSessionStorageItem(key,data){
    //     let storageData = JSON.stringify(data);
    //     let cryStr = AES.encrypt(storageData,AES_PWD).toString();
    //     sessionStorage.setItem(key,cryStr);
    // }

    // getSessionStorageItem(key){
    //     let data = sessionStorage.getItem(key);
    //     if(data == null) return null;
    //     let decryData = AES.decrypt(data,AES_PWD).toString(enc.Utf8);
    //     if(decryData == null){
    //         return null;
    //     }
    //     let jsonData = JSON.parse(decryData);
    //     if(jsonData.token){
    //         return jsonData;
    //     }
    //     return null;
    // }

    // deleteSessionStorageItem(key){
    //     sessionStorage.removeItem(key);
    // }
}

export default new Util();