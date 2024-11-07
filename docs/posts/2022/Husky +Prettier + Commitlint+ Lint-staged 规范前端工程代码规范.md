---
title: Husky +Prettier + Commitlint+ Lint-staged 规范前端工程代码规范
date: 2022-12-10
tags:
  - eslint
---

### 前言

在实际开发中常常会遇到同事之间协作开发，由于编辑器代码格式化的不同以及其他代码规范问题，导致代码之间格式不统一，合并代码时常常非常痛苦，因此急需在项目中配置一套可靠的代码规范工具，但是网上的文章很多配置非常复杂，因此总结了一套非常简单的配置方式，能够快速搭建一套可用模板。 本文主要有两大工具 Prettier+Commitlint，配置中穿插 Lint-staged 、Husky 、Eslint 等工具的配置
部分关键工具及文件介绍：

- Prettier：主要用来实现代码提交前的格式化
- Commitlint：主要用来实现代码 commit 信息的规范性检测
- Husky：主要是操作 git 钩子的工具
- Lint-staged ：主要是本地暂存代码检查工具
- .husky 文件中的 pre-commit：通过钩子函数判断提交的代码是否符合规范
- .husky 文件中的 commit-msg：通过钩子函数判断 commit 信息是否符合规范

### 安装依赖

```bash
npm install @commitlint/cli @commitlint/config-conventional husky lint-staged prettier -D
```

### 添加配置文件

1. .commitlintrc.js

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
        'ci', // 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
        'docs', // 文档更新
        'feat', // 新增功能
        'merge', // 分支合并 Merge branch ? of ?
        'fix', // bug 修复
        'perf', // 性能, 体验优化
        'refactor', // 重构代码(既没有新增功能，也没有修复 bug)
        'style', // 不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
        'test', // 新增测试用例或是更新现有测试
        'revert', // 回滚某个更早之前的提交
        'chore' // 不属于以上类型的其他类型
      ]
    ],
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never']
  }
}
```

2. .prettierrc.js

```javascript
module.exports = {
  printWidth: 140,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'avoid'
}
```

3. 修改 package.json

```javascript
// 在最外层Json添加以下代码
"lint-staged": {
  "*.{js,scss,md,json}": [
    "prettier --write"
  ],
    "*.vue": [
    "prettier --parser=vue --write"
  ]
},
```

### 添加 husky 脚本

```javascript
// 依次输入以下指令
npm pkg set scripts.prepare="husky install"
npm run prepare
npx husky add .husky/pre-commit "npx --no -- lint-staged -q"
npx husky add .husky/commit-msg "npx --no -- commitlint --edit"
```

以上，配置完毕就可以在 git 提交前格式化提交的代码及对提交格式校验

### 常见问题

1. 可不可以做 EsLint 校验？

可以，但不推荐，lint-staged 的工作流程是在提交时进行 git 暂存，然后恢复储藏，在这个过程中，如果进行 eslint -- fix，有几率出错，也不推荐任何 fix 操作，推荐使用编辑器插件或者 npx eslint 来解决

2. 通过以上配置出错？

prettier，husky 等一些包会对 node，vue 等版本有要求，如果提示错误，需要具体问题具体分析
