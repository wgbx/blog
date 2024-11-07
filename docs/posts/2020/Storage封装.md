---
title: Storage 封装
date: 2020-07-20 15:54:03
tags:
  - Storage
  - vue
---

Storage 封装

<!--more-->

<hr/>

## 封装思路

```js
const STORAGE_KEY = 'mall'

class Storage {
  setItem(key, valueJson, value) {
    if (valueJson) {
      const val = this.getStorage(valueJson)
      val[key] = value
      this.setItem(valueJson, val)
    } else {
      const val = this.getStorage()
      val[key] = value
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    }
  }
  getItem(key, valueJson) {
    if (valueJson) {
      const val = this.getItem(valueJson)
      if (val) return val[key]
    } else {
      return this.getStorage()[key]
    }
  }
  getStorage() {
    return JSON.parse(window.sessionStorage.getItem('STORAGE_KEY') || '{}')
  }
  clear(key, valueJson) {
    const val = this.getStorage()
    if (valueJson) {
      delete val[valueJson][key]
    } else {
      delete val[key]
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }
}

export default Storage
```
