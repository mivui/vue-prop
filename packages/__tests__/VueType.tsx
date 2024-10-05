import { defineComponent, toRefs } from 'vue';

import { emitType, prop } from '..';

type Button = 'cancel' | 'ok' | 0 | true;

export default defineComponent({
  name: 'VueType',
  props: {
    visible: prop.boolean,
    string: prop.string.def('vue'),
    strNum: prop.stringNumber.def(7).valid((value) => value === 7),
    object: prop.object<{ name: 'vue' }>(),
    array: prop.array<number>().def([]),
    fun: prop.function<() => void>(),
    literal: prop.literal<Button>().isRequired,
  },
  emits: {
    'update:visible': emitType<(value: boolean) => void>(),
    click: emitType<() => void>(),
  },
  setup(props, { emit }) {
    const { literal } = toRefs(props);
    const onClick = () => {
      emit('update:visible', true);
      emit('click');
    };
    return () => <button onClick={onClick}>{literal.value}</button>;
  },
});
