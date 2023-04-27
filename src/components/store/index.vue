<script setup lang="ts">
import type { PropType } from 'vue'
import { defineProps } from 'vue'

defineProps({
  list: {
    type: Array as PropType<{
      id: number
      logo: string
      name: string
      category?: {
        name: string
      }
      distance?: string
    }[]>,
    required: true,
  },
})
</script>

<template>
  <router-link v-for="row in list" :key="row.id" :to="{ name: 'StoreDetail', params: { id: row.id } }" class="store-box">
    <van-image class="store-box_hd" :src="row.logo" fit="cover" />
    <div class="store-box_bd">
      <div class="store-box_title van-ellipsis" v-text="row.name" />
      <div class="store-box_region">
        <span v-if="row.category" v-text="row.category.name" />
        <!-- <span class="distance">{{ row.distance }}</span> -->
      </div>
      <!-- <div class="store-box_category" v-text="row.category.name" /> -->
    </div>
  </router-link>
</template>

<style lang="less" scoped>
.store-box {
  padding: 16px;
  position: relative;
  display: flex;
  align-items: center;

  &:before {
    content: " ";
    position: absolute;
    left: 16px;
    top: 0;
    right: 16px;
    height: 1px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.1);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }

  &:first-child {
    //padding-top: 0;

    &:before {
      display: none;
    }
  }

  &_hd {
    margin-right: 16px;
    width: 72px;
    height: 72px;
    line-height: 72px;
    text-align: center;
    border-radius: 4px;
    overflow: hidden;
  }

  &_bd {
    flex: 1;
    min-width: 0;
  }

  &_title {
    margin-bottom: 6px;
  }

  &_region{
    width: 100%;
    color: #666;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;

    .distance {
      text-align: right;
      display: inline-block;
      margin-left: auto;
    }
  }
}
</style>
