import { mount } from '@vue/test-utils';
import { ref } from 'vue';

import VueType from './VueType';

describe('type', () => {
  it('propType', () => {
    const visible = ref(false);
    const number = ref(1);
    const wrapper = mount(() => (
      <VueType
        v-model:visible={visible.value}
        v-model:number={number.value}
        string={'vue'}
        strNum={7}
        object={{ name: 'vue' }}
        fun={() => {}}
        literal={'ok'}
      />
    ));
    wrapper.find('button').trigger('click');
    expect(visible.value).eq(true);
    expect(number.value).eq(666);
  });
});
