<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore, useUserStore } from '@/stores'

import vw from '@/utils/inline-px-to-vw'

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const loading = ref(false)

const postData = reactive({
  mode: 'basic',
  username: '',
  password: '',
})

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名' },
  ],
  password: [
    { required: true, message: '请输入密码' },
  ],
})

async function login(values: any) {
  try {
    loading.value = true
    await userStore.login({ ...postData, ...values })
    const { redirect } = router.currentRoute.value.query
    if (redirect) {
      await router.replace({
        path: decodeURIComponent(redirect as string),
      })
    }
    else {
      await router.replace({
        name: 'QiyueProHome',
      })
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="m-x-a mt-32 w-7xl text-center">
    <div class="mb-32 mt-20">
      <van-image :src="appStore.account.logo" class="h-80 w-80" alt="brand logo" />
    </div>
    <van-form :model="postData" :rules="rules" validate-trigger="onSubmit" @submit="login">
      <div class="overflow-hidden rounded-3xl">
        <van-field v-model="postData.username" :rules="rules.username" placeholder="请输入用户名" name="username" />
      </div>
      <div class="mt-16 overflow-hidden rounded-3xl">
        <van-field v-model="postData.password" :rules="rules.password" placeholder="请输入密码" name="password" type="password" />
      </div>
      <div class="mt-16">
        <van-button :loading="loading" type="primary" native-type="submit" round block>
          立即登录
        </van-button>
      </div>
    </van-form>

    <ghost-button block to="register" :style="{ 'margin-top': vw(16) }">
      {{ $t('login.sign-up') }}
    </ghost-button>

    <ghost-button block to="forgot-password">
      {{ $t('login.forgot-password') }}
    </ghost-button>
  </div>
</template>

<route lang="json5">
{
  name: 'QiyueProAuthLogin',
  meta: {
    title: '登录'
  },
}
</route>
