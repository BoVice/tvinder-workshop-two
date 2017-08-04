((() => {
  const html = `
    <div>
      <app-header :likes="likes"></app-header>
      <movies :image_url="image_url"></movies>
      <actions @handleLikes="handleLikes" @handleSkip="handleSkip"></actions>
    </div>
  `

  Vue.component("tvinder-app", {
    template: html,
    data(){
      return {
        image_url: "https://goo.gl/Puw6Ar",
        likes: 0,
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
        // TODO
      }
    }

  })
}))()
