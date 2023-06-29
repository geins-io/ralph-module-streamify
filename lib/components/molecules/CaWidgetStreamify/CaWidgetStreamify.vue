<template>
  <div class="ca-widget-streamify" ref="swidget" v-if="streamId">
    <streamify-liveshopping
      v-if="streamId"
      :id="streamId"
      ref="streamifyPlayer"
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
    >
    </streamify-liveshopping>
  </div>
</template>
<script>
/* 
    Streamify Live Shopping Widget 
*/
// import dependencies to use the add to cart event
import MixAddToCart from 'MixAddToCart';

export default {
  name: 'CaWidgetStreamify',
  mixins: [MixAddToCart],
  props: {
    // Configuration object to the widget to set properties
    configuration: {
      type: Object,
      required: false
    },
    // Id of stream
    id: {
      type: String
    },
    // Landscape/portrait, default: portrait)
    orientation: {
      type: String,
      default: 'landscape'
    },
    // Show Playbutton
    playButton: {
      type: Boolean,
      default: false
    },
    // Opens minified player if broadcast is live
    autoStart: {
      type: Boolean,
      default: false
    },
    // The player is persited as a mini-player on the site as the user navigates between pages.
    persistent: {
      type: Boolean,
      default: true
    },
    // Enable Google Analytics integration
    googleAnalytics: {
      type: Boolean,
      default: true
    },
    // Defaults to broadcast title if not set or used. Add text here to customize the button text in the banner.
    buttonText: {
      type: String
    },
    // Hide the play button in the banner
    hideButton: {
      type: Boolean,
      default: false
    },
    // Hide the calendar in the banner
    hideCalendar: {
      type: Boolean,
      default: false
    },
    // Hide the title in the banner
    hideTitle: {
      type: Boolean,
      default: false
    },
    // Display a info button if the broadcast has a description.
    infoButton: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    streamId: ''
  }),
  computed: {
    // get the player configuration from props or from the configuration object
    playerConfiguration() {
      return {
        id: this.configuration?.id ?? this.id,
        orientation: this.configuration.orientation ?? this.orientation,
        playButton: this.configuration['play-button'] ?? this.playButton,
        autoStart: this.configuration['autostart-if-live'] ?? this.autoStart,
        persistent: this.configuration.persistent ?? this.persistent,
        ga: this.configuration['autostart-if-live'] ?? this.googleAnalytics,
        buttonText: this.configuration['button-text'] ?? this.buttonText,
        hideButton: this.configuration['hide-button'] ?? this.hideButton,
        hideCalendar: this.configuration['hide-calendar'] ?? this.hideCalendar,
        hideTitle: this.configuration['hide-title'] ?? this.hideTitle,
        infoButton: this.configuration['info-button'] ?? this.infoButton
      };
    }
  },
  watch: {},
  async mounted() {
    // check if we have a streamId
    if (this.playerConfiguration.id) {
      // we have a streamId, use it
      this.streamId = this.playerConfiguration.id;
    } else {
      // we don't have a streamId, get the nearest future stream form streamify API
      this.streamId = await this.$streamify.getFutureStream();
    }
    // if we have a streamId, initialize the widget with event listeners
    if (this.streamId) {
      this.$nextTick(this.initializeStreamify);
    } else {
      // we don't have a streamId, show error
      this.$streamify.log('No Stream Id Found');
    }
    this.$emit('ready');
  },
  methods: {
    initializeStreamify() {
      // get the player from DOM using streamId
      const player = document.querySelector(`#${this.streamId}`);
      // add event listeners
      player.addEventListener(
        'cart.add',
        ({ detail: [productData, callback] }) => {
          console.log('cart.add', productData);
          if (productData) {
            const skuId = Number(productData.parentId);
            const quantity = 1;
            this.addToCart(skuId, quantity);
          }
          const cb = {
            success: true
          };
          callback(cb);
        }
      );
    }
  },
  head() {
    return {
      script: [
        {
          hid: 'streamify-liveshopping',
          src: 'https://cdn.streamify.io/liveshopping.min.js'
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.ca-widget-streamify {
  $block: &;
}
</style>
