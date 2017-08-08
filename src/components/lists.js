((() => {
  const html = `

  `
  Vue.component("lists", {
    template: html,

    computed: {

      likedMovies() {
        const self = this

        return self.$store.state.likedMovies
      },

      disLikedMovies() {
        const self = this

        return self.$store.state.disLikedMovies
      }
    },
  })

}))()
