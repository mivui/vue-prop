import { defineComponent, toRefs } from 'vue';
import { literalType } from '../prop';

type Button = 'ok' | 'cancel' | 0 | true;

export default defineComponent({
  name: 'LiteralType',
  props: {
    name: literalType<Button>().def('cancel').isRequired,
  },
  setup(props) {
    const { name } = toRefs(props);
    return () => <button>{name.value}</button>;
  },
});
