import { defineComponent, toRefs } from 'vue';

import { emitType, prop } from '..';

type Button = 'cancel' | 'ok' | 0 | true;

export default defineComponent({
  name: 'VueType',
  props: {
    string: prop.string.def('vue'),
    strNum: prop.stringNumber.def(7).valid((value) => value === 7),
    object: prop.object<{ name: 'vue' }>(),
    array: prop.array<number>().def([]),
    fun: prop.function<() => void>(),
    literal: prop.literal<Button>().isRequired,
  },
  emits: {
    click: emitType<() => void>(),
  },
  setup(props) {
    const { length } = props.array;
    console.log(length);
    const { literal } = toRefs(props);
    return () => <button>{literal.value}</button>;
  },
});
