<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="store-content">
    <van-cell>
      <template #title>
        <span class="custom-title">商家：</span>
        <span class="custom-text">{{ item.name }}</span>
      </template>
    </van-cell>
    <van-cell>
      <template #title>
        <span class="custom-title">地址：</span>
        <span class="custom-text" />
      </template>
    </van-cell>
    <van-cell v-if="item.phone_list">
      <template #title>
        <span class="custom-title">电话：</span>
        <span class="custom-text">{{ item.phone_list[0] }}</span>
      </template>
      打电话
    </van-cell>
    <van-cell>
      <template #title>
        <span class="custom-title">营业：</span>
        <span class="custom-text">周一至周日 10:00-21:59</span>
      </template>
    </van-cell>
  </div>
</template>

<style lang="less" scoped>
.store-content{
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  padding-bottom: 6px;
}
</style>
