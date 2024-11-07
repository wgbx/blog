---
title: vue2 配置 .eslintrc.js 规则
date: 2022-05-15
tags:
  - eslint
  - vue
---

# 如何配置 .eslintrc.js

## 步骤

1. 安装 ESLint 及相关依赖。你可以使用以下命令来安装这些依赖

```bash
pnpm add eslint vue-eslint-parser eslint-plugin-vue eslint-config-prettier -D
```

2. 在根目录下创建一个 .eslintrc.js 文件，并将以下内容复制到文件中

```javascript
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', 'plugin:vue/strongly-recommended', 'plugin:vue/recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  plugins: ['vue']
}

```

## 依赖介绍

上面的 eslint 配置文件需要依赖以下相关的包

1. eslint：ESLint 库，需要用于执行代码检查
2. vue-eslint-parser：用于在 ESLint 中解析 .vue 文件
3. eslint-plugin-vue： 为 Vue.js 应用提供的 ESLint 规则集合，用于检测 Vue.js 组件
4. eslint-config-prettier：ESLint 规则与 Prettier 格式化工具的规则相互补充，以兼容两者的冲突

## 规则集介绍

上述配置文件启用了以下的 eslint 规则集和插件：

1. eslint:recommended：该规则集包含常见的 ESLint 规则，用于帮助捕获代码错误、风格问题和最佳实践。
2. plugin:vue/essential：该规则集包含一个最小的、基本的 ESLint 配置，用于检查 Vue.js 模板、脚本和样式。
3. plugin:vue/strongly-recommended：此规则集是 plugin:vue/essential 规则集的扩展版本，增加了建议的规则和最佳实践的规则，用于检查 Vue.js 模板、脚本和样式。
4. plugin:vue/recommended：此规则集是 plugin:vue/strongly-recommended 规则集的扩展版本，增加了更严格的规则，用于检查 Vue.js 模板、脚本和样式。
5. prettier：prettier 是一种代码格式化工具，该插件的配置用于与 ESLint 集成。
