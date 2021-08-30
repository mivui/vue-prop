# ts-prop

>Prop type definition of Vue3. only recommended for typescript.

<br/>

* install
```shell
npm install ts-prop

yarn add ts-prop
```
* example

```vue

<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import prop from 'ts-prop';

export const buttonProps = {
  icon: prop.stringNumber.default('user').type,
  name: prop.string.required,
};

export const buttonEmits = {
  open: prop.emit<(value: number | string) => void>(),
};

export default defineComponent({
  name: 'VButton',
  props: buttonProps,
  emits: buttonEmits,
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
  //{type:Array as PropType<Array<Person>>,validator:{(value) => value.length > 0}}
  content: prop.vNode.type,
  //{type:[Object,String] as PropType<VNode|null|string>}
  style: prop.css.default({ height: '20px' }).type,
  //{type: Object as PropType<StyleValue>,default:{ height:'20px' }}
};
```

* api

| property | default type | 
|:---------:|:---------:|
| string | string|
| number |number|
| stringNumber | string  &Iota; number|
| boolean | boolean |
| symbol | symbol |
| date | date |
| vNode | vue.VNode &Iota; string &Iota; null |
| css | vue.StyleValue |
| object | Record<string, unknown> |
| array | Record<string, unknown>[] example: prop.array<{name?:string}>.type|
| func | ()=>void |
| emit | ()=>void |

