((() => {
  const html = `
    <div>
      <app-header></app-header>
      <movies :image_url="image_url"></movies>
    </div>
  `

  Vue.component("tvinder-app", {
    template: html,
    data(){
      return {
        image_url: "https://goo.gl/Puw6Ar"
      }
    }
  })
}))()
