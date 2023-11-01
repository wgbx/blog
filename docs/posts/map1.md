---
title: 基于地图的可视化模型方案（一）：加载地图
date: 2019-11-15 15:54:03
tags:
  - Webgl
  - Mapbox
---

基于地图的可视化模型方案，使用Mapbox在页面上加载地图

<!--more-->
<hr/>

## vue-cli

在框架，模块化，越来越流行的时代，项目采用的是vue-cli脚手架，可在[vueCliTemplate](https://github.com/wgbx/vueTemplate)中clone后开发

## 地图

目前市面上可选择的地图特别多：高德地图丶百度地图丶mapbox...
基于目前可视化框架的考虑，大多数都选择mapbox作为底图

1. 安装

```
    npm install mapbox --save
```

2. 引用

```
 import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
```

3. css

```
#map {
    width: 100%;
    height: 100%;
    position: absolute;
  }
```

4. JavaScript

```
  mounted() {
    this.initMap();
  },

  methods: {
      initMap() {
          mapboxgl.accessToken = 'Token';
          this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/evollers/cjzhx2vaf35ix1cp9d7inydoc',
          center: [116.585115, 40.07452],
          zoom: 12.44,
          pitch: 52.99,
          bearing: -74.40,
          });
        }
      }
```

5. 词汇释义

- accessToken：在[mapbox](https://www.mapbox.com/)注册后悔生成一个密匙token，通过token使用地图服务

- container：绑定dom的ID值

- style：mapbox工作台自己创建的样式地图代码

- center：中心点

- zoom：层级

- pitch：地图俯仰角度

- bearing：角度

## 实现

![map](https://gitee.com/wgbx/resources/raw/master/blog/map/0.png)
