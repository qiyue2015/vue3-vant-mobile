// https://router.vuejs.org/zh/
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 导入路由组件
import main from '@/views/index.vue'
// import mock from '@/views/mock/index.vue'
// import charts from '@/views/charts/index.vue'
import ActivityIndex from '@/views/activity/index.vue'
import ActivityDetail from '@/views/activity/detail.vue'

import StoreIndex from '@/views/store/index.vue'
import StoreDetail from '@/views/store/detail.vue'

import ProductIndex from '@/views/product/index.vue'

import ArticleIndex from '@/views/article/index.vue'

NProgress.configure({ showSpinner: true, parent: '#app' })

// 定义路由，每个路由都需要映射到一个组件
const routes = [
  {
    path: '/',
    name: 'main',
    component: main,
  },
  {
    path: '/activities',
    name: 'ActivityIndex',
    component: ActivityIndex,
  },
  {
    path: '/activity/:id/:storeId',
    name: 'ActivityDetail',
    component: ActivityDetail,
  },
  {
    path: '/stores',
    name: 'StoreIndex',
    component: StoreIndex,
  },
  {
    path: '/stores/:id',
    name: 'StoreDetail',
    component: StoreDetail,
  },
  {
    path: '/products',
    name: 'ProductIndex',
    component: ProductIndex,
  },
  {
    path: '/articles',
    name: 'ArticleIndex',
    component: ArticleIndex,
  },
]

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_PUBLIC_PATH),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

router.beforeEach((_to, _from, next) => {
  NProgress.start() // start progress bar
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

// 导出路由实例，并在 `main.ts` 挂载
export default router
