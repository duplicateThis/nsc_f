import {baseUrl} from './url.js'

export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
    type = type.toUpperCase();
    url = baseUrl + url;

    if (type == 'GET') {
        let dataStr = '';
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
        })
        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.length - 1);
            url += '?' + dataStr
        }
    }

    if (window.fetch && method =='fetch') {
        let reqConfig = {
            credentials: 'include',
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            catch: 'force-cache'
        }
        if (type == 'POST') {
            Object.defineProperty(reqConfig, 'body', {
                value: JSON.stringify(data)
            })
        }
        try {
            const response = await fetch(url, reqConfig);
            const resJson = await response.json();
            return resJson
        } catch (err) {
            throw new Error(err)
        }
    } else {
        return new Promise((resolve, reject) => {
            let reqObj;
            let sendData = '';
            if (window.XMLHttpRequest) {
                reqObj = new XMLHttpRequest()
            } else {
                reqObj = new ActiveXObject
            }
            if (type == 'POST') {
                sendData = JSON.stringify(data)
            }
            reqObj.open(type, url, true);
            reqObj.setRequestHeader('Content-type", "application/x-www-form-urlencoded');
            reqObj.send(sendData);
            reqObj.onreadystatechange = () => {
                if (reqObj.readyState == 4) {
                    if (reqObj.status == 200) {
                        let obj = reqObj.response;
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj)
                        }
                        resolve(obj)
                    } else {
                        reject(reqObj)
                    }
                }
            }
        })
    }
}
