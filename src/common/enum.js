// 用户角色
export const UserRole = {
    SUPERADMIN: 1, // 超级管理员
    BANK: 2,    // 经办网点：1
    RETAIL: 3,  // 总行零售部
    ALLEVIATION: 4,// 脱贫办
    PROVINCIAL_AGRICULTURAL_DEPARTMENT: 5,// 省农业厅
    PROVINCIAL_FINANCE_BUREAU: 6,// 省财政局
    CITY_FINANCE_DEPARTMENT: 7// 市财政厅
}


export const AuditState = {
    UNDEFINED: 0,                  // 合约初始值：0
    BANK_PASSED: 1,                // 经办网点审核通过：1
    RETAIL_PASSED: 2,              // 总行零售部审核通过：2
    RETAIL_REJECT: 3,              // 总行零售部审核拒绝：3
    ALLEVIATION_PASSED: 4,         // 脱贫办审核通过：4
    ALLEVIATION_REJECT: 5,         // 脱贫办审核拒绝：5
    LOAN_CONTRACT_UPLOADED: 6      // 借贷合同已上传：6
}

export const DiscountState = {
    UNDEFINED: 0,                  // 合约初始值：0
    BANK_PASSED: 1,                // 经办网点审核通过：1
    RETAIL_PASSED: 2,              // 总行零售部审核通过：2
    RETAIL_REJECT: 3,              // 总行零售部审核拒绝：3
    ALLEVIATION_PASSED: 4,         // 脱贫办审核通过：4
    ALLEVIATION_REJECT: 5,         // 脱贫办审核拒绝：5
    PRO_AGRICULTURE_PASSED: 6,     //省农业厅审核通过 6
    PRO_AGRICULTURE_REJECT: 7,     //省农业厅审核拒绝 7
    PRO_FINANCE_PASSED: 8,         //省财政厅审核通过 8
    PRO_FINANCE_REJECT: 9,         //省财政厅审核拒绝 9
    LOAN_GRANTING: 10,               // 等待拨款    10
    LOAN_GRANTED: 11,               // 拨款已发放    11
}
