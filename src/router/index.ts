import { createRouter, createWebHistory } from 'vue-router/auto'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import type { EnhancedRouteLocation } from './types'
import useRouteCacheStore from '@/stores/modules/routeCache'
import { useAppStore, useUserStore } from '@/stores'
import setPageTitle from '@/utils/set-page-title'

NProgress.configure({ showSpinner: true, parent: '#app' })

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  routes,
})

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
  handleHotUpdate(router)
}

router.beforeEach(async (to: EnhancedRouteLocation, _from, next) => {
  NProgress.start()

  const routeCacheStore = useRouteCacheStore()
  const appStore = useAppStore()
  const userStore = useUserStore()

  // Route cache
  routeCacheStore.addRoute(to)

  // Set page title
  setPageTitle(to.meta.title)

  const params = to.params as { uniacid: string }
  if (params?.uniacid) {
    if (appStore.account?.uniacid !== params?.uniacid) {
      appStore.resetSetting()
    }
    if (!appStore.account) {
      await appStore.getSetting()
    }
    if (!userStore.userInfo?.uid) {
      await userStore.info()
    }
  }

  useHead({ title: to.meta.title })

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
