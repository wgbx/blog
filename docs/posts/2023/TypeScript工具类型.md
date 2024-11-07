---
title: TypeScript 工具类型
date: 2023-01-12
tags:
  - TypeScript
  - docs
---
以下是 TypeScript 中所有的工具类型（Utility Type）列表，按名字字母顺序排列：

## Brand

`Brand<T, U>`：给类型 `T` 添加一个特定标签类型 `U`

```typescript
type Currency = Brand<number, 'currency'>;
const amount: Currency = 42;

// 下面的代码会报错，因为 Currency 类型只能赋值给 Currency类型
const total: number = amount;
```

## Capitalize

`Capitalize<T>`：将字符串类型 `T` 的第一个字符转换为大写

```typescript
type Title = 'alice in wonderland';
type CapitalizedTitle = Capitalize<Title>; // 类型为 'Alice in wonderland'
```

## ConditionalExcept

`ConditionalExcept<T, U, V>`：根据条件将类型 `T` 中的某些属性剔除

```typescript
interface User {
  name: string;
  email: string | null;
  age?: number;
}

// 排除 User 类型中所有可能为 null 的属性
type UserNotNull = ConditionalExcept<User, null>;
// 类型为 { name: string; age?: number; }
```

## ConstructorParameters

`ConstructorParameters<T>`：获取构造函数 `T` 的参数类型数组

```typescript
class Person {
  constructor(public name: string, public age:  number) {}
}

type PersonParams = ConstructorParameters<typeof Person>; // 类型为 [string, number]
```

## Diff

`Diff<T extends object, U extends object>`：计算类型 `T` 和类型 `U` 的属性差集

```typescript
interface Person {
  name: string;
  email: string;
  age: number;
}

interface User {
  name: string;
  email: string;
}

type PersonWithoutUserProps = Diff<Person, U>; // 类型为 { age: number; }
```

## Exclude

`Exclude<T, U>`：从类型 `T` 中剔除可以赋值给类型 `U` 的类型

```typescript
type NumberOrString = number | string;
type OnlyNumber = Exclude<NumberOrString, string>; // 类型为 number
```

## ExcludeKeys

`ExcludeKeys<T, U>`：从类型 `T` 中剔除属性名为联合类型 `U` 中的属性，并创建一个新类型

```typescript
interface User {
  name: string;
  email: string;
  age: number;
}

type UserWithoutName = ExcludeKeys<User, 'name' | 'email'>; // 类型为 { age: number; }
```

## Extract

`Extract<T, U>`：从类型 `T` 中提取可以赋值给类型 `U` 的类型

```typescript
type NumberOrString = number | string;
type OnlyString = Extract<NumberOrString, string>; // 类型为 string
```

## ExtractKeys

`ExtractKeys<T, U>`：从类型 `T` 中提取属性名为联合类型 `U` 中的属性，并创建一个新类型

```typescript
interface User {
  name: string;
  email: string;
  age: number;
}

type UserWithoutName = ExtractKeys<User, 'age'>; // 类型为 { age: number; }
```

## InferType

`InferType<T>`：从函数或类中的 `return` 类型中推断出类型

```typescript
type InferenceResult<T> = T extends (params: infer P) => infer R? [P, R] : never;

function greet(name: string) {
  return `Hello, ${name}!`;
}

type GreetResult = InferType<typeof greet>; // 类型为 [string, string]
```

## InstanceType

`InstanceType<T>`：获取构造函数 `T` 返回的实例类型

```typescript
class Person {
  constructor(public name: string, public age: number) {}
}

type PersonInstance = InstanceType<typeof Person>; // 类型为 Person
```

## Introspect

`Introspect<T>()`：获取接口类型 `T` 的属性键的联合类型

```typescript
type IntrospectedPerson = Introspect<Person>();
// 类型为
// {
//   Alice: "Alice";
//   Bob: "Bob";
//   Charlie: "Charlie";
// }
```

## Immutable

`Immutable<T>`：将类型 `T` 中所有属性设为不可变的

```typescript
interface User {
  name: string;
  email: string;
}

type ImmutableUser = Immutable<User>; // 类型为 { readonly name: string; readonly email: string; }
```

## Mutable

`Mutable<T>`：将类型 `T` 中所有属性设为可变的

```typescript
interface User {
  readonly name: string;
  readonly email: string;
}

type MutableUser = Mutable<User>; // 类型为 { name: string; email: string; }
```

## NonNullable

`NonNullable<T>`：将类型 `T` 中的 `null` 和 `undefined` 类型排除

