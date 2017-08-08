((() => {
  const html = `
    <div class="modal" v-show="showLists">
      <div class="modal-content">
        <span class="close" v-on:click="closeModal()">&times;</span>
        <p>Likes</p>
          <div v-for="movie in likedMovies" id="likes">
            {{ movie.name }}
          </div>
        <p>Dislikes</p>
          <div v-for="movie in disLikedMovies" id="dislikes">
            {{ movie.name }}
          </div>
      </div>
    </div>
  `
  Vue.component("lists", {
    template: html,

    props: {
      showLists: {
        type: Boolean,
        required: true,
      }
    },

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

    methods: {
      closeModal() {
        const self = this

        self.$emit("closeModal")
      }
    }
  })

}))()
