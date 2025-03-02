<script setup lang="ts">
import { useUserStore } from '@/stores'
import defaultAvatar from '@/assets/images/default-avatar.svg'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const isLogin = computed(() => !!userInfo.value.uid)
</script>

<template>
  <div class="p12">
    <van-space direction="vertical" size="10px" fill>
      <van-cell-group :inset="true">
        <van-cell center :to="{ name: 'QiyueProUcenterProfile' }" is-link>
          <template #icon>
            <van-image :src="userInfo.avatar || defaultAvatar" round class="mr-12 h-36 w-36" />
          </template>
          <template #title>
            <span v-if="isLogin">{{ userInfo.nickname }}</span>
            <span v-else class="text-gray">游客</span>
          </template>
          <template #label>
            {{ userInfo.mobile }}
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group :inset="true">
        <van-grid :gutter="10" :border="false" :column-num="2">
          <van-grid-item icon="star-o" text="待参加活动" :to="{ name: 'QiyueEventMy', query: { key: 'unattend' } }" />
          <van-grid-item icon="fire-o" text="待审核活动" :to="{ name: 'QiyueEventMy', query: { key: 'pending' } }" />
        </van-grid>
      </van-cell-group>
      <van-cell-group :inset="true">
        <van-cell icon="todo-list-o" title="关注我们" is-link />
        <van-cell icon="todo-list-o" title="浏览记录" :to="{ name: 'QiyueProUcenterHistory' }" is-link />
        <van-cell icon="todo-list-o" title="联系客服" is-link />
      </van-cell-group>
    </van-space>
  </div>
</template>

<route lang="json5">
{
  name: 'QiyueProUcenter',
  meta: {
    title: '会员中心',
    showTabbar: true,
  },
}
</route>
