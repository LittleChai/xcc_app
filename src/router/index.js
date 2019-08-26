import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login.vue'
import index from '../pages/index.vue'
import page1 from '../components/page1.vue'
import page2 from '../components/page2.vue'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        index: 0
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        index: 1
      },
      children: [
        {
          path: '/index/page1',
          name: 'page1',
          component: page1,
          meta: {
            index: 11
          },
        },
        {
          path: '/index/page2',
          name: 'page2',
          component: page2,
          meta: {
            index: 12
          },
        }
      ]
    }
  ]
})
