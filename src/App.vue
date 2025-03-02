<script setup lang="ts">
// import { storeToRefs } from 'pinia'
// import useAppStore from '@/stores/modules/app'
import useRouteCache from '@/stores/modules/routeCache'
import { useUserStore } from '@/stores'
import { showConfirmDialog } from 'vant'

// const appStore = useAppStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
// const { mode } = storeToRefs(appStore)

const keepAliveRouteNames = computed(() => {
  return useRouteCache().routeCaches as string[]
})

onMounted(() => {
  setTimeout(() => {
    if (route.meta?.requiresAuth && !userStore.userInfo?.mobile && route.name !== 'QiyueProUcenterBinding') {
      showConfirmDialog({
        title: '设置手机号以继续使用',
        message: '依据《中华人民共和国网络安全法》相关要求，请设置手机号以继续使用。',
        confirmButtonText: '去设置',
        cancelButtonText: '退出登录',
      })
        .then(() => {
          router.push({
            name: 'QiyueProUcenterBinding',
            params: route.params,
            query: {
              redirect: encodeURIComponent(route.fullPath),
            },
          })
        })
        .catch(() => {
          userStore.logout().then(() => {
            window.location.reload()
          })
        })
    }
  }, 100)
})
</script>

<template>
  <VanConfigProvider theme="light">
    <navbar />
    <router-view v-slot="{ Component, route }">
      <section class="app-wrapper">
        <keep-alive :include="keepAliveRouteNames">
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </section>
    </router-view>
    <tabbar />
  </VanConfigProvider>
</template>

<style scoped>
.app-wrapper {
  width: 100%;
  position: relative;
}
</style>
