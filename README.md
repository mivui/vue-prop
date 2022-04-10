# vue-prop

> Prop type definition of Vue3.

[![npm version](https://badge.fury.io/js/vue-prop.svg)](https://badge.fury.io/js/vue-prop)
![Alt](https://img.shields.io/npm/dm/vue-prop)
![Alt](https://img.shields.io/github/license/uinio/vue-prop)

#### install

```shell
npm install vue-prop
```

#### example

```vue

<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { prop, defineEmit } from 'vue-prop';
//or
// import prop from 'vue-prop';

export const drawerProps = {
  visible: prop.boolean.def(false).isRequired,
  title: prop.string
};

export const drawerEmits = {
  open: defineEmit<(value: boolean) => void>(),
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

|   property   |            default type             |                  example                  |
|:------------:|:-----------------------------------:|:-----------------------------------------:|
|    string    |               string                |                prop.string                |
|    number    |               number                |            prop.number.def(7)             |
| stringNumber |        string &Iota; number         |             prop.stringNumber             |
|   boolean    |               boolean               |               prop.boolean                |
|    symbol    |               symbol                |                prop.symbol                |
|     date     |                date                 |                 prop.date                 |
|    vNode     | vue.VNode &Iota; string &Iota; null |                prop.vNode                 |
|     css      |           vue.StyleValue            |                 prop.css                  |
|    object    |         Record<string, any>         | prop.object<{name?:string,age?:number}>() |
|    array     |        Record<string, any>[]        |        prop.array<{name:string}>()        |
|   function   |              ()=>void               | prop.function<(value?:number)=>boolean>() |

#### Template Literal Type

```tsx
import { defineComponent, toRefs } from 'vue';
import { literalType } from 'vue-prop';

type Button = 'ok' | 'cancel' | 0 | true;
export default defineComponent({
  name: 'LiteralType',
  props: {
    name: literalType<Button>().def('ok'),
  },
  setup(props) {
    const { name } = toRefs(props);
    return () => <button>{name.value}</button>;
  },
});
```

#### Emit Type

```ts
import { defineComponent } from 'vue';
import { defineEmit } from 'vue-prop';

type Button = 'ok' | 'cancel' | 0 | true;
export default defineComponent({
  name: 'EmitType',
  emits: { click: defineEmit<(value: boolean) => void>() },
  setup(props, { emit }) {
    emit('click', true);
  }
});
```

#### Custom Type

```ts
import { defineProp } from './prop';

const props = {
  title: defineProp<string | boolean>([String, Boolean]),
  user: defineProp<string | { name?: string, age?: number }>([String, Object]),
};
```
