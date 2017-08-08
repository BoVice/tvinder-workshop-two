((() => {
  const html = `
    <div>
      <app-header :likes="likes"></app-header>
      <movies :movie="movie"></movies>
      <actions @handleLikes="handleLikes" @handleSkip="handleSkip"
                @handleDisLikes="handleDisLikes"
                @toggleShowLists="toggleShowLists">
      </actions>
      <lists :showLists="showLists" @closeModal="toggleShowLists"></lists>
    </div>
  `

  Vue.component("tvinder-app", {
    template: html,
    data(){
      return {
        imageIndex: 0,
        movieData: window.movieDataJson.posters,
        showLists: false,
      }
    },

    computed: {
      movie() {
        const self = this
        return self.movieData[self.imageIndex]
      },

      likes() {
        const self = this

        return self.$store.state.likes
      },

      disLikes() {
        const self = this

        return self.$store.state.disLikes
      }
    },

    methods: {
      handleLikes(vote) {
        const self = this
        self.$store.dispatch("updateLikeCount", vote)
        self.$store.dispatch("updateLikedMovies", self.movie)
        self.incrementImage()
      },

      handleDisLikes(vote) {
        const self = this
        self.$store.dispatch("updateDisLikeCount", vote)
        self.$store.dispatch("updateDisLikedMovies", self.movie)
        self.incrementImage()
      },

      handleSkip() {
        const self = this
        self.incrementImage()
      },

      incrementImage() {
        const self = this

        self.imageIndex += 1

        if(self.imageIndex > (self.movieData.length-1)) {
          self.imageIndex = 0
        }
      },

      toggleShowLists() {
        const self = this

        self.showLists = !self.showLists
      }
    }
  })
}))()
