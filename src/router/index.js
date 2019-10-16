import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login.vue'
import index from '../pages/index.vue'
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
      path: '/test',
      name: 'test',
      component: resolve=>(require(["../components/test"],resolve)),
      meta: {
        index: -1
      }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve=>(require(["../pages/login"],resolve)),
      meta: {
        index: 0
      }
    },
    {
      path: '/index',
      name: 'index',
      component: resolve=>(require(["../pages/index"],resolve)),
      meta: {
        index: 1
      },
      children: [
        {
          path: '/index/article',
          name: 'article',
          component: resolve=>(require(["../components/xcc_article"],resolve)),
          meta: {
            index: 11
          },
        },
        {
          path: '/index/page2',
          name: 'page2',
          component: resolve=>(require(["../components/page2"],resolve)),
          meta: {
            index: 12
          },
        },
        {
          path: '/index/editor',
          name: 'editor',
          component: resolve=>(require(["../components/editor"],resolve)),
          meta: {
            index: 13
          },
        },
        {
          path: '/index/menu',
          name: 'menu',
          component: resolve=>(require(["../components/menu"],resolve)),
          meta: {
            index: 13
          },
        },
        {
          path: '/index/music',
          name: 'music',
          component: resolve=>(require(["../components/music"],resolve)),
          meta: {
            index: 13
          },
        }
      ]
    }
  ]
})
