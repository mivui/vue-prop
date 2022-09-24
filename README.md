# vue-prop

> Prop type define of Vue3.

[![npm version](https://img.shields.io/npm/v/vue-prop.svg)](https://www.npmjs.com/package/vue-prop)
[![Alt](https://img.shields.io/npm/dm/vue-prop)](https://npmcharts.com/compare/vue-prop?minimal=true)
![Alt](https://img.shields.io/github/license/uinio/vue-prop)

#### install

```shell
npm install vue-prop
```

#### example

```vue

<script setup lang="ts">
import { prop, emitType } from "vue-prop";

export const drawerProps = {
  visible: prop.boolean.def(false).isRequired,
  title: prop.string
};

export const drawerEmits = {
  open: emitType<(value: boolean) => void>()
};

const props = defineProps(drawerProps);

const emit = defineEmits(drawerEmits);
</script>
```

```vue

<script lang="ts">
import { defineComponent } from 'vue';
import { prop, emitType } from 'vue-prop';

export const drawerProps = {
  visible: prop.boolean.def(false).isRequired,
  title: prop.string
};

export const drawerEmits = {
  open: emitType<(value: boolean) => void>(),
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
|   literal    |              undefined              |    prop.literal<'ok'&Iota;'cancel'>()     |

#### Template Literal Type

```vue

<script setup lang="ts">
import { prop } from "vue-prop";

type Button = "ok" | "cancel" | 0 | true;

const props = defineProps({ button: prop.literal<Button>() });

</script>
```

#### Emit Type

```vue

<script setup lang="ts">
import { emitType } from "vue-prop";

export const drawerEmits = {
  open: emitType<(value: boolean) => void>()
};

const emit = defineEmits(drawerEmits);
</script>
```

#### Custom Type

```ts
import { propType } from "vue-prop";

const props = {
  title: propType<string | boolean>([String, Boolean]),
  user: propType<string | { name?: string, age?: number }>([String, Object]),
  color: propType<string | number, "red" | "blue" | 1 | 2>([String, Number])
};
```
