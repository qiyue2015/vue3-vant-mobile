<script setup lang="ts">
import { useUserStore } from '@/stores'
import { getRedirectPath, removeRedirectPath } from '@/utils/auth'

const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
  try {
    const fansInfo = await userStore.fans()
    // 粉丝信息存在并且有uid
    // 未关注的时候它是没有uid的，只有openid 和 unionid
    if (fansInfo && fansInfo?.uid) {
      await userStore.info()
      const redirect = getRedirectPath()
      if (redirect) {
        await router.replace({ path: redirect })
      }
      else {
        await router.replace({ name: 'QiyueProHome' })
      }
    }
    else {
      await router.replace({ name: 'QiyueProAuthRegister' })
    }
  }
  finally {
    removeRedirectPath()
  }
})
</script>

<template>
  <div>xxx</div>
</template>

<route lang="json5">
{
  name: 'QiyueProAuthRedirect'
}
</route>