```typescript
interface User {
  name: string;
  age: number | null;
}

type UserInfoWithoutNull = {
  name: string;
  age: NonNullable<User['age']>; // 类型为 number，没有 null
};
```

## Omit

`Omit<T, K>`：从类型 `T` 中排除属性 `K` 并创建一个新类型

```typescript
interface User = {
  name: string;
  email: string;
  age: number;
}

type UserBasicInfo = Omit<User, 'age'>; // 类型为 { name: string; email: string; }
```

## Partial

`Partial<T>`：将类型 `T` 中所有属性设为可选

```typescript
interface User {
  name: string;
  email: string;
}

type PartialUser = Partial<User>; // 类型为 { name?: string; email?: string; }
```

## PartialWithDeepNonNullable

`PartialWithDeepNonNullable<T>`：将类型 `T` 中所有嵌套的属性设为可选但非空

```typescript
interface User {
  name: string;
  contact: {
    email: string | null;
    phone?: string | null;
  };
}

type UserWithRequiredContactEmail = PartialWithDeepNonNullable<User>;
// 类型为 { name?: string; contact: { email: string; phone?: string | null | undefined; } | undefined; }
```

## Pick

`Pick<T, K>`：提取类型 `T` 中指定属性 `K` 形成新的类型

```typescript
interface User {
  name: string;
  email: string;
  age: number;
}

type UserBasicInfo = Pick<User, 'name' | 'email'>; // 类型为 { name: string; email: string; }
```

## PickByValueType

`PickByValueType<T, U>`：从类型 `T` 中选出值类型为 `U` 的属性名 并创建一个 new 类型

```typescript
interface User {
  name: string;
  age: number;
  email: string;
  verified: boolean;
}

type StringProps = PickByValueType<User, string>; // 类型为 "name" | "email"
```

## Record

`Record<K, T>`：创建一个从类型 `K` 中的属性名到类型 `T` 的映射类型

```typescript
type Person = 'Alice' | 'Bob' | 'Charlie';
type AgeMap = Record<Person, number>; // 类型为 { Alice: number; Bob: number; Charlie: number; }
```

## RecordValue

`RecordValue<K, V>`：创建一个从类型 `K` 中的属性名到类型 `V` 的映射类型

```typescript
type Person = 'Alice' | 'Bob' | 'Charlie';
type AgeMap = RecordValue<Person, number>; // 类型为 { Alice: number; Bob: number; Charlie: number; }
```

## RequireAtLeastOne

`RequireAtLeastOne<T>`：确保类型 `T` 中至少有一个属性

```typescript
interface User {
  name?: string;
  email?: string;
}

type UserWithRequiredNameOrEmail = RequireAtLeastOne<User>; // 类型为 { name: string; } | { email:  string; }
```

## ReturnType

`ReturnType<T>`：获取函数 `T` 的返回值类型

```typescript
function greet(name: string) {
  return `Hello, ${name}!`;
}

type GreetReturn = ReturnType<typeof greet>; // 类型为 string
```

## ThisParameterType

`ThisParameterType<T>`：获取函数 `T` 中的 `this` 参数类型

```typescript
type ThisType = { name: string };
function bindName(this: ThisType) {
  return this.name;
}

type BoundName = ThisParameterType<typeof bindName>; // 类型为 { name: string }
```

## Tuple

`Tuple<T>`：将类型 `T[]` 可转换为元组类型

```typescript
type Pair = [number, string];
type FirstOfPair = Tuple<number>; // 类型为 [number, number]
```

## UnionToIntersection

`UnionToIntersection<T>`：将并集类型转换为交集类型

```typescript
type Intersection<T extends unknown[]> = UnionToIntersection<T[number]>;

type Example = Interception<[1, 2, 3]>;
// 类型为 1 & 2 & 3
```

## Uncapitalize

`Uncapitalize<T>`：将字符串类型 `T` 的第一个字符转换为小写

```typescript
type Title = 'ALICE IN WONDERLAND';
type UncapitalizedTitle = Uncapitalize<T>; // 类型为 'aLICE IN WONDERLAND'
```

## Merge

`Merge<MergeType>`：合并两个或更多类型

```typescript
interface Person = {
  name: string;
}

interface User = {
  email: string;
}

type PersonAndUser = Merge<Person, User>; // 类型为 { name: string; email: string; }
```

这些工具类型在不同的情况下可以帮助我们更方便地创建和处理 TypeScript 类型。详细的使用方法可以参考 TypeScript 官方文档中有关工具类型的章节。
