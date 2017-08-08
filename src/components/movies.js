((() => {
  const html = `
    <div class="movies">
      <div class="movie-poster-container">
        <img class="movie-poster" v-bind:src="image_url">
      </div>
    </div>
  `
  Vue.component("movies", {
    template: html,
    props: {
      image_url: {
        type: String,
        required: true,
      }
    }
  })

}))()
