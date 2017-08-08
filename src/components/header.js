((() => {
  const html = `
  <div class="header">
    <div class="header--left">
      <h1>tvinder</h1>
    </div>
    <div class="header--right">
      <h1>votes</h1>
      <div class="header__data">
        <h1>{{ likes }}</h1>
      </div>
    </div>
  </div>
  `

  Vue.component("app-header", {
    template: html,
    props: {
      likes: {
        type: String,
        required: true,
      }
    }
  })
}))()
