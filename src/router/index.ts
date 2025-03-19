import { createRouter, createWebHistory } from 'vue-router/auto'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import type { EnhancedRouteLocation } from './types'
import useRouteCacheStore from '@/stores/modules/routeCache'
import { useAppStore, useUserStore } from '@/stores'
import { getRedirectParam, isLogin, removeRedirectParam, setRedirectParam } from '@/utils/auth'
import { isWeixinBrowser } from '@/utils'
// import { isWeixinBrowser } from '@/utils'

NProgress.configure({ showSpinner: true, parent: '#app' })

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  routes,
})

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
  handleHotUpdate(router)
}

router.beforeEach(async (to: EnhancedRouteLocation, from, next) => {
  NProgress.start()

  const routeCacheStore = useRouteCacheStore()
  const appStore = useAppStore()
  const userStore = useUserStore()
  const isWeixin = isWeixinBrowser()

  // Route cache
  routeCacheStore.addRoute(to)

  const params = to.params as { uniacid: string }
  if (params?.uniacid) {
    // 获取公众平台基本信息
    if (appStore.account?.uniacid !== params?.uniacid) {
      appStore.resetSetting()
      if (isLogin()) {
        await userStore.logout()
      }
    }
    if (!appStore.account) {
      await appStore.getSetting()
    }

    // Set page title
    useHead({ title: (to.meta.title || appStore.account.name) as string })

    if (isLogin()) {
      if (!userStore.userInfo?.uid) {
        await userStore.info()
      }

      if (to.name === 'QiyueProAuthRedirect') {
        // 返回上一页
        const redirect = await getRedirectParam()
        if (redirect) {
          removeRedirectParam()
          next({ ...redirect, replace: true })
        }
        else {
          next({ name: 'QiyueProHome', replace: true })
        }
      }
      else {
        next()
      }
    }
    else {
      if (to.meta.requiresAuth) {
        setRedirectParam(from.fullPath, from.query)
        next({
          name: 'QiyueProAuthLogin',
          params: to.params,
          query: {
            redirect: encodeURIComponent(to.fullPath),
          },
          replace: isWeixin,
        })
      }
      else {
        next()
      }
    }
  }
  else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
