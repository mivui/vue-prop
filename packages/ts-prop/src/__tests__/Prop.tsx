import { defineComponent, toRefs } from 'vue';
import prop from '../index';

export default defineComponent({
  name: 'Prop',
  props: { name: prop.string },
  setup(props) {
    const { name } = toRefs(props);
    return <div>{name}</div>;
  },
});
