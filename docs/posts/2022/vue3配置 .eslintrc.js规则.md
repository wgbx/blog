---
title: vue3 配置 .eslintrc.js 规则
date: 2022-05-16
tags:
  - eslint
  - vue
---

## 如何配置 .eslintrc.js

### 步骤

1. 安装 ESLint 及相关依赖。你可以使用以下命令来安装这些依赖

```bash
pnpm add eslint @typescript-eslint/parser eslint-plugin-vue @typescript-eslint/eslint-plugin eslint-config-prettier @antfu/eslint-config -D
```

2. 在根目录下创建一个 .eslintrc.js 文件，并将以下内容复制到文件中

```javascript
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended', '@antfu', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/comma-dangle': 'off',
    'vue/html-self-closing': 'off',
    'antfu/if-newline': 'off'
  }
}
```

### 依赖介绍

上面的 eslint 配置文件需要依赖以下相关的包

1. eslint：ESLint 库，需要用于执行代码检查
2. vue-eslint-parser：用于在 ESLint 中解析 .vue 文件
3. eslint-plugin-vue： 为 Vue.js 应用提供的 ESLint 规则集合，用于检测 Vue.js 组件
4. @typescript-eslint/parser：将 TypeScript 转换为 ESLint 可以识别的 AST，生成语法树
5. @typescript-eslint/eslint-plugin：TypeScript 相关的规则集
6. eslint-config-prettier：ESLint 规则与 Prettier 格式化工具的规则相互补充，以兼容两者的冲突
7. eslint-plugin-prettier：ESLint 的插件规则，包括 prettier 的规则

### 规则集介绍

上述配置文件启用了以下的 eslint 规则集和插件：

1. eslint:recommended：通过 eslint 官方提供的最佳实践规则，检验代码语法，确保代码质量
2. plugin:vue/essential：根据 Vue.js 的最佳实践规则验证 Vue.js 应用程序的组件写法
3. @vue/prettier： 用于将 ESLint 规则与 Prettier 格式化工具的规则相互补充，以兼容两者的冲突
4. @vue/typescript：VueJS 官方提供的 typescript 配置，检查 Vue 和 TypeScript 项目的语法规范
5. @typescript-eslint/eslint-plugin：TypeScript 相关的规则
6. vue：Vue.js 的 eslint 规则
7. @typescript-eslint：TypeScript 相关的 eslint 规则
8. eslint-config-prettier：关闭与 Prettier 冲突的 ESLint 规则
9. eslint-plugin-prettier：使用 Prettier 实现 ESLint 规则
