((() => {
  const html = `
  <div class="actions">
    <div class="controls">
      <div class="icon-button" v-on:click="decrement()">
          <svg class="icon icon-cross"><use xlink:href="#icon-cross"></use></svg>
      </div>
        <a id="skip" href="#" v-on:click.prevent="skip" class="icon-button">Skip</a>
      <div class="icon-button" v-on:click="increment()">
        <svg class="icon icon-heart"><use xlink:href="#icon-heart"></use></svg>
      </div>
    </div>
  </div>
  `

  Vue.component("actions", {
    template: html,

    methods: {
      skip() {
        const self = this
        self.$emit('handleSkip')
      },

      increment() {
        const self = this
        self.$emit('handleLikes', 1)
      },

      decrement() {
        const self = this
        self.$emit('handleLikes', -1)
      }
    }
  })
}))()
