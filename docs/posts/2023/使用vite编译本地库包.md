---
title: 使用 vite 编译本地库包
date: 2023-11-14
tags:
  - vite
---

## 创建基本脚手架

```
npm create wgbx@latest --no-cache
```

## 开启 vite 库模式

文档详见：[https://cn.vitejs.dev/guide/build.html#library-mode](https://cn.vitejs.dev/guide/build.html#library-mode)

### vite.config.ts

```javascript
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss'

export default defineConfig({
  build: {
    cssCodeSplit: true,
    watch: {
      include: 'src/**'
    },
    lib: {
      entry: resolve(__dirname, 'packages/index.'),
      name: 'MyLib',
      fileName: 'my-lib'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue(), dts(), libCss()]
})
```

### 入口文件

packages/index.ts 将包含可以由你的包的用户导入的导出

```javascript
import MyLib from './index.vue'

export default MyLib
```

## 打包输出 lib 库

执行编译命令，根据上面的配置文件会在根目录生成一个 lib 文件夹，里面包含了 UMD、ESM 规范打包的几个 js 库文件，还有 css 样式文件，整个组件库文件最终都会输出在 dist 文件夹下

## 上传到 npm 官网

### package.json

推荐在你库的 package.json 中使用如下格式

```json
{
  "name": "my-lib",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/my-lib.umd.cjs",
  "module": "./dist/my-lib.js",
  "exports": {
    ".": {
      "import": "./dist/my-lib.js",
      "require": "./dist/my-lib.umd.cjs"
    }
  }
}
```

当然上传库到 npm 官网不能把所有文件都上传，所以还需要在根目录添加一个。npmignore 文件，其作用是忽略不需要上传的文件内容，内容如下：

```json
.vscode
examples/
packages/
vite.config.js
*.html
```

## 测试流程

在项目中新建 playground 文件夹，将 App.vue 直接替换为如下内容

```vue
<script setup>
import MyLib from '../packages'
</script>

<template>
  <MyLib />
</template>

<style></style>
```

## 使用组件

### 安装组件

```bash
pnpm add MyLib
```

### 全局使用方法

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import MyLib from 'MyLib'

createApp(App).use(Vue3StarrySky).mount('#app')
```

### 局部使用方法

```vue
<script setup>
import MyLib from 'MyLib'
</script>

<template>
  <MyLib />
</template>
```
