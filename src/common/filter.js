import { UserRole, AuditState, DiscountState } from "./enum";
// 角色名称过滤器
export const RoleName = (roleCode) => {
    let desc = "";
    switch (roleCode) {
        case UserRole.SUPERADMIN:
            desc = "超级管理员";
            break;
        case UserRole.BANK:
            desc = "经办网点";
            break;
        case UserRole.RETAIL:
            desc = "总行零售部";
            break;
        case UserRole.ALLEVIATION:
            desc = "脱贫办";
            break;
        case UserRole.PROVINCIAL_AGRICULTURAL_DEPARTMENT:
            desc = "省农业厅";
            break;
        case UserRole.PROVINCIAL_FINANCE_BUREAU:
            desc = "省财政局";
            break;
        case UserRole.CITY_FINANCE_DEPARTMENT:
            desc = "市财政厅";
            break;
        default:
            break;
    }
    return desc;
}

export const AuditStateDesc = (auditState) => {
    let desc = "";
    switch (auditState) {
        case AuditState.UNDEFINED:
            desc = "合约初始值";
            break;
        case AuditState.BANK_PASSED:
            desc = "申请成功，等待总行零售部审核";
            break;
        case AuditState.RETAIL_PASSED:
            desc = "总行零售部审核通过，等待脱贫办审核";
            break;
        case AuditState.RETAIL_REJECT:
            desc = "总行零售部审核拒绝";
            break;
        case AuditState.ALLEVIATION_PASSED:
            desc = "脱贫办审核通过,等待上传借贷合同";
            break;
        case AuditState.ALLEVIATION_REJECT:
            desc = "脱贫办审核拒绝";
            break;
        case AuditState.LOAN_CONTRACT_UPLOADED:
            desc = "借贷合同已上传";
            break;
        default:
            break;
    }
    return desc;
}

// 贴息状态描述
export const DiscountStateDesc = (discountState) => {
    let desc = "";
    switch (discountState) {
        case DiscountState.UNDEFINED:
            desc = "合约初始值";
            break;
        case DiscountState.BANK_PASSED:
            desc = "贴息申请成功，等待总行零售部审核";
            break;
        case DiscountState.RETAIL_PASSED:
            desc = "总行零售部审核成功，等待脱贫办审核";
            break;
        case DiscountState.RETAIL_REJECT:
            desc = "总行零售部审核拒绝";
            break;
        case DiscountState.ALLEVIATION_PASSED:
            desc = "脱贫办审核通过,等待省农业厅和省财政厅审核";
            break;
        case DiscountState.ALLEVIATION_REJECT:
            desc = "脱贫办审核拒绝";
            break;

        case DiscountState.PRO_AGRICULTURE_PASSED:
            desc = "省农业厅审核通过,等待省财政厅审核";
            break;
        case DiscountState.PRO_AGRICULTURE_REJECT:
            desc = "省农业厅审核拒绝";
            break;

        case DiscountState.PRO_FINANCE_PASSED:
            desc = "省财政厅审核通过,等待省农业厅审核";
            break;
        case DiscountState.PRO_FINANCE_REJECT:
            desc = "省财政厅审核拒绝";
            break;

        case DiscountState.LOAN_GRANTING:
            desc = "审核通过，等待省财政厅拨款";
            break;
        case DiscountState.LOAN_GRANTED:
            desc = "已划拨款项";
            break;
        default:
            break;
    }
    return desc;
}

export const DiscountCheckDesc = (checkCode) => {
    let desc = "";
    switch (checkCode) {
        case 0:
            desc = "未审核";
            break;
        case 1:
            desc = "审核通过";
            break;
        case 2:
            desc = "审核拒绝";
            break;
        default:
            break;
    }

    return desc;
}

// 首页路由默认跳转过滤器
export const UrlRouteIndex = (roleCode) => {
    let url = "";
    switch (roleCode) {
        case UserRole.BANK:
            url = "apply";
            break;
        case UserRole.RETAIL:
            url = "apply";
            break;
        case UserRole.ALLEVIATION:
            url = "apply";
            break;
        case UserRole.PROVINCIAL_AGRICULTURAL_DEPARTMENT:
            url = "summary";
            break;
        case UserRole.PROVINCIAL_FINANCE_BUREAU:
            url = "summary";
            break;
        case UserRole.CITY_FINANCE_DEPARTMENT:
            url = "summary";
            break;
        default:
            break;
    }
    return url;
}