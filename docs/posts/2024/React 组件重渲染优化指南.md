---
title: React 组件重渲染优化指南
date: 2024-08-17
tags:
  - react
---

## 一、问题根源

在 React 应用中，组件的渲染机制遵循着一定的规则。当父组件的状态发生更新时，React 默认会重新渲染其子组件，即便子组件所接收的 `props` 并未实际改变。这种默认行为源于 React 的更新机制，它采用了一种相对简单直观的方式来确保组件树能够及时反映状态的变化，但这也导致了在一些复杂场景下，不必要的重渲染频繁发生，从而对应用性能产生负面影响。

## 二、示例场景分析

考虑这样一个场景，有两个按钮组件 `Count` 和 `Button`：

```typescript:src/App.tsx
function App() {
  const [count, setCount] = useState(0);
  const [button, setButton] = useState(0);

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Count onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Count>
      <Button onClick={() => setButton((button) => button + 1)}>
        button is {button}
      </Button>
    </div>
  );
}
```

在上述代码中，当点击 `Count` 按钮时，`App` 组件会因为 `count` 状态的更新而重新渲染。由于 `Button` 组件是 `App` 的子组件，根据 React 的默认渲染机制，它也会随之重新渲染，即使 `Button` 组件所依赖的 `button` 状态并未改变。这就是一个典型的不必要重渲染的情况，随着应用规模的扩大和组件层级的增多，这种不必要的重渲染会积累成严重的性能问题，例如导致页面卡顿、响应延迟等。

## 三、解决方案详解

### React.memo：智能渲染控制

`React.memo` 是一个高阶组件，它通过对传入组件的 `props` 进行浅比较来决定是否需要重新渲染该组件。当 `props` 没有发生变化时，组件将不会重新渲染，从而避免了不必要的性能开销。

```typescript:src/components/Button/index.tsx
function Button(props: ButtonProps) {
  // 组件内部逻辑，如事件处理、样式应用等
}

export default memo(Button);
```

这里，`Button` 组件被 `React.memo` 包裹后，只有在其 `props` 发生实际变化时才会重新渲染。需要注意的是，`React.memo` 只进行浅比较，这意味着如果 `props` 是复杂对象或数组，且其内部元素发生了变化，但对象或数组的引用没有改变，`React.memo` 可能无法检测到这种变化，仍然认为 `props` 没有改变，从而可能导致组件没有正确更新。

### useCallback：稳定函数引用

在 React 函数组件中，每次组件重新渲染时，内部定义的函数都会重新创建，这可能导致传递给子组件的函数引用发生变化，从而引发子组件的不必要重渲染。`useCallback` 可以用来解决这个问题，它会返回一个记忆化的函数，只有在依赖项发生变化时，才会重新创建函数。

```typescript
const handleClickButton = useCallback(() => {
  setButton(button => button + 1)
}, [])

const handleClickCount = useCallback(() => {
  setCount(count => count + 1)
}, [])
```

在上述代码中，`handleClickButton` 和 `handleClickCount` 函数分别被 `useCallback` 包裹，并且依赖项为空数组，这意味着这两个函数在组件的整个生命周期内只会被创建一次，其引用将保持稳定。这样，当传递给子组件时，子组件不会因为函数引用的变化而重新渲染，除非依赖项发生改变。

### useMemo：优化数据传递

`useMemo` 用于记忆化一个值，只有在依赖项发生变化时，才会重新计算该值。这在传递复杂数据或计算成本较高的数据给子组件时非常有用，可以避免子组件因为数据的不必要重新计算而重新渲染。

```typescript
const buttonContent = useMemo(() => {
  return `button is ${button}`
}, [button])
```

这里，`buttonContent` 的值是根据 `button` 状态计算得到的，通过 `useMemo` 包裹后，只有当 `button` 状态发生变化时，才会重新计算 `buttonContent` 的值，从而保证传递给 `Button` 组件的 `props` 是稳定的，避免了 `Button` 组件因为 `props` 的不必要变化而重新渲染。

## 四、完整优化后的代码逻辑

