import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tweets: [],
    fetching: false,
    error: null
  },
  actions: {
    fetchTweets (context, payload) {
      context.commit('SET_LOADING', true)
      context.commit('SET_ERROR', null)

      axios.post(`http://localhost:3000/search/${payload}`)
        .then(res => {
          const tweets = res.data.tweets
          context.commit('FETCHING_SUCCESS', tweets)
          context.commit('SET_LOADING', false)
        })
        .catch(err => {
          context.commit('SET_LOADING', false)
          context.commit('SET_ERROR', err)
        })
    },
    clearTweets (context) {
      context.commit('CLEAR_TWEETS')
    }
  },
  mutations: {
    FETCHING_SUCCESS (state, payload) {
      state.tweets = payload
    },
    SET_LOADING (state, payload) {
      state.fetching = payload
    },
    SET_ERROR (state, payload) {
      state.error = payload
    },
    CLEAR_TWEETS (state) {
      state.tweets = []
    }
  },
  getters: {
    getTweets (state) {
      return state.tweets
    },
    getError (state) {
      return state.error
    },
    isFetching (state) {
      return state.fetching
    }
  }
})
