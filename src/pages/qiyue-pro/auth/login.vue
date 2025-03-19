<script setup lang="ts">
import { useAppStore } from '@/stores'
import wechatIcon from '@/assets/images/wechat.svg'
import { isWeixinBrowser } from '@/utils'
import SmsLoginForm from '@/pages/qiyue-pro/auth/components/SmsLoginForm.vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
// const userStore = useUserStore()

// const { uniacid } = route.params as { uniacid: string }

// 是否登陆
// const login = isLogin()

// 是否微信环境
const isWeixin = isWeixinBrowser()

function onWechatLogin() {
  router.replace({ name: 'QiyueProAuthRedirect', query: route.query })
}

onMounted(async () => {
  // if (isWeixin) {
  //   const redirectFullUrl = `${window.location.origin}/${uniacid}/qiyue-pro/auth/redirect?redirect=${route.query.redirect as string}`
  //   const { data } = await getWechatAuthUrl(redirectFullUrl)
  //   weixinAuthUrl.value = data.redirect_uri
  // }
})
</script>

<template>
  <div class="m-x-a h-screen w-7xl flex flex-col justify-between text-center">
    <!-- <div>{{ userStore?.userInfo?.uid }} - {{ login }}</div> -->
    <div class="mt-32">
      <div class="mb-32 mt-20">
        <van-image :src="appStore.account.logo" class="h-80 w-80" alt="brand logo" />
      </div>
      <SmsLoginForm />
    </div>
    <div v-if="isWeixin" class="mb-64 w-full">
      <van-divider>其它登录方式</van-divider>
      <div class="flex items-center justify-center gap-32">
        <van-image :src="wechatIcon" class="h-48 w-48 overflow-hidden" @click="onWechatLogin" />
      </div>
    </div>
  </div>
</template>

<route lang="json5">
{
  name: 'QiyueProAuthLogin',
  meta: {
    title: '用户登录'
  },
}
</route>
