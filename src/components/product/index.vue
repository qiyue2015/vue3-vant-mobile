<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps({
  list: {
    type: Array as () => Array<any>,
    required: true,
  },
})

const router = useRouter()

const gotoProductDetail = ({ id }) => {
  router.push({ name: 'ProductDetail', params: { id } })
}
</script>

<template>
  <van-row gutter="16">
    <van-col v-for="row in list" :key="row.id" :span="8" @click="gotoProductDetail(row)">
      <van-image :src="row.image" fit="cover" />
      <div class="van-ellipsis">
        {{ row.name }}
      </div>
    </van-col>
  </van-row>
</template>

<style lang="less" scoped>
.van-col {
  margin-bottom: 16px;
}

.van-image {
  width: 95px;
  height: 95px;
  border-radius: 4px;
  overflow: hidden;
}

.van-ellipsis {
  font-size: 14px;
}
</style>
