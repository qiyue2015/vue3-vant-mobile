import { createRouter, createWebHistory } from 'vue-router/auto'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import type { EnhancedRouteLocation } from './types'
import useRouteCacheStore from '@/stores/modules/routeCache'
import { useAppStore, useUserStore } from '@/stores'
import { isLogin, setRedirectPath } from '@/utils/auth'
import { isWeixinBrowser } from '@/utils'

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
    const pageTitle = (to.meta.title || appStore.account.name) as string
    useHead({ title: pageTitle })

    if (isLogin()) {
      if (to.name === 'QiyueProAuthRedirect') {
        next({ name: 'QiyueProHome', params: to.params })
      }
      else if (userStore.userInfo?.uid) {
        next()
      }
      else {
        await userStore.info()
        next({ ...to, replace: true })
      }
    }
    else {
      if (to.meta.requiresAuth) {
        if (isWeixinBrowser()) {
          setRedirectPath(to.fullPath)
        }

        next({
          name: 'QiyueProAuthLogin',
          params: to.params,
          query: { redirect: encodeURIComponent(to.fullPath) },
        })
        // if (isWeixinBrowser()) {
        //   setRedirectPath(to.fullPath)
        //   const redirect = encodeURIComponent(`${window.location.origin}/${params?.uniacid}/qiyue-pro/auth/redirect`)
        //   const { redirect_uri } = await userStore.getWechatAuthUrl(redirect)
        //   window.location.href = redirect_uri
        //   next(false)
        // }
        // else {
        //   next({
        //     name: 'QiyueProAuthLogin',
        //     params: to.params,
        //     query: { redirect: encodeURIComponent(to.fullPath) },
        //   })
        // }
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
