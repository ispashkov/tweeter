import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../components/IndexPage.vue'
import SearchPage from '../components/SearchPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage
    },
    {
      path: '/search/:query',
      name: 'search',
      component: SearchPage
    }
  ]
})
