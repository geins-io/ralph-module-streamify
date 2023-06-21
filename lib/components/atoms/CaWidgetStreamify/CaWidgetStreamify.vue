<template>
    <div class="ca-widget-streamify">
        <streamify-liveshopping 
        :id="configuration.id" 
        :orientation="configuration.orientation" 
        :button-text="configuration.buttonText"
        >
    </streamify-liveshopping>
</div>
</template>
  <script>
  /* 
    Streamify 
  */
  import MixAddToCart from 'MixAddToCart';
  export default {
    name: 'CaWidgetStreamify',
    mixins: [MixAddToCart],
    head() {
      return {
        script: [{hid: 'streamify',  src: 'https://cdn.streamify.io/liveshopping.min.js'}]
      }
    },
    props: {
      configuration: {
        type: Object,
        required: true
      }
    },
    data: () => ({
        scriptLoaded: false
    }),
    computed: {},
    watch: {},
    mounted() {},
    methods: {
        initializeStreamify(){
          console.log('vidar')
        /* eslint-disable */
        const player = document.querySelector(`#${this.configuration.id}`);
        player.addEventListener('cart.add',({ detail: [productData, callback] }) => {
            if (productData) {
            const skuId = Number(productData.parentId)
            const quantity = 1
            this.addToCart(skuId, quantity)
            }
            callback({
            success: true
            });
        });
        }
    }
  };
  </script>
  <style lang="scss">
  </style>