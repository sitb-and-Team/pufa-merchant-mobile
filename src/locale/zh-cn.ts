/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/30
 */
export const lang = {
  aliPay: '支付宝支付',
  weChat: '微信支付',
  quickPay: '快捷支付',
  mpos: 'POS支付',
  address: '地址',
  confirm: '确认',
  cancel: '取消',
  legalPerson: '法人姓名',
  legalPersonPhone: '法人电话',
  legalIdNo: '法人身份证号码',
  legalEmail: '法人邮箱',
  idType: '证件类型',
  idNo: '证件号',

  idCard: '身份证',
  tmpIdCard: '临时身份证',
  officer: '官员证',
  civil: '公民证',
  policeOfficer: '警官证',
  soldiers: '士兵证',
  passport: '护照',
  hkMacao: '港澳通行证',

  percentage: '百分比',
  cap_percentage: '封顶加百分比',
  cap: '固定值',

  normalFeeRate: {
    fee: '费率',
    type: '费率类型',
    min: '最低费率',
    max: '最高费率'
  },
  serviceFeeRate: {
    fee: '服务费率',
    type: '服务费类型',
    min: '最低服务费',
    max: '最高服务费'
  },
  debitFeeRate: {
    fee: '借记卡费率',
    type: '借记卡类型',
    min: '最低借记费',
    max: '最高借记费'
  },
  creditFeeRate: {
    fee: '贷记卡费率',
    type: '贷记卡类型',
    min: '最低贷记费',
    max: '最高贷记费'
  },
  settleBankName: '结算银行名称',
  settleBankNo: '结算银行行号',
  accountName: '结算账户名',
  accountNumber: '结算账户号',
  auditNumber: "交易流水号",
  merchantName: '商户名',
  merchantNo: '商户号',
  checkValue: '验证码',
  merchant: {
    basic: '商户基本信息',
    cost: '商户结算信息',
    list: '商户列表'
  },
  payment: {
    at: "支付时间",
    remark: "描述",
    status: "支付状态",
    totalAmount: "支付金额",
    success: "交易成功",
    failure: "交易失败",
    waitPayment: "待支付",
    processing: "处理中",
    cancelled: "交易撤销",
    refunded: "交易已经退货",
    refundedPart: "已经部分退货",
    close: "交易关闭",
    delete: "删除"
  },
  paymentDetail: '交易详情'
};


export const menu = {
  home: '首页',
  user: '我',
  tradeRecord: '交易记录',
  merchantIndex: '商户平台',
  merchantBinding: '商户绑定',
  merchantLogin: '商户登录',
  merchantInfo: '商户信息',
  merchantRate: '费率信息',
  paymentDetail: '交易详情'
};

export const resErrMsg = {};

export const statusCode = {
  '0000': '请求成功',
  '1000': '未授权',
  '1001': '无访问权限',
  '1002': '无效授权或者密码不正确',
  '1103': '用户已经存在',
  '1104': '用户不存在',
  '1203': '客户端已经存在',
  '1204': '客户端不存在',
  '3001': '无效的手机号或者Email',
  '3000': '验证码不正确或者超时'
};
