<script setup lang="ts">
import Card from '@/components/Card/index.vue'
import { useStore } from '@/stores'
import { localStorage } from '@/utils/local-storage'

const store = useStore()
const themeStore = localStorage.get('theme')
const checked = ref<boolean>(themeStore === 'dark')

watch(checked, (val) => {
  if (val) {
    store.mode = 'dark'
    localStorage.set('theme', 'dark')
  }
  else {
    store.mode = 'light'
    localStorage.set('theme', 'light')
  }
})
</script>

<template>
  <div class="container">
    <div class="header-area">
      <div class="sign-up-area" />
    </div>

    <Card title="活动日历" />

    <Card title="全市消费地图" />

    <Card title="好店推荐" />

    <Card title="电商好货" />

    <Card title="区县动态" />
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  padding-top: 16px;
  padding-bottom: 32px;
  position: relative;

  .header-area {
    margin-bottom: 16px;
  }

  .sign-up-area {
    width: 343px;
    height: 190px;
    margin: 0 auto;
    background: url(https://expo-saas-cdn.1huizhan.com/bcs/h5/bcs-banner1.png);
    background-size: 100% 100%;
    border-radius: 4px;
  }
}
</style>
