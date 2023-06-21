import { shallowMount } from '@vue/test-utils';
import CaDisplayVariant from './CaWidgetStreamify.vue';

describe('CaWidgetStreamify.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaDisplayVariant);
    expect(component.contains('.ca-widget-streamify')).toBe(true);
  });
});
