---
title: 使用 knip 清理 turbo 项目未使用代码
date: 2025-06-08
tags:
  - monorepo
  - turbo
  - knip
  - 代码优化
  - 工程化
---

## 背景

在优化 turbo monorepo 项目过程中，发现代码库中存在大量未使用的代码。这些冗余代码不仅增加了项目体积，还降低了代码的可维护性。经过技术调研，选择使用 knip 作为代码清理工具，取得了显著效果。本文将分享 knip 在 turbo 项目中的实践经验和最佳实践。

## 未使用代码的影响

未使用代码的存在会带来以下问题：

1. **构建性能下降**：构建过程需要处理冗余代码，在大型项目中尤为明显
2. **包体积膨胀**：未使用代码会增加最终构建产物的体积，影响应用加载性能
3. **维护成本上升**：新开发人员需要额外时间区分有效代码和冗余代码
4. **重构风险增加**：重构过程中难以判断代码是否可安全删除

## knip 工具介绍

knip 是一个专注于 JavaScript/TypeScript 项目的代码分析工具，主要功能包括：

- 未使用文件检测
- 未使用导出检测
- 未使用依赖检测
- 未使用类型检测
- 重复导出检测

## knip 工作原理

### 1. 依赖图构建

knip 通过以下步骤构建完整的依赖关系图：

1. **AST 解析**：解析源代码生成抽象语法树
2. **依赖追踪**：从入口文件开始，记录模块间的导入导出关系
3. **类型信息收集**：利用 TypeScript 类型系统收集类型定义和使用信息

### 2. 死代码检测机制

knip 采用以下方法检测死代码：

1. **可达性分析**：从入口点开始，标记所有可达的代码路径
2. **导出分析**：检查每个导出是否被其他模块引用
3. **类型使用分析**：追踪类型定义的使用情况

### 3. 动态导入处理

对于动态导入场景，knip 采用以下处理策略：

```typescript
// 动态导入组件
const Component = await import(`./components/${name}`)
```

1. **静态分析**：分析字符串字面量，识别常见动态导入模式
2. **启发式规则**：基于项目结构应用启发式规则
3. **配置覆盖**：支持通过配置处理特定动态导入场景

## turbo 项目集成方案

### 依赖安装

```bash
pnpm add -D knip
```

### 配置说明

在项目根目录创建 `knip.json` 配置文件：

```json
{
  "$schema": "https://unpkg.com/knip@latest/schema.json",
  "entry": ["apps/*/src/index.{ts,tsx}", "packages/*/src/index.{ts,tsx}", "apps/*/src/pages/**/*.{ts,tsx}", "apps/*/src/app/**/*.{ts,tsx}"],
  "project": ["apps/*/src/**/*.{ts,tsx}", "packages/*/src/**/*.{ts,tsx}", "apps/*/src/**/*.json", "apps/*/src/**/*.css"],
  "ignoreDependencies": ["@types/*", "eslint-*", "prettier", "@babel/*"],
  "ignoreExportsUsedInFile": true,
  "ignore": ["**/node_modules/**", "**/dist/**", "**/.turbo/**", "**/coverage/**"],
  "rules": {
    "files": "error",
    "dependencies": "error",
    "exports": "error",
    "types": "error",
    "duplicates": "error"
  }
}
```

配置要点：

1. **入口文件配置**：覆盖所有可能的入口点
2. **项目范围定义**：包含需要分析的代码范围
3. **忽略规则设置**：排除不需要分析的文件和依赖

### 脚本配置

在 `package.json` 中添加以下脚本：

```json
{
  "scripts": {
    "knip": "knip",
    "knip:fix": "knip --fix",
    "knip:report": "knip --report",
    "knip:watch": "knip --watch"
  }
}
```

## 代码清理流程

### 分析执行

执行分析命令：

```bash
pnpm knip
```

分析报告包含以下信息：

1. **未使用文件**：文件路径、修改时间、文件大小
2. **未使用导出**：导出名称、类型、位置
3. **未使用依赖**：依赖名称、版本、类型
4. **未使用类型**：类型名称、定义位置、使用情况

### 结果处理

处理分析结果的步骤：

1. **代码使用确认**：

   - 检查动态导入
   - 检查反射使用
   - 检查框架特定用法
   - 检查测试文件

2. **代码优化**：

   - 版本控制
   - 变更记录
   - 文档更新
   - 团队通知

3. **依赖更新**：
   - 依赖关系检查
   - package.json 更新
   - lock 文件更新
   - 兼容性测试

## 最佳实践

### 执行时机

建议在以下场景执行 knip 分析：

- 项目重构后
- 版本发布前
- 定期执行（建议每周）
- 代码审查时

### CI/CD 集成

在 CI/CD 流程中添加 knip 检查：

```yaml
name: Code Analysis
on: [push, pull_request]
jobs:
  knip:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm knip
      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          name: knip-report
          path: knip-report.json
```

### 特殊场景处理

1. **动态导入处理**：

   ```typescript
   // @knip-ignore
   const module = await import('./module')
   ```

2. **框架特定文件**：

   ```typescript
   // @knip-ignore
   export default function Page() {
     return <div>Page</div>
   }
   ```

3. **测试文件处理**：
   ```typescript
   // @knip-ignore
   describe('Test', () => {
     it('should work', () => {
       // ...
     })
   })
   ```

## 效果评估

实施 knip 后，项目得到以下改善：

1. 代码库结构优化
2. 项目体积显著减小
3. 代码可维护性提升
4. 潜在问题发现
5. 构建性能优化
6. 维护成本降低

## 总结

通过定期执行 knip 分析并处理结果，持续优化项目代码质量。建议将 knip 作为代码质量保证体系的重要组成部分，与 ESLint、Prettier 等工具协同工作，构建完整的代码质量保证体系。

代码质量优化是一个持续的过程，需要团队保持对代码质量的关注和投入。希望本文的实践经验能够帮助开发团队更好地管理项目代码质量。
