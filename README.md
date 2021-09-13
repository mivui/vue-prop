# ts-prop

> Prop type definition of Vue3. only recommended for typescript.

#### install

```shell
npm install ts-prop

yarn add ts-prop
```

#### example

```vue

<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import prop from 'ts-prop';

export const props = {
  visible: prop.boolean.default(false).required,
  title: prop.string.type
};

export const emits = {
  open: prop.emit<(value: boolean) => void>(),
};

export default defineComponent({
  name: 'Drawer',
  props: props,
  emits: emits,
  setup(props, { emit }) {
    return {}
  },
});
</script>

```

```ts
import prop from 'ts-prop';

interface Person {
  name: string;
  sex?: string;
  age: number;
}

const props = {
  name: prop.stringNumber.default('123').required,
  //{type:[String,Number],required:true,default:123}
  test: prop.string.type,
  //{type:String}
  titles: prop.array<Person>().validator((value) => value.length > 0).type,
  //{type:Array as PropType<Array<Person>>,validator:(value) => value.length > 0}
  content: prop.vNode.type,
  //{type:[Object,String] as PropType<VNode|null|string>}
  style: prop.css.default({ height: '20px' }).type,
  //{type: Object as PropType<StyleValue>,default:{ height:'20px' }}
};
```

#### api

| property | default type |example|
|:---------:|:---------:|:---------:|
| string | string| prop.string.type |
| number |number|prop.number.default(7).type |
| stringNumber | string &Iota; number| prop.stringNumber.type |
| boolean | boolean |prop.boolean.type |
| stringBool | boolean &Iota; string | prop.stringBool.type |
| numberBool | boolean &Iota; number | prop.numberBool.type |
| symbol | symbol |prop.symbol.type |
| date | date |prop.date.type |
| vNode | vue.VNode &Iota; string &Iota; null |prop.vNode.type |
| css | vue.StyleValue |prop.css.type |
| object | Record<string, unknown> |prop.object<{name?:string,age?:number}>().type |
| array | Record<string, unknown>[] |prop.array<{name:string}>().type |
| func | ()=>void | prop.func<(value?:number)=>boolean>()  _recommended to use emit_  |
| emit | ()=>void | prop.func<(value:string)=>void>() |

#### Custom Type
##### _prop.ts_

```ts
import { useProp } from 'ts-prop';

export default class DefineProp {
  static stringObject<T = Record<string, unknown>>() {
    return useProp<string | T>([String, Object]);
  }

  static get stringBoolean() {
    return useProp<string | boolean>([String, Boolean]);
  }
}


```

```ts
import prop from './prop';

const props = {
  name: prop.stringObject<{ name?: string; lowerCase?: boolean }>().type,
  type: prop.stringBoolean.required,
};
```
