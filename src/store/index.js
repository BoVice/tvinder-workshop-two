((() => {

  var Vuex = window.Vuex

  const Store = new Vuex.Store({
    state: {
      likes: 0,
      disLikes: 0,
      likedMovies: [],
      disLikedMovies: []
    },

    mutations: {

      addToLikeCount(state, like) {
        state.likes += like
      },

      addToDislikeCount(state, disLike) {
        state.disLikes += disLike
      },

      addToDislikeArray(state, disLikedMovie) {
        state.disLikedMovies.push(disLikedMovie)
      },

      addToLikeArray(state, likedMovie) {
        state.likedMovies.push(likedMovie)
      }
    },

    actions: {

      updateLikeCount(context, like) {
        context.commit("addToLikeCount", like)
      },

      updateDisLikeCount(context, dislike) {
        context.commit("addToDislikeCount", dislike)
      },

      updateDisLikedMovies(context, disLikedMovie) {
        context.commit("addToDislikeArray", disLikedMovie)
      },

      updateLikedMovies(context, likedMovie) {
        context.commit("addToLikeArray", likedMovie)
      }

    },
  })
  window.store = Store
}))()