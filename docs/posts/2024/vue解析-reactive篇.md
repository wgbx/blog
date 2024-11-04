---
title: vue 解析 -reactive 篇
date: 2024-01-17
tags:
  - vue
---

## 前言

- 本文将深入讨论 vue3.4.7 源码中 reactive 的实现，本文将分为三个部分，首先介绍 reactive 及使用，然后源码解读，最后总结 reactive 优缺点及使用注意事项，进行深入学习 reactive 原理
-

## reactive 介绍

- reactive 是 vue3 中的一个核心函数，用于将一个普通的对象转换成一个响应式的对象。所谓响应式对象，是指当该对象的属性发生变化时，可以自动触发视图的更新
- 在 Vue2 中，实现响应式的方式是通过 Object.defineProperty 来拦截属性的读取和设置操作。Vue3 中则采用了更高效的 Proxy 对象来实现响应式，因此 reactive 函数在 Vue3 中扮演了更加重要的角色

## reactive 背景

在使用 Vue3 开发应用时，我们希望能够简单地定义数据，并在数据发生变化时自动更新视图。如果不使用 reactive 函数，我们需要手动监听数据的变化，并手动触发视图的更新，这样的编程方式既繁琐又容易出错

## reactive 使用

reactive 函数参数

纯对象
    - object, array, function, Set, Map

```vue
// 1、基本对象  data 此时就是一个响应式对象
const data = reactive({
    name: '小易',
    paly: function () {
        console.log('播放');
    },
    habits: ['吃饭', '睡觉', '打豆豆'],
})
```

## 源码实现

```js
export function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
export function reactive(target: object) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (isReadonly(target)) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap,
  )
}

export function isReadonly(value: unknown): boolean {
  return !!(value && (value as Target)[ReactiveFlags.IS_READONLY])
}

function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>,
) {
  if (!isObject(target)) {
    if (__DEV__) {
      console.warn(`value cannot be made reactive: ${String(target)}`)
    }
    return target
  }
  // target is already a Proxy, return it.
  // exception: calling readonly() on a reactive object
  if (
    target[ReactiveFlags.RAW] &&
    !(isReadonly && target[ReactiveFlags.IS_REACTIVE])
  ) {
    return target
  }
  // target already has corresponding Proxy
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  // only specific value types can be observed.
  const targetType = getTargetType(target)
  if (targetType === TargetType.INVALID) {
    return target
  }
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers,
  )
  proxyMap.set(target, proxy)
  return proxy
}

```
