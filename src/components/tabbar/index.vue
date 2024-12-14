<script setup lang="ts">
import { useAppStore } from '@/stores'

const route = useRoute()
const appStore = useAppStore()

const menus = computed(() => appStore.tabbar?.menus)
const show = computed(() => appStore.tabbar?.menus.length && route.meta?.showTabbar)
const active = computed(() => menus.value.findIndex((item: any) => item.url.includes(route.path)))

onMounted(async () => {
  if (!appStore.tabbar) {
    await appStore.getTabbar()
  }
})
</script>

<template>
  <van-tabbar v-if="show" v-model="active" :fixed="true" placeholder safe-area-inset-bottom>
    <van-tabbar-item v-for="(menu, index) in menus" :key="index" :to="menu.url" :icon="menu.icon?.name">
      {{ menu.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>
