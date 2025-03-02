<script setup lang="ts">
import EventItems from './components/EventItems.vue'

const active = ref('all')
const tabs = reactive([
  { title: '全部', name: 'all' },
  { title: '待参加', name: 'unattend' },
  { title: '待审核', name: 'pending' },
])
</script>

<template>
  <van-tabs v-model:active="active" lazy-render sticky>
    <van-tab v-for="tab in tabs" :key="tab.name" :title="tab.title" :name="tab.name">
      <EventItems :status="tab.name" />
    </van-tab>
  </van-tabs>
</template>

<style scoped lang="less">

</style>

<route lang="json5">
{
  name: 'QiyueEventMy',
  meta: {
    title: '我报名的活动',
    showNavbar: true,
    requiresAuth: true,
  },
}
</route>
