import { defineComponent } from 'vue';
import LiteralType from './LiteralType';

export default defineComponent({
  name: 'Test',
  setup() {
    return () => <LiteralType name={'primary'} />;
  },
});
