---
title: 微信小程序：封装 http 请求 (callback）
date: 2019-06-12 15:54:03
tags:
  - 微信小程序
---

使用 callback 思路封装小程序请求

<!--more-->

<hr/>

## config.js

一般来说，所有项目都需要建立一个 config.js 来储存项目的一些基本信息，如公钥私钥或是环境参数

```js
const config = {
  api_base_url: 'https://music.163.com/'
}
export { config }
```

## http 封装

- 创建 http.js 文件，定义 HTTP 类
- 定义公用请求方法
- 导出当前类

```js
import { config } from '../config'
const tips = {
  1: '抱歉,出现了一个错误'
}
class HTTP {
  request(params) {
    wx.request({
      header: {
        'content-type': 'application/json'
      },
      url: config.api_base_url + params.url,
      data: params.data,
      method: params.method ? params.method : 'GET',
      success: res => {
        if (res.data == success) {
          params.success && params.success(res.data)
        } else {
          let errorCode = res.data.error_code
          this._show_error(errorCode)
        }
      },
      fail: err => {
        this._show_error(1)
      }
    })
  }
  _show_error(errorCode) {
    wx.showToast({
      title: tips[errorCode ? errorCode : 1],
      icon: 'none',
      duration: 2000
    })
  }
}
export { HTTP }
```

## Api 封装

```js
import { HTTP } from '../util/http'
class musicModel extends HTTP {
  getUserInfo(callback) {
    this.request({
      url: 'api/v1/user/detail/251282779',
      success: res => {
        callback(res)
      }
    })
  }
}
export { musicModel }
```

## 调用

```js
import {
  musicModel
} from '../models/music'
let musicModel = new musicModel();

getUserInfo(){
    musicModel.getUserInfo(res=>{
      this.setData({
        info: res
      })
   })
}
```
