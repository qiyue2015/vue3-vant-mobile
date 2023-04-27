<script setup lang="ts">
import { defineEmits, onMounted, ref } from 'vue'

interface Day {
  date: string
  weekday: string
  day: string
  active: boolean
}

const emit = defineEmits(['date-selected'])

const today = new Date()

const weekdays = ref<Day[]>([])

function updateWeekdays() {
  weekdays.value = []
  const firstDay = new Date(today.getTime())
  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDay.getTime())
    day.setDate(firstDay.getDate() + i)
    const weekday = ['日', '一', '二', '三', '四', '五', '六'][day.getDay()]
    const dateString = day.toLocaleDateString('zh-CN')
    const isActive = dateString === today.toLocaleDateString('zh-CN')
    weekdays.value.push({
      date: dateString,
      weekday,
      day: day.getDate().toString(),
      active: isActive,
    })
  }
}

onMounted(updateWeekdays)

onMounted(() => {
  const todayString = today.toLocaleDateString('zh-CN')
  handleDateClick(todayString)
})

function handleDateClick(dateString: string) {
  weekdays.value.forEach(day => day.active = day.date === dateString)
  // eslint-disable-next-line vue/custom-event-name-casing
  emit('date-selected', dateString)
}
</script>

<template>
  <div class="calendar">
    <div
      v-for="day in weekdays"
      :key="day.date"
      class="calendar-day"
      :class="{ active: day.active }"
      @click="handleDateClick(day.date)"
    >
      <div class="weekday">
        {{ day.weekday }}
      </div>
      <div class="day">
        {{ day.day }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.calendar-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 10px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #EBEDF0;
}

.calendar-day.active {
  background-color: red;
  color: #FFFFFF;
}
</style>
