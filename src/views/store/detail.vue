<script setup lang="ts">
import { useRoute } from 'vue-router'
import { queryStoreDetail, queryStores } from '@/api'

const route = useRoute()
const id = route.params.id

const info = ref<any>({})
const stores = ref<any>([])
queryStoreDetail(id).then(({ data }) => {
  info.value = data

  const params = Object.assign({}, { categoryId: data.category_id, page: 1 })
  queryStores(params).then(({ data }) => {
    stores.value = data
  })
})
</script>

<template>
  <div class="">
    <van-image :src="info.logo" width="375" height="375" fit="cover" />
    <StoreDetail v-if="info" :item="info" />
    <van-cell-group title="看看其它商家">
      <Store :list="stores" />
    </van-cell-group>
  </div>
</template>

<style lang="less" scoped>

</style>
