((() => {
  const html = `
  <div class="actions">
    <div class="controls">
      <a id="skip" href="#" v-on:click.prevent="myFirstMethod" class="icon-button">Click Me!</a>  
    </div>
  </div>
  `

  Vue.component("actions", {
    template: html,

    methods: {
      myFirstMethod() {
        alert("I have been clicked!")
      }
    }
  })
}))()
