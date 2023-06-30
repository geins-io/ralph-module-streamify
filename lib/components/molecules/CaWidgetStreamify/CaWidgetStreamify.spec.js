import { shallowMount } from '@vue/test-utils';
import CaWidgetStreamify from './CaWidgetStreamify.vue';

describe('CaWidgetStreamify.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetStreamify);
    expect(component.contains('.ca-widget-streamify')).toBe(true);
  });
});
