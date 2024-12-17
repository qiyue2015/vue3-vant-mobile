<script setup lang="ts">
import { useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant'
import { useUserStore } from '@/stores'
import { version } from '~root/package.json'

const router = useRouter()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

function Logout() {
  showConfirmDialog({ title: '确认登出' }).then(() => {
    userStore.logout()
    router.push({
      name: 'QiyueProHome',
      params: {
        ...router.currentRoute.value.params,
      },
    })
  })
}
</script>

<template>
  <div class="text-center">
    <VanCellGroup :inset="true">
      <van-cell v-if="userInfo.uid" :title="$t('settings.logout')" clickable class="van-text-color" @click="Logout" />
    </VanCellGroup>

    <div class="mt-10 text-gray">
      {{ $t("settings.currentVersion") }}: v{{ version }}
    </div>
  </div>
</template>

<style scoped>
.van-text-color {
  --van-cell-text-color: var(--van-red);
}
</style>

<route lang="json5">
{
  name: 'QiyueProUcenterSettings',
  meta: {
    title: '我的设置',
    requiresAuth: true
  },
}
</route>
