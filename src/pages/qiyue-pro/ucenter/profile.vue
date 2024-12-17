<script setup lang="ts">
import router from '@/router'
import { useUserStore } from '@/stores'
import defaultAvatar from '@/assets/images/default-avatar.svg'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const isLogin = computed(() => !!userInfo.value.uid)

function login() {
  if (isLogin.value)
    return

  router.push({ name: 'QiyueProAuthLogin', query: { redirect: 'profile' } })
}
</script>

<template>
  <div class="p12">
    <van-space direction="vertical" fill>
      <van-cell-group :inset="true">
        <van-cell center :is-link="isLogin" :to="{ name: 'QiyueProUcenterSettings' }" @click="login">
          <template #icon>
            <van-image :src="userInfo.avatar || defaultAvatar" round class="mr-12 h-48 w-48" />
          </template>
          <template #title>
            <span v-if="isLogin">{{ userInfo.nickname }}</span>
            <span v-else>{{ $t('profile.login') }}</span>
          </template>
          <template #label>
            {{ userInfo.mobile }}
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group :inset="true">
        <van-cell icon="fire-o" title="我的活动" is-link />
        <van-cell icon="todo-list-o" title="浏览历史" is-link />
      </van-cell-group>
      <van-cell-group :inset="true">
        <van-cell title="退出登录" is-link />
      </van-cell-group>
    </van-space>
  </div>
</template>

<route lang="json5">
{
  name: 'QiyueProUcenterProfile',
  meta: {
    title: '个人信息',
    requiresAuth: true
  },
}
</route>
