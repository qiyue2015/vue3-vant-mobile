<script setup lang="ts">
import { ref } from 'vue'
import { queryArticles } from '@/api'

const list = ref([])
const query = ref({ page: 1 })
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
  if (!loading.value) {
    loading.value = true
    queryArticles(query.value).then(({ data, meta }) => {
      query.value.page = meta.next_page
      list.value = list.value.concat(data)
      finished.value = meta.next_page === null
    }).finally(() => {
      loading.value = false
    })
  }
}
</script>

<template>
  <div style="padding: 16px 0">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <Media :list="list" :num="24" />
    </van-list>
  </div>
</template>
