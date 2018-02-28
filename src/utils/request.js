import { notification } from 'antd';
import qs from 'qs';
// import '../mock';

const MOCK_EVN = false;
const SUCCESS_CODE = 0;
const ERROR_CODE = 10086;

function fetchRequest(url, options) {
    // 设置带cookie
    const defaultOptions = {
        credentials: 'include'
    };
    const newOptions = { ...defaultOptions, ...options };
    newOptions.headers = {
        ...newOptions.headers
    };

    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
        const accept = {
            Accept: 'application/json; charset=utf-8'
        };
        const contentType = {};
        switch (newOptions.type) {
            case 'JSON':
                newOptions.body = JSON.stringify(newOptions.body);
                break;
            case 'FILE':
                break;
            case 'MULTIPART':
                newOptions.body = buildSingleFormData(newOptions.body);
                break;
            default:
                contentType['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
                newOptions.body = qs.stringify(newOptions.body);
                break;
        }
        newOptions.headers = {
            ...accept,
            ...contentType,
            ...newOptions.headers
        };
    }

    return fetch(url, newOptions);
}

function buildSingleFormData(data) {
    let formData = new FormData();
    for (let name in data) {
        formData.append(name, data[name]);
    }

    return formData;
}

function xhrRequest(url, options) {
    const newOptions = { ...options };
    const promise = new Promise(((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(newOptions.method || 'get', url, true);
        xhr.responseType = 'json';
        xhr.setRequestHeader('x-access-token', fetchToken());
        if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
            xhr.setRequestHeader('Accept', 'application/json');
            if (newOptions.type === 'JSON') {
                xhr.send(newOptions.body);
            } else if (newOptions.type === 'FILE') {
                xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            } else {
                xhr.setRequestHeader('Content-Type', 'x-www-form-urlencoded; charset=utf-8');
                xhr.send(qs.stringify(newOptions.body));
            }
        } else {
            xhr.send();
        }
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return;
            }
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                resolve(xhr.response);
            } else {
                reject(new Error(xhr.statusText));
            }
        };
    }));
    return promise;
}

function checkStatus(response) {
    if (MOCK_EVN || typeof fetch === 'undefined') {
        return response;
    } else {
        if ((response.status >= 200 && response.status < 300) || response.status === 304) {
            return response;
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    let requestPromise;
    if (MOCK_EVN || typeof fetch === 'undefined') {
        requestPromise = xhrRequest(url, options);
    } else {
        requestPromise = fetchRequest(url, options);
    }
    const promiseList = [
        requestPromise,
        new Promise(((resolve, reject) => {
            setTimeout(() => reject(new Error('请求超时')), 20000);
        }))
    ];

    return Promise.race(promiseList)
        .then(checkStatus)
        .then((response) => {
            if (MOCK_EVN || typeof fetch === 'undefined') {
                return response;
            } else {
                return response.json();
            }
        })
        .then((response) => {
            if (MOCK_EVN) {
                /* eslint-disable */
                response = JSON.parse(response);
            }
            switch (response.code) {
                case SUCCESS_CODE:  // request success 
                    return response;
                default:
                    const error = new Error();
                    error.number = ERROR_CODE;
                    error.description = response.message;
                    throw error;
            }
        })
        .catch((error) => {
            if (error.number === ERROR_CODE) {
                // business failure
                notification.error({
                    message: '温馨提醒',
                    description: error.description
                });
            } else if ('stack' in error && 'message' in error) {
                // request failure
                notification.error({
                    message: `请求错误: ${url}`,
                    description: error.message
                });
            }
            return error;
        });
}
