((() => {
  const html = `
    <div>
      <app-header :likes="likes"></app-header>
      <movies :movie="movie"></movies>
      <actions @handleLikes="handleLikes" @handleSkip="handleSkip"></actions>
    </div>
  `

  Vue.component("tvinder-app", {
    template: html,
    data(){
      return {
        likes: 0,
        imageIndex: 0,
        movieData: window.movieDataJson.posters
      }
    },

    computed: {
      movie() {
        const self = this
        return self.movieData[self.imageIndex]
      }
    },

    methods: {
      handleLikes(vote) {
        const self = this
        self.likes += vote
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
      }
    }

  })
}))()
