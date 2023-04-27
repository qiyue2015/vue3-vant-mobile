<script setup lang="ts">
import { ref } from 'vue'
import { queryStoreCategories, queryStores } from '@/api'

const query = ref({ categoryId: 0, page: 1 })

const active = ref(0)
const categories = ref([])
queryStoreCategories().then(({ data }) => {
  categories.value = data
  categories.value.unshift({ id: 0, name: '全部' })
})

const list = ref([])
const loading = ref(false)
const finished = ref(false)
const onLoad = () => {
  queryStores(Object.assign({}, query.value)).then(({ data, meta }) => {
    if (meta.has_more)
      query.value.page = meta.next_page

    list.value = list.value.concat(data)

    // 加载状态结束
    loading.value = false
    finished.value = true
    if (list.value.length >= 100 || data.length < 10)
      finished.value = true
  })
}

const handleTabClick = ({ name }) => {
  const category = categories.value[name]
  query.value.categoryId = category.id
  query.value.page = 1
  list.value = []
  loading.value = false
  finished.value = false
}
</script>

<template>
  <van-tabs v-model:active="active" sticky @click-tab="handleTabClick">
    <van-tab v-for="category in categories" :key="category.id" :title="category.name">
      <van-list class="store-list" :loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <Store :list="list" />
      </van-list>
    </van-tab>
  </van-tabs>
</template>

<style lang="less" scoped>
.store-list {
  margin-top: 16px;
}
</style>
