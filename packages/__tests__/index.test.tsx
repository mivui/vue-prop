import { mount } from '@vue/test-utils';
import { ref } from 'vue';

import VueType from './VueType';

describe('type', () => {
  it('propType', () => {
    const visible = ref(false);
    const wrapper = mount(() => (
      <VueType
        v-model:visible={visible.value}
        string={'vue'}
        strNum={7}
        object={{ name: 'vue' }}
        fun={() => {}}
        literal={'ok'}
      />
    ));
    wrapper.find('button').trigger('click');
    expect(visible.value).eq(true);
  });
});
