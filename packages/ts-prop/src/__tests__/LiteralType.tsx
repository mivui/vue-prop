import { defineComponent, toRefs } from 'vue';
import prop from '../index';

type Button = 'primary' | 'info';
export default defineComponent({
  name: 'LiteralType',
  props: {
    name: prop.requiredLiteralType<Button>(
      prop.string.def('primary').isRequired,
    ),
  },
  setup(props) {
    const { name } = toRefs(props);
    console.log(name.value);
    return () => <button style="color:red">{name.value}</button>;
  },
});
