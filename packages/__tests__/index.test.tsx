import { mount } from '@vue/test-utils';
import VueType from './VueType';

describe('type', () => {
  it('propType', () => {
    const onClick = () => {};
    const wrapper = mount(() => (
      <VueType
        string={'vue'}
        strNum={7}
        object={{ name: 'vue' }}
        fun={() => {}}
        literal={'ok'}
        onClick={onClick}
      />
    ));

    expect(wrapper.props()).toBeDefined();
  });
});
