import request from '../utils/request';

export async function queryDiscountList(params) {
    return request('/discount/queryDiscountList', {
        method: 'POST',
        body: params,
    });
}

export async function queryDiscountListByState(params) {
    return request('/discount/queryDiscountListByState', {
        method: 'POST',
        body: params,
    });
}

export async function queryDiscount(params) {
    return request('/discount/queryDiscount', {
        method: 'POST',
        body: params,
    });
}


export async function insert(params) {
    return request('/discount/insert', {
        method: 'POST',
        body: params,
    });
}

export async function checkDiscountAudit(params) {
    return request('/discount/audit', {
        method: 'POST',
        body: params,
    });
}

export async function checkDiscountAuditList(params) {
    return request('/discount/auditList', {
        method: 'POST',
        body: params,
    });
}

export async function allocate(params) {
    return request('/discount/allocate', {
        method: 'POST',
        body: params,
        type: 'JSON'
    });
}