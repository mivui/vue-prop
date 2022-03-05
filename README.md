# ts-prop

> Prop type definition of Vue3. only recommended for vue typescript.

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

export const drawerProps = {
  visible: prop.boolean.def(false).isRequired,
  title: prop.string
};

export const drawerEmits = {
  open: prop.emit<(value: boolean) => void>(),
};

export default defineComponent({
  name: 'Drawer',
  props: drawerProps,
  emits: drawerEmits,
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
  name: prop.stringNumber.def('123').isRequired,
  //{type:[String,Number],required:true,default:123}
  test: prop.string,
  //{type:String}
  titles: prop.array<Person>().valid((value) => value.length > 0),
  //{type:Array as PropType<Array<Person>>,validator:(value) => value.length > 0}
  content: prop.vNode,
  //{type:[Object,String] as PropType<VNode|null|string>}
  style: prop.css.def({ height: '20px' }),
  //{type: Object as PropType<StyleValue>,default:{ height:'20px' }}
};
```

#### api

| property | default type |                                 example                                 |
|:---------:|:---------:|:-----------------------------------------------------------------------:|
| string | string|                               prop.string                               |
| number |number|                            prop.number.def(7)                           |
| stringNumber | string &Iota; number|                            prop.stringNumber                            |
| boolean | boolean |                               prop.boolean                              |
| stringBool | boolean &Iota; string |                             prop.stringBool                             |
| numberBool | boolean &Iota; number |                             prop.numberBool                             |
| symbol | symbol |                               prop.symbol                               |
| date | date |                                prop.date                                |
| vNode | vue.VNode &Iota; string &Iota; null |                                prop.vNode                               |
| css | vue.StyleValue |                                 prop.css                                |
| object | Record<string, unknown> |                prop.object<{name?:string,age?:number}>()                |
| array | Record<string, unknown>[] |                       prop.array<{name:string}>()                       |
| func | ()=>void |     prop.func<(value?:number)=>boolean>()  _recommended to use emit_    |

  #### Template Literal Types Api
  
   ###### literalType
   ```tsx
   import { defineComponent, toRefs } from 'vue';
   import prop from 'ts-prop';
   
   type Button = 'text' | 'number';
   export default defineComponent({
     name: 'LiteralType',
     props: {
       type: prop.literalType<Button>(
         prop.string.def('text'),
       ),
     },
     setup(props) {
       const { type } = toRefs(props);
       return () => <button type={type.value}>TEST</button>;
     },
   });
   ```
   ###### requiredLiteralType
   ```tsx
   import { defineComponent, toRefs } from 'vue';
   import prop from 'ts-prop';
   
   type Button = 'text' | 'number';
   export default defineComponent({
     name: 'LiteralType',
     props: {
       type: prop.requiredLiteralType<Button>(
         prop.string.def('text').isRequired,
       ),
     },
     setup(props) {
       const { type } = toRefs(props);
       return () => <button type={type.value}>TEST</button>;
     },
   });
   ```

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
  name: prop.stringObject<{ name?: string; lowerCase?: boolean }>(),
  type: prop.stringBoolean.isRequired,
};
```
