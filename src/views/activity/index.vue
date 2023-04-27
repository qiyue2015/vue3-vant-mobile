<script setup lang="ts">
import { ref } from 'vue'
import { queryActivities } from '@/api'
const list = ref([])
queryActivities({}).then(({ data }) => {
  list.value = data
})
</script>

<template>
  <div style="padding: 16px">
    <Activity :list="list" />
  </div>
</template>

<style scoped>

</style>
