import request from '../utils/request';

// 登陆
export async function login(params) {
    return request('/session', {
        method: 'POST',
        type: "form",
        body: params,
    });
}
