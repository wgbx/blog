---
title: vue2 配置 .eslintrc.js 规则（alloy 版本）
date: 2022-05-14
tags:
  - eslint
  - vue
---

## 为什么是 eslint-config-alloy

1. 样式相关的规则交给 Prettier 管理
2. 传承 ESLint 的理念，帮助大家建立自己的规则
3. 高度的自动化：先进的规则管理，测试即文档即网站
4. 与时俱进，第一时间跟进最新的规则

## 如何安装

1. 安装依赖

```javascript
npm install --save-dev eslint@7.5.0

npm install --save-dev @babel/core@7.20.2 @babel/eslint-parser@7.19.1 vue-eslint-parser@9.1.0 eslint-plugin-vue@7.20.0 eslint-config-alloy@3.10.0 @vue/cli-plugin-eslint@5.0.8
```

2. 添加配置文件

```javascript
module.exports = {
  root: true,
  extends: ['alloy', 'alloy/vue']
}
```

3. 编辑器安装 Eslint 插件

以上安装完毕就会自动在代码中提示 eslint 报错

1. 请注意 vue2 版本必须安装 eslint-config-alloy@3，vue3 则不需要锁定版本
2. 部分老旧项目配置高版本 eslint 编译产生问题
   1. 提高服务器的 Node 版本
   2. 适配合适的包版本

## 常见问题

1. 为什么不是 standard，airbnb？

其实配置规则也仅仅是规则，让使用的开发者舒服的同时也必须传递什么是好的代码，什么是差的代码，在这一点上 eslint-config-alloy 更让人舒服

2. 为什么不自己维护一套规则

人力成本，并没有开发者能一直迭代跟进规则，很多老旧的规则反而会拖累项目
