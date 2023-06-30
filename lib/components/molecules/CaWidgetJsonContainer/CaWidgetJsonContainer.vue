<template>
  <component :is="widgetType" v-if="widgetType" :configuration="widgetData" />
</template>
<script>
/* 
  (Description of component) 
*/
export default {
  name: 'CaWidgetJsonContainer',
  components: {},
  mixins: [],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    // Get the widget type from the configuration object
    widgetType() {
      if (this.confObject) {
        return this.confObject.renderWidget;
      }
      return '';
    },
    widgetData() {
      if (this.widgetType === 'CaWidgetStreamify') {
        return this.confObject.data;
      }
      return {};
    },
    confObject() {
      if (this.configuration?.json) {
        return JSON.parse(this.configuration?.json);
      }
      return {};
    }
  },
  watch: {},
  mounted() {
    console.log('CaWidgetJson mounted from module');
  },
  methods: {}
};
</script>
