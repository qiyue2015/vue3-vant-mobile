<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore, useUserStore } from '@/stores'
import wechatIcon from '@/assets/images/wechat.svg'
import { isWeixinBrowser } from '@/utils'
import SmsLoginForm from '@/pages/qiyue-pro/auth/components/SmsLoginForm.vue'

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

// 是否微信环境
const isWeixin = isWeixinBrowser()
const wechatAuthUrl = ref('')

const { uniacid } = router.currentRoute.value.params as { uniacid: string }

async function onWechatLogin() {
  window.location.replace(wechatAuthUrl.value)
}

onMounted(async () => {
  if (isWeixin) {
    const redirect = encodeURIComponent(`${window.location.origin}/${uniacid}/qiyue-pro/auth/redirect`)
    const { redirect_uri } = await userStore.getWechatAuthUrl(redirect)
    wechatAuthUrl.value = redirect_uri
  }
})
</script>

<template>
  <div class="m-x-a h-screen w-7xl flex flex-col justify-between text-center">
    <div class="mt-32">
      <div class="mb-32 mt-20">
        <van-image :src="appStore.account.logo" class="h-80 w-80" alt="brand logo" />
      </div>
      <SmsLoginForm />
    </div>
    <div v-if="isWeixin && wechatAuthUrl" class="mb-64 w-full">
      <van-divider>其它登录方式</van-divider>
      <div class="flex items-center justify-center gap-32">
        <van-image :src="wechatIcon" class="h-32 w-32 overflow-hidden" @click="onWechatLogin" />
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
