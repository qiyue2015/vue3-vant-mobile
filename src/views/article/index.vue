<script setup lang="ts">
import { ref } from 'vue'
import { queryArticles } from '@/api'
const list = ref([])
queryArticles().then(({ data }) => {
  list.value = data
})
</script>

<template>
  <div style="padding: 16px 0">
    <Media :list="list" :num="24" />
  </div>
</template>

<style scoped>

</style>
