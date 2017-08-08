((() => {

  var Vuex = window.Vuex

  const Store = new Vuex.Store({
    state: {
      likes: 0,
      disLikes: 0,
    },

    mutations: {

      addToLikeCount(state, like) {
        state.likes += like
      },

      addToDislikeCount(state, disLike) {
        state.disLikes += disLike
      },
    },

    actions: {

      updateLikeCount(context, like) {
        context.commit("addToLikeCount", like)
      },

      updateDisLikeCount(context, dislike) {
        context.commit("addToDislikeCount", dislike)
      }

    },
  })
  window.store = Store
}))()