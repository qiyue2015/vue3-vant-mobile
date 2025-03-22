<script setup lang="ts">
import { queryQiyueEventList } from '@/api/qiyue-event'

const [loading, setLoading] = useToggle(false)
const finished = ref(false)
const list = ref([])
const isEmpty = ref(false)
const params = reactive({
  page: 1,
  page_size: 20,
})

async function onLoad() {
  try {
    setLoading(true)
    const res = await queryQiyueEventList(params)
    if (res.data?.list) {
      list.value = list.value.concat(res.data.list)
    }
    if (res.data.list.length < params.page_size) {
      finished.value = true
    }
    if (res.data.list.length === 0) {
      isEmpty.value = true
    }
  }
  finally {
    params.page++
    setLoading(false)
  }
}
</script>

<template>
  <div class="h-full">
    <van-empty v-if="isEmpty" description="没有活动" />
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="item in list" :key="item.id" class="m-12">
        <van-cell-group inset>
          <van-cell :to="{ name: 'QiyueEventDetail', query: { id: item.id } }">
            <template #icon>
              <van-image :src="item.logo" class="mr-12 h-90 w-130" fit="cover" lazy-load />
            </template>
            <template #title>
              <div class="h-full flex flex-col justify-between">
                <div class="van-multi-ellipsis--l2 text-15 font-bold">
                  {{ item.title }}
                </div>
                <div>
                  <div class="item-info van-ellipsis text-12">
                    {{ item.address }}
                  </div>
                  <div class="item-info van-ellipsis flex justify-between text-12">
                    <span>{{ item.date_str }}</span>
                    <template v-if="item.status === 1 || item.status === 2">
                      <span class="color-blue-500">立即报名</span>
                    </template>
                    <template v-if="item.status === 3">
                      <span class="color-gray-500">已结束</span>
                    </template>
                  </div>
                </div>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </van-list>
  </div>
</template>

<route lang="json5">
{
  name: 'QiyueEventHome',
  meta: {
    title: '活动例表',
    showTabbar: true,
    keepAlive: true,
  },
}
</route>

<style lang="less" scoped>
.weekday-tabs {
  --van-tabs-line-height: 60px;

  :deep(.van-tab) {
    padding: 8px 0;
    margin: 8px 4px;
  }

  :deep(.van-tab--active) {
    background: var(--van-background-3);
    border-radius: var(--van-radius-md);
    overflow: hidden;
  }
}
</style>
