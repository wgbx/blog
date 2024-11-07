---
title: nrm 使用说明
date: 2022-12-17
tags:
  - node
---

## 1、nrm 介绍

nrm(npm registry manager ) 是 npm 的镜像源管理工具，有时候国外资源太慢，使用这个就可以快速地在 npm 源间切换

## 2、安装 nrm

在命令行执行命令，npm install -g nrm，全局安装 nrm。

```bash
npm install -g nrm
```

![](./images/1596593600717-abf9e086-ab35-4be5-8604-7d10bb73959c.png)

## 3、使用

执行命令 nrm ls 查看可选的源。

```bash
nrm ls
```

![](./images/1596593308100-e4542d0e-033e-4b20-a8ac-852a16cf774c.png)

## 4、查看当前源

```bash
nrm current
```

![](./images/1596593661882-eaba1657-3fb4-48cb-ae20-f022086b8e24.png)

## 5、切换

如果要切换到 taobao 源，执行命令 nrm use taobao。

```bash
nrm use taobao
```

![](./images/1596593707103-6d8f9242-4430-41b6-8776-0620aa221cc8.png)

## 6、增加

你可以增加定制的源，特别适用于添加企业内部的私有源，执行命令 nrm add registry url，其中 registry 为源名，url 为源的路径。

```bash
nrm add registry http://registry.npm.frp.trmap.cn/
```

随便添加一个测试一下，名称随意取。添加之后查看已经添加成功了。（虽然暂时不能用，但是公司有自己的镜像源就好办多了。)
![](./images/1596594010210-41db4036-5d0e-4a32-8d38-688338ea01f4.png)

## 7、删除

执行命令 nrm del registry 删除对应的源。

```bash
nrm del self
```

删除自己的创建的镜像源测试一下。删除完成后查看列表，self 已经没有了。

![](./images/1596594215826-048cb7fa-578f-4150-a761-26ee2e99fb9d.png)

## 8、测试速度

你还可以通过 nrm test 测试相应源的响应时间。

```bash
nrm test npm
```

查看 npm 的速度。
![](./images/1596594271581-18015861-a8d1-40e4-a3db-ce2d32ccee84.png)

查看 taobao 的速度

![](./images/1596594324298-eb6f4d4c-f960-4f34-b905-2a1c7493db87.png)
