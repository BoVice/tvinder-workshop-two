((() => {
  const html = `
  <div class="header">
    <div class="header--left">
      <h1>tvinder</h1>
    </div>
    <div class="header--right">
      <h1>Likes</h1>
      <div class="header__data">
        <h1>{{ likes }}</h1>
      </div>
    </div>
    <div class="header--right">
      <h1>Dislikes</h1>
      <div class="header__data">
        <h1>{{ disLikes }}</h1>
      </div>
    </div>
  </div>
  `

  Vue.component("app-header", {
    template: html,

    computed: {
      likes() {
        const self = this

        return self.$store.state.likes
      },

      disLikes() {
        const self = this

        return self.$store.state.disLikes
      }
    }
  })
}))()
