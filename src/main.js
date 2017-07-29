((() => {
  const App = window.App
  const Vue = window.Vue

  Vue.component("tvinder-app", App)

  new Vue({
    el: '#app',
    data: {
      hello: "world"
    }
  })
}))()