```typescript:src/App.tsx
import { useCallback, useMemo, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [button, setButton] = useState(0);

  // 使用 useCallback 记忆化点击 Count 按钮的回调函数，确保引用稳定
  const handleClickCount = useCallback(() => {
    setCount((count) => count + 1);
  }, []);

  // 同样，使用 useCallback 记忆化点击 Button 按钮的回调函数
  const handleClickButton = useCallback(() => {
    setButton((button) => button + 1);
  }, []);

  // 运用 useMemo 记忆化 buttonContent，只有 button 状态变化时才重新计算
  const buttonContent = useMemo(() => {
    return `button is ${button}`;
  }, [button]);

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Count onClick={handleClickCount}>
        count is {count}
      </Count>
      <Button onClick={handleClickButton}>
        {buttonContent}
      </Button>
    </div>
  );
}
```

在优化后的代码中，通过合理地使用 `React.memo`、`useCallback` 和 `useMemo`，有效地避免了子组件的不必要重渲染，提高了应用的性能。

## 五、优化原理深入剖析

### React.memo

`React.memo`浅比较机制是基于 JavaScript 的 `Object.is` 方法来比较 `props` 的。它会遍历 `props` 对象的第一层属性，检查属性值是否相等（对于基本类型，直接比较值；对于对象和数组，比较引用）。如果所有属性的比较结果都相等，则认为 `props` 没有变化，组件不需要重新渲染。这种机制在大多数情况下能够有效地避免不必要的重渲染，但对于复杂数据结构，可能需要结合其他方法来确保数据的正确更新。
以下是一个简单的示例，展示了 `React.memo` 的浅比较过程：

```typescript
import React, { memo, useState } from'react';

const ChildComponent = memo(({ prop1, prop2 }) => {
  console.log('ChildComponent 渲染');
  return (
    <div>
      {prop1} - {prop2}
    </div>
  );
});

const ParentComponent = () => {
  const [obj, setObj] = useState({ value: 1 });
  const [num, setNum] = useState(1);

  const handleClick = () => {
    // 只更新 obj 的属性值，引用不变
    setObj((prev) => ({...prev, value: prev.value + 1 }));
  };

  const handleClick2 = () => {
    // 更新 num 的值
    setNum((prev) => prev + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>更新对象属性</button>
      <button onClick={handleClick2}>更新数字</button>
      <ChildComponent prop1={obj} prop2={num} />
    </div>
  );
};

export default ParentComponent;
```

在上述代码中，点击“更新对象属性”按钮时，`ChildComponent` 不会重新渲染，因为 `prop1` 的引用没有改变；而点击“更新数字”按钮时，`ChildComponent` 会重新渲染，因为 `prop2` 的值发生了变化。

### useCallback

`useCallback` 内部维护了一个缓存，它会将函数及其依赖项作为键值对存储在缓存中。当组件重新渲染时，它会检查当前的依赖项是否与缓存中的依赖项相同。如果相同，则返回缓存中的函数引用；如果不同，则重新创建函数并更新缓存。这种机制保证了在依赖项不变的情况下，函数引用的稳定性，从而避免了子组件因为函数引用变化而重新渲染。
以下是一个简单的示例，展示了 `useCallback` 的工作原理：

```typescript
import React, { useCallback, useState } from'react';

const ChildComponent = ({ onClick }) => {
  console.log('ChildComponent 渲染');
  return <button onClick={onClick}>点击我</button>;
};

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  // 使用 useCallback 记忆化回调函数
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <ChildComponent onClick={handleClick} />
      <p>Count: {count}</p>
    </div>
  );
};

export default ParentComponent;
```

在上述代码中，无论 `ParentComponent` 重新渲染多少次，传递给 `ChildComponent` 的 `handleClick` 函数引用始终保持不变，因此 `ChildComponent` 不会因为函数引用的变化而重新渲染，除非 `useCallback` 的依赖项发生改变。

### useMemo

`useMemo` 的工作原理类似，它也会根据依赖项来缓存计算结果。当依赖项发生变化时，`useMemo` 会重新执行传入的函数，并更新缓存的结果；当依赖项不变时，直接返回缓存的结果。这样可以避免在每次组件渲染时都进行不必要的计算，提高性能。
以下是一个简单的示例，展示了 `useMemo` 的工作原理：

```typescript
import React, { useMemo, useState } from'react';

const ChildComponent = ({ data }) => {
  console.log('ChildComponent 渲染');
  return <div>{data}</div>;
};

const ParentComponent = () => {
  const [num, setNum] = useState(1);

  // 使用 useMemo 记忆化计算结果
  const data = useMemo(() => {
    console.log('计算 data');
    return `Data: ${num * 2}`;
  }, [num]);

  const handleClick = () => {
    setNum((prev) => prev + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>更新数字</button>
      <ChildComponent data={data} />
    </div>
  );
};

export default ParentComponent;
```

