import { mount } from '@vue/test-utils';
import Card from './Card.vue';

describe('Card', () => {
  it('renders card component with loaded class when isLoaded is true', async () => {
    const data = {
      imgSrc: 'image.jpg',
      text: 'Sample text',
    };

    const wrapper = mount(Card, {
      propsData: { data },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.classes()).toContain('card');
    expect(wrapper.classes()).toContain('loaded');
  });
});