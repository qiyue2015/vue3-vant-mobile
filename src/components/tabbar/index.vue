<script setup lang="ts">
import { useAppStore } from '@/stores'

const route = useRoute()
const appStore = useAppStore()

const menus = computed(() => appStore.tabbar?.menus)
const show = computed(() => appStore.tabbar?.menus.length && route.meta?.showTabbar)
const active = computed(() => menus.value.findIndex((item: any) => {
  return route.fullPath.includes(item.url)
}))

function getTabbarProps(menu) {
  const isExternal = /^https?:\/\//.test(menu.url)
  return isExternal ? { url: menu.url } : { to: menu.url }
}

onMounted(async () => {
  if (!appStore.tabbar) {
    await appStore.getTabbar()
  }
})
</script>

<template>
  <van-tabbar v-if="show" v-model="active" :fixed="true" placeholder>
    <van-tabbar-item v-for="(menu, index) in menus" :key="index" v-bind="getTabbarProps(menu)">
      <template #icon="props">
        <img :src="props.active ? menu.hover_image : menu.image" alt="">
      </template>
      {{ menu.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>
