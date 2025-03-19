<script setup lang="ts">
import EventItems from './components/EventItems.vue'

const hasInit = ref(false)
const active = ref(0)
const weekDays = ref<any[]>([])

function initializeWeek() {
  const today = new Date() // 当前日期
  const currentDay = today.getDay() // 获取今天是星期几 (0-6, 0 代表周日)
  const weekLabels = ['一', '二', '三', '四', '五', '六', '日']

  // 计算本周星期一的日期 (往前偏移到星期一)
  const monday = new Date(today)
  monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1))

  // 生成从星期一到星期日的日期数据
  const tabs = weekLabels.map((label, index) => {
    const currentDate = new Date(monday)
    currentDate.setDate(monday.getDate() + index) // 在星期一的基础上偏移

    return {
      label: `周${label}`,
      date: currentDate.getDate(), // 只显示日期号
      fullDate: currentDate.toLocaleDateString(),
    }
  })

  weekDays.value = [
    { label: '全部', date: 0, fullDate: null },
    ...tabs,
  ]

  // 设置今天的日期，用于高亮
  // active.value = weekDays.value.findIndex(tab => tab.date === today.getDate())
  hasInit.value = true
}

onMounted(() => {
  initializeWeek()
})
</script>

<template>
  <van-tabs v-if="hasInit" v-model:active="active" :sticky="true" class="weekday-tabs">
    <van-tab v-for="(row, index) in weekDays" :key="row.date" :name="index">
      <template #title>
        <div class="text-center">
          <div class="text-14" v-text="row.label" />
          <div v-if="row.date" class="text-12 line-height-none">
            {{ row.date }}
          </div>
        </div>
      </template>
      <EventItems :date="row.fullDate" />
    </van-tab>
  </van-tabs>
</template>

<route lang="json5">
{
  name: 'QiyueEventHome',
  meta: {
    title: '活动例表',
    showTabbar: true,
    keepAlive: true,
  },
}
</route>

<style lang="less" scoped>
.weekday-tabs {
  --van-tabs-line-height: 60px;

  :deep(.van-tab) {
    padding: 8px 0;
    margin: 8px 4px;
  }

  :deep(.van-tab--active) {
    background: var(--van-background-3);
    border-radius: var(--van-radius-md);
    overflow: hidden;
  }
}
</style>
