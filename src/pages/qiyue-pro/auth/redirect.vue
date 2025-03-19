<script setup lang="ts">
import { useUserStore } from '@/stores'
import { getWechatAuthUrl } from '@/api/user'
import { isLogin } from '@/utils/auth'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { uniacid } = route.params as { uniacid: string }

onMounted(async () => {
  try {
    const { redirect, ...othersQuery } = router.currentRoute.value.query
    // 从微信授权回调过来
    if (othersQuery?.i && othersQuery?.wxref) {
      if (!isLogin()) {
        await userStore.info()
      }

      if (redirect) {
        delete othersQuery.i
        delete othersQuery.wxauth
        delete othersQuery.wxref
        await router.replace({ path: (redirect as string), query: othersQuery })
      }
      else {
        await router.replace({ name: 'QiyueProHome' })
      }
    }
    else {
      let redirectFullUrl = `${window.location.origin}/${uniacid}/qiyue-pro/auth/redirect`
      if (redirect) {
        redirectFullUrl += `?redirect=${redirect}`
      }
      const { data } = await getWechatAuthUrl(redirectFullUrl)
      window.location.replace(data.redirect_uri)
    }
  }
  catch {
    await router.push({ name: 'QiyueProAuthLogin' })
  }
})
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center" />
</template>

<route lang="json5">
{
  name: 'QiyueProAuthRedirect'
}
</route>
