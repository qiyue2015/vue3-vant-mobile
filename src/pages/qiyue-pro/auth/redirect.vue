<script setup lang="ts">
import { useUserStore } from '@/stores'
import { getRedirectPath, removeRedirectPath } from '@/utils/auth'

const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
  try {
    const redirect = getRedirectPath()
    const fansInfo = await userStore.fans()
    // 未关注的时候它是没有uid的，只有 openid 和 unionid
    if (fansInfo && fansInfo?.uid) {
      await userStore.info()
      if (redirect) {
        // 使用 router 不会携带 redirect 中的参数
        // await router.push({ path: redirect })
        window.location.replace(redirect)
      }
      else {
        await router.push({ name: 'QiyueProHome' })
      }
    }
    else {
      // await router.push({ name: 'QiyueProAuthRegister' })
      // 默认手机号登录，手机号未注册会直接注册
      await router.push({ name: 'QiyueProAuthLogin' })
    }
  }
  finally {
    removeRedirectPath()
  }
})
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <van-loading type="spinner" color="#1989fa" vertical>
      登录中…
    </van-loading>
  </div>
</template>

<route lang="json5">
{
  name: 'QiyueProAuthRedirect'
}
</route>
