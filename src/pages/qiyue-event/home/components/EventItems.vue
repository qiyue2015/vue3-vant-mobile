<script setup lang="ts">
import { queryQiyueEventList } from '@/api/qiyue-event'

const props = defineProps<{ date?: string }>()

const { date } = toRefs(props)

const list = ref([])
const loading = ref(false)
const finished = ref(false)
const isEmpty = ref(false)
const params = reactive({
  page: 1,
  page_size: 20,
  date,
})

async function onLoad() {
  try {
    loading.value = true
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
    loading.value = false
  }
}
</script>

<template>
  <van-list v-model:loading="loading" :finished="finished" class="h-full" @load="onLoad">
    <van-empty v-if="isEmpty" description="没有活动" />
    <div v-for="item in list" :key="item.id" class="m-12">
      <van-cell-group inset>
        <van-cell :to="{ name: 'QiyueEventDetail', query: { id: item.id } }">
          <template #icon>
            <van-image :src="item.logo" class="mr-12 h-90 w-130" fit="cover" lazy-load />
          </template>
          <template #title>
            <div class="h-full flex flex-col justify-between">
              <div class="van-multi-ellipsis text-15 font-bold">
                {{ item.title }}
              </div>
              <div>
                <div class="item-info van-ellipsis text-12">
                  {{ item.address }}
                </div>
                <div class="item-info van-ellipsis flex justify-between text-12">
                  <span>{{ item.date_str }}</span>
                  <span class="color-blue-500">立即报名</span>
                </div>
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </van-list>
</template>
