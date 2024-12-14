<script setup lang="ts">
import { queryQiyueEventList } from '@/api/qiyue-event'

const page = ref(1)
const pageSize = ref(10)
const list = ref([])
const loading = ref(false)
const finished = ref(false)

async function onLoad() {
  try {
    loading.value = true

    const { data } = await queryQiyueEventList({
      page: page.value,
      page_size: pageSize.value,
    })

    if (data.list.length === 0 || data.list.length < pageSize.value) {
      finished.value = true
    }

    list.value = list.value.concat(data.list)
  }
  finally {
    page.value++
    loading.value = false
    finished.value = true
  }
}
</script>

<template>
  <div class="p-10">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item" :title="item.title" />
    </van-list>
  </div>
</template>

<route lang="json5">
{
  name: 'qiyue-event',
  meta: {
    title: '活动例表',
    showTabbar: true,
  },
}
</route>
