# vue-prop

> Prop type definition of Vue3.

#### install

```shell
npm install vue-prop

yarn add vue-prop
```

#### example

```vue

<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { prop } from 'vue-prop';

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
import { prop } from 'vue-prop';

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

| property |                 default type                  |                                 example                              |
|:---------:|:---------------------------------------------:|:--------------------------------------------------------------------:|
| string |                    string                     |                               prop.string                            |
| number |                    number                     |                            prop.number.def(7)                        |
| stringNumber |             string &Iota; number              |                            prop.stringNumber                         |
| boolean |                    boolean                    |                               prop.boolean                           |
| stringBool |            string &Iota; boolean             |                             prop.stringBool                          |
| numberBool |             number &Iota; boolean             |                             prop.numberBool                          |
| symbol |                    symbol                     |                               prop.symbol                            |
| date |                     date                      |                                prop.date                             |
| vNode |      vue.VNode &Iota; string &Iota; null      |                                prop.vNode                            |
| css |                vue.StyleValue                 |                                 prop.css                             |
| object |            Record<string, unknown>            |                prop.object<{name?:string,age?:number}>()             |
| array |           Record<string, unknown>[]           |                       prop.array<{name:string}>()                    |
| func |                   ()=>void                    |     prop.func<(value?:number)=>boolean>()  _recommended to use
emit_ |
| literalType |     string &Iota; boolean &Iota; number       | Template Literal Types Api   |

#### Template Literal Types Api

```tsx
import { defineComponent, toRefs } from 'vue';
import { prop } from 'vue-prop';

type Button = 'ok' | 'cancel' | 0 | true;
export default defineComponent({
  name: 'LiteralType',
  props: {
    name: prop.literalType<Button>().def('ok'),
  },
  setup(props) {
    const { name } = toRefs(props);
    return () => <button>{name.value}</button>;
  },
});
```

#### Custom Type

##### _prop.ts_

```ts
import { useProp } from 'vue-prop';

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
