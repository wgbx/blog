---
title: 盘点 CSS 中的水平垂直居中
date: 2022-08-29
tags:
  - CSS
---

在父子盒子模型中，子元素在父元素的盒子上做水平垂直居中

<!--more-->

<hr/>

## 盒子模型

行内元素和块级元素的方式不同，此处仅列举常见的块级元素

1. flex 弹性盒子布局

```less
.box {
  width: 200px;
  height: 200px;
  border: 1px solid #000;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 100px;
    height: 60px;
    background: aquamarine;
  }
}
```

2. flex 子项

```less
.box {
  width: 200px;
  height: 200px;
  border: 1px solid #000;

  display: flex;

  div {
    width: 100px;
    height: 60px;
    background: aquamarine;

    margin: auto;
  }
}
```

3. grid 网格布局

```less
.box {
  width: 200px;
  height: 200px;
  border: 1px solid #000;

  display: grid;
  justify-content: center;
  align-items: center;

  div {
    width: 100px;
    height: 60px;
    background: aquamarine;
  }
}
```

4. grid 子项

```less
.box {
  width: 200px;
  height: 200px;
  border: 1px solid #000;

  display: grid;

  div {
    width: 100px;
    height: 60px;
    background: aquamarine;

    margin: auto;
  }
}
```

5. 绝对定位

```less
.box {
  width: 200px;
  height: 200px;
  border: 1px solid #000;

  position: relative;

  div {
    width: 100px;
    height: 60px;
    background: aquamarine;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
```

6. 绝对定位 + margin

```less
.box {
  width: 200px;
  height: 200px;
  border: 1px solid #000;

  position: relative;

  div {
    width: 100px;
    height: 60px;
    background: aquamarine;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}
```

7. table-cell

```less
.box {
  width: 200px;
  height: 200px;
  border: 1px solid #000;

  display: table-cell;
  vertical-align: middle;

  div {
    width: 100px;
    height: 60px;
    background: aquamarine;
  }
}
```
