import { defineComponent, toRefs } from 'vue';
import prop from '../index';

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
