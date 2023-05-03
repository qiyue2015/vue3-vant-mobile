<script setup lang="ts">
import { useRoute } from 'vue-router'
import { queryActivityDetail } from '@/api'

interface ActivityInfo {
  id: number
  name: string
  begin_time: string
  end_time: string
  content: string
  images: string[]
  store: any
}

const route = useRoute()
const id = route.params.id
const storeId = route.params.storeId

const info = ref<ActivityInfo>({
  id: 0,
  name: '',
  begin_time: '',
  end_time: '',
  content: '',
  images: [],
  store: null,
})

queryActivityDetail(id, storeId).then(({ data }) => {
  info.value = data
})
</script>

<template>
  <van-swipe :autoplay="3000" height="23em" style="overflow:hidden;" lazy-render>
    <van-swipe-item v-for="image in info.images" :key="image">
      <van-image :src="image" width="100%" height="100%" fit="cover" />
    </van-swipe-item>
  </van-swipe>

  <div v-if="info.id" class="activity-info">
    <div class="name">
      {{ info.name }}
    </div>
    <div class="duration">
      {{ info.begin_time }} ~ {{ info.end_time }}
    </div>
  </div>

  <StoreDetail v-if="info?.store" :item="info.store" />

  <div class="activity-detail">
    <div class="note-text">
      活动介绍
    </div>
    <div v-if="info" v-html="info.content" />
  </div>
</template>

<style lang="less" scoped>
.activity-detail {
  position: relative;
  background-color: #FFF;
  font-size: 14px;
  padding: 16px;
  margin-top: 16px;

  .note-text {
    color: #474747;
    font-weight: 600;
    font-size: 18px;
  }
}

.activity-info {
  position: relative;
  background-color: #FFF;
  color: #666666;
  font-size: 14px;
  padding: 16px;

  .name {
    font-size: 20px;
    font-weight: 500;
    color: #111;
    margin-bottom: 8px;
  }
}
</style>
