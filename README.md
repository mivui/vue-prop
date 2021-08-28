# ts-prop

<hr/>
vue3 ts prop utils smaller, faster and easier to expand
<br/>

> example

```vue

<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { prop, defineEmit } from 'ts-prop';

export const buttonProps = {
  icon: prop.stringNumber.default('user').type,
  name: prop.string.required,
};

export const buttonEmits = {
  open: defineEmit<(value: number | string) => void>(),
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
import { prop, defineArray } from 'ts-prop';

const props = {
  name: prop.stringNumber.default('123').required,
  //{type:[String,Number],required:true,default:123}
  test: prop.string.type,
  //{type:String}
  titles: defineArray<{ name: string }>().validate((value) => value.length > 0).type,
  //{type:Array as PropType<Array<unknown>>,validator:{(value) => value.length > 0}}
  content: prop.vNode.type,
  //{type:[Object,String] as PropType<VNode|null|string>}
  style: prop.css.default({ height: '20px' }).type,
  //{type: Object as PropType<StyleValue>,default:{ height:'20px' }}
};
```

> api

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
| array | Record<string, unknown>[] |
| func | ()=>void |

> custom type

| property | default type | required type |
|:---------:|:---------:|:---------:|
| defineObject | null |true |
| defineArray | null |true |
| defineFun | null |true |
| defineEmit | ()=>void | false |
