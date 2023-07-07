<template>
  <div class="geins-widget-streamify">
    <GeinsStreamifyPlayer
      :id="playerConfiguration.id"      
      :orientation="playerConfiguration.orientation"
      :play-button="playerConfiguration.playButton"
      :autostart-if-live="playerConfiguration.autoStart"
      :persistent="playerConfiguration.persistent"
      :ga="playerConfiguration.googleAnalytics"
      :button-text="playerConfiguration.buttonText"
      :hide-button="playerConfiguration.hideButton"
      :hide-calendar="playerConfiguration.hideCalendar"
      :hide-title="playerConfiguration.hideTitle"
      :info-button="playerConfiguration.infoButton"
    ></GeinsStreamifyPlayer>
  </div>
</template>
<script>
/* 
    Streamify Live Shopping Widget for CMS
*/
export default {
  name: 'GeinsWidgetStreamify',
  props: {
    // Configuration object to the widget to set properties
    configuration: {
      type: Object,
      required: false
    },   
  },
  data: () => ({
    streamId: ''
  }),
  computed: {
    // get the player configuration from props or from the configuration object    
    playerConfiguration() {
      return {
        id: this.configuration?.id ?? '',
        orientation: this.configuration.orientation,
        playButton: this.configuration['play-button'],
        autoStart: this.configuration['autostart-if-live'],
        persistent: this.configuration.persistent,
        ga: this.configuration['autostart-if-live'],
        buttonText: this.configuration['button-text'],
        hideButton: this.configuration['hide-button'],
        hideCalendar: this.configuration['hide-calendar'],
        hideTitle: this.configuration['hide-title'],
        infoButton: this.configuration['info-button']
      };
    }
  },
  watch: {},
  async mounted() {
    this.$emit('ready');
  },
  methods: {},
};
</script>