在上述代码中，首次渲染时，会执行 `useMemo` 中的函数计算 `data` 的值，并将结果缓存起来。当点击“更新数字”按钮时，只有当 `num` 的值发生变化时，才会重新执行 `useMemo` 中的函数计算新的 `data` 值，否则直接使用缓存的结果，从而避免了不必要的计算和 `ChildComponent` 的重新渲染。

## 六、注意事项与最佳实践

### 避免过度优化

在应用开发过程中，不要过早地进行性能优化。应该首先关注功能的实现和代码的可读性、可维护性。只有在通过性能分析工具（如 React DevTools 的 Profiler 功能）确定存在性能瓶颈时，才针对性地应用这些优化策略。过度优化可能会导致代码变得复杂难懂，增加开发和维护成本，而实际的性能提升可能并不明显

### 正确设置依赖项

对于 `useCallback` 和 `useMemo`，正确设置依赖项是关键。依赖项应该是真正影响函数行为或计算结果的变量。如果遗漏了关键的依赖项，可能会导致缓存的数据过期，从而使组件无法正确更新；如果包含了不必要的依赖项，可能会导致函数或计算结果频繁更新，进而引发不必要的重渲染。在设置依赖项时，要仔细分析函数或计算逻辑与哪些变量相关，并确保只将这些变量纳入依赖项数组

以下是一个错误设置依赖项的示例：

```typescript
import React, { useCallback, useState } from'react';

const ChildComponent = ({ onClick }) => {
  console.log('ChildComponent 渲染');
  return <button onClick={onClick}>点击我</button>;
};

const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [otherValue, setOtherValue] = useState('');

  // 错误地将 otherValue 作为依赖项，即使它与 handleClick 函数无关
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, [otherValue]);

  const handleChange = (e) => {
    setOtherValue(e.target.value);
  };

  return (
    <div>
      <ChildComponent onClick={handleClick} />
      <input type="text" onChange={handleChange} />
      <p>Count: {count}</p>
    </div>
  );
};

export default ParentComponent;
```

在上述代码中，`handleClick` 函数不应该依赖于 `otherValue`，但由于错误地将其设置为依赖项，当 `otherValue` 发生变化（例如在输入框中输入内容）时，`useCallback` 会重新创建 `handleClick` 函数，导致传递给 `ChildComponent` 的函数引用发生变化，从而使 `ChildComponent` 重新渲染，这是不必要的。

### 处理复杂数据结构

当 `props` 包含复杂数据结构（如嵌套对象或数组）时，`React.memo` 的浅比较可能无法满足需求。在这种情况下，可以考虑使用 `immer.js` 等库来创建不可变数据副本，或者手动实现深度比较逻辑，以确保 `React.memo` 能够正确检测到数据的变化，从而触发组件的正确重渲染。另外，对于复杂数据结构的更新，也要遵循不可变数据的原则，通过创建新的对象或数组来更新数据，避免直接修改原数据，以保证 React 能够准确地识别数据的变化并进行相应的更新操作。

以下是一个使用 `immer.js` 处理复杂数据结构的示例：

```typescript
import React, { memo, useState } from'react';
import produce from 'immer';

interface ComplexData {
  nested: {
    value: number;
  };
}

const ChildComponent = memo(({ data }) => {
  console.log('ChildComponent 渲染');
  return <div>{data.nested.value}</div>;
});

const ParentComponent = () => {
  const [complexData, setComplexData] = useState<ComplexData>({
    nested: {
      value: 1,
    },
  });

  const handleClick = () => {
    // 使用 immer.js 更新复杂数据结构
    setComplexData(
      produce((draft) => {
        draft.nested.value += 1;
      })
    );
  };

  return (
    <div>
      <button onClick={handleClick}>更新复杂数据</button>
      <ChildComponent data={complexData} />
    </div>
  );
};

export default ParentComponent;
```

在上述代码中，使用 `immer.js` 的 `produce` 函数来更新复杂数据结构，它会创建一个新的不可变数据副本，确保 `React.memo` 能够正确检测到数据的变化，从而使 `ChildComponent` 能够正确地重新渲染。
