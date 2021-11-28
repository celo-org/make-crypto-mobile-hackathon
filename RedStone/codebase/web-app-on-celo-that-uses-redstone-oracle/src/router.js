import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/commodities',
    },
    {
      path: '/commodities',
      name: 'commodities',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Commodities.vue'),
    },
    {
      path: '/commodity/:symbol',
      name: 'commodity',
      component: () => import(/* webpackChunkName: "about" */ './views/Commodity.vue'),
    },
    {
      path: '/token-sponsor/:symbol',
      name: 'token-sponsor',
      component: () => import(/* webpackChunkName: "about" */ './views/TokenSponsor.vue'),
    },
  ]
})
