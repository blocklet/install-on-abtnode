const flat = require('flat');

module.exports = flat({
  common: {
    noData: '无数据',
    actions: '操作',
    delete: '删除',
    cancel: '关闭',
    next: '下一步',
    prev: '上一步',
    confirm: '确认',
    requiredError: '请输入正确的 {type}',
    copy: '复制到剪切板',
    yes: 'YES',
    no: 'NO',
  },
  abtnode: {
    tableTitle: 'list',
    add: '添加 ABT Node',
    info: 'ABT Node 信息',
    placeholder: '请输入 ABT Node URL',
    table: {
      name: '标题',
      description: '描述',
      url: 'URL',
      createdAt: '创建时间',
      initialized: '是否初始化',
      did: 'DID',
    },
    fail: '请求 ABT Node 失败 请重新尝试',
  },
  generate: {
    add: '生成安装按钮',
    link: '生成使用地址',
    placeholder: '请输入 Blocklet Meta URL',
  },
  blocklet: {
    meta: {
      info: 'Blocklet Meta 信息',
      title: '标题',
      description: '描述',
      version: '版本',
    },
    basicInfo: '基本信息',
    action: '操作',
    selectnode: '选择 ABT Node',
    select: '进入',
    fail: '请求 Blocklet Meta URL 失败 请重新尝试',
  },
});
