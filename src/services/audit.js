import request from '../utils/request';

// 添加audit
export async function insert(params) {
    return request('/audit/insert', {
        method: 'POST',
        type: "MULTIPART",
        body: params,
    });
}

export async function queryAuditInfoWithPaging(params) {
    return request('/audit/queryAuditInfoWithPaging', {
        method: 'POST',
        body: params,
    });
}

export async function queryAudit(params) {
    return request('/audit/queryAudit', {
        method: 'POST',
        body: params,
    });
}

export async function updateAuditSetState(params) {
    return request('/audit/updateAuditSetState', {
        method: 'POST',
        body: params,
    });
}

export async function updateAuditSetStateAndLoanContractFile(params) {
    return request('/audit/updateAuditSetStateAndLoanContractFile', {
        method: 'POST',
        type: "MULTIPART",
        body: params,
    });
}