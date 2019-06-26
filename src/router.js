import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const r = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      redirect: '/welcome',
      component: Home,
      children: [{
          path: '/welcome',
          name: 'welcome',
          component: () => import('./views/Welcome.vue')
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('./views/Users.vue')
        }, {
          path: '/goods',
          name: 'goods',
          component: () => import('./views/goods/Goods.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
})
r.beforeEach((to, from, next) => {
  if (to.path == '/login') return next()
  if (sessionStorage.getItem('token')) {
    return next()
  } else {
    return next('/login')
  }
})

export default r