((() => {
  const html = `
    <div class="movies">
      <div class="movie-poster-container">
        <img class="movie-poster" v-bind:src="extractImageUrl" v-bind:key="extractImageUrl">
        <div class="movie-name">{{ extractImageName }}</div>
      </div>
    </div>
  `
  Vue.component("movies", {
    template: html,
    props: {
      movie: {
        type: Object,
        required: true,
      }
    },

    computed: {
      extractImageUrl() {
        const self = this
        return self.movie.url
      },
      extractImageName() {
        const self = this
        return self.movie.name
      }
    },
  })

}))()
