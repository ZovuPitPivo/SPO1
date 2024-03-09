import { mount } from '@vue/test-utils';
import GameMenu from './GameMenu.vue';

describe('GameMenu', () => {
  it('emits correct event when button is clicked', async () => {
    const wrapper = mount(GameMenu);

    // Simulate clicking each button and check emitted event
    for (let button of wrapper.vm.buttons) {
      const buttonElement = wrapper.find(`.menu-button i.fi.${button.icon}`);
      await buttonElement.trigger('click');
      expect(wrapper.emitted()[button.func]).toBeTruthy();
    }
  });
});