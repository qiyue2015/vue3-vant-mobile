<script lang="ts">
import { map } from 'lodash-es'
export default {
  name: 'Activity',
  props: {
    list: {
      type: Array,
      required: true,
    },
    num: {
      type: Number,
      default: 12,
    },
  },
  computed: {
    modifiedList() {
      return map(this.list, item => ({
        ...item,
        image: item.images?.[0],
        storeId: item.stores?.[0]?.id,
      }))
    },
  },
}
</script>

<template>
  <van-row gutter="16" justify="space-between">
    <van-col v-for="row in modifiedList" :key="row.id" :span="num">
      <router-link :to="{ name: 'ActivityDetail', params: { id: row.id, storeId: row.storeId || 0 } }" class="list-item">
        <img :src="row.image" class="item-img" alt="">
        <div class="van-multi-ellipsis--l2" v-text="row.name" />
      </router-link>
    </van-col>
  </van-row>
</template>

<style lang="less" scoped>
.list-item {
  width: 147px;
  margin-bottom: 16px;
  display: inline-block;
  color: inherit;
  font-size: 14px;

  img {
    width: 100%;
    height: 80px;
    border-radius: 4px;
  }
}
</style>
