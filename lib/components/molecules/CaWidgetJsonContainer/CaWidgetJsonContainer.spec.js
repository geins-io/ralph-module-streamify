import { shallowMount } from '@vue/test-utils';
import CaWidgetJsonContainer from './CaWidgetJsonContainer.vue';

describe('CaWidgetJsonContainer.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetJsonContainer);
    expect(component.contains('.ca-widget-json-container')).toBe(true);
  });
});
