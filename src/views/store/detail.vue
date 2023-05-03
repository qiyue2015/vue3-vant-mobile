<script setup lang="ts">
import { useRoute } from 'vue-router'
import { queryStoreDetail, queryStores } from '@/api'

const route = useRoute()
const id = ref(route.params.id)

const info = ref<any>({})
const stores = ref<any[]>([])
const fetchData = () => {
  queryStoreDetail(id.value).then(({ data }) => {
    info.value = data
    const params = Object.assign({}, {
      categoryId: data.category_id,
      page: 1,
    })
    queryStores(params).then(({ data }) => {
      stores.value = data
    })
  })
}

fetchData()

// 监听路由参数变化
watch(() => route.params.id, (newId) => {
  id.value = newId
  fetchData()
})
</script>

<template>
  <div class="">
    <div class="store-image">
      <van-image :src="info.logo" width="100%" height="100%" fit="cover" />
    </div>
    <StoreDetail v-if="info" :item="info" />
    <van-cell-group title="看看其它商家">
      <Store :list="stores" />
    </van-cell-group>
  </div>
</template>

<style lang="less" scoped>
.store-image {
  width: 375px;
  height: 280px;
}
</style>
