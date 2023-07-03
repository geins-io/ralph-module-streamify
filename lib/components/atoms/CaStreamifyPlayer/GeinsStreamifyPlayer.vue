<template>
  <streamify-liveshopping
    v-if="streamId"
    :id="streamId"
    ref="streamifyPlayer"
    :orientation="orientation"
    :play-button="playButton"
    :autostart-if-live="autoStart"
    :persistent="persistent"
    :ga="googleAnalytics"
    :button-text="buttonText"
    :hide-button="hideButton"
    :hide-calendar="hideCalendar"
    :hide-title="hideTitle"
    :info-button="infoButton"
  >
  </streamify-liveshopping>
</template>
<script>
/* 
  Streamify Live Shopping Player
*/
export default {
  name: 'GeinsStreamifyPlayer',
  mixins: [],
  props: {
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
  computed: {},
  watch: {},
  async mounted() {
    // check if we have a streamId
    if (this.id) {
      // we have a streamId, use it
      this.streamId = this.id;
    } else {
      // we don't have a streamId, get the nearest future stream form streamify API
      this.streamId = await this.$streamify.getFutureStream();
    }
    // if we have a streamId, initialize the widget with event listeners
    if (this.streamId) {
      this.$nextTick(this.initializeStreamify);
    } else {
      // we don't have a streamId, show error
      this.$streamify.log('No Stream Id Found - hide player');
    }
    this.$emit('ready');
  },
  methods: {
    initializeStreamify() {
      // get the player from DOM using streamId
      const player = document.querySelector('streamify-liveshopping');
      if(!player) {
        return;
      }
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
