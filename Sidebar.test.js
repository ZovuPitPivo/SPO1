import { mount } from '@vue/test-utils';
import Sidebar from './Sidebar.vue';

describe('Sidebar', () => {
  it('toggles sidebar expansion when button is clicked', async () => {
    const wrapper = mount(Sidebar);

    expect(wrapper.vm.isExpanded).toBe(false);

    const button = wrapper.find('.playCrossBtn');
    await button.trigger('click');

    expect(wrapper.vm.isExpanded).toBe(true);

    await button.trigger('click');

    expect(wrapper.vm.isExpanded).toBe(false);
  });
});