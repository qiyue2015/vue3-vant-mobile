<script setup lang="ts">
import { type EventSignupItem, queryUserEventList } from '@/api/qiyue-event'
import SignupInfoPopup from '@/pages/qiyue-event/components/signupInfoPopup.vue'

const props = defineProps<{ status?: string }>()
const queryParams = { page: 1, limit: 10, ...props }

const loading = ref(false)
const finished = ref(false)
const list = ref<EventSignupItem[]>([])

async function onLoad() {
  try {
    loading.value = true
    const { data } = await queryUserEventList(queryParams)
    if (data.list.length < queryParams.limit) {
      finished.value = true
    }
    else {
      queryParams.page++
    }
    list.value = data.list
  }
  catch {
    finished.value = true
  }
  finally {
    loading.value = false
  }
}

// 预览
const showPopupIng = ref(false)
const detail = ref<EventSignupItem>(null)
function onPreview(item: EventSignupItem) {
  showPopupIng.value = true
  detail.value = item
}
</script>

<template>
  <div class="h-full flex flex-col p-12">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-space direction="vertical" fill>
        <van-cell-group v-for="item in list" :key="item.id" inset>
          <van-cell @click="onPreview(item)">
            <template #icon>
              <van-image :src="item.event.logo" class="mr-8 h-80 w-106 rounded-lg" />
            </template>
            <template #title>
              <div class="h-full max-w-220 w-full flex flex-col justify-between">
                <div class="van-ellipsis text-15 font-bold">
                  {{ item.event.title }}
                </div>
                <div class="item-info van-ellipsis text-12">
                  {{ item.event.address }}
                </div>
                <div class="item-info van-ellipsis flex justify-between text-12">
                  <span class="flex-1">{{ item.event.date_str }}</span>
                  <!-- 活动状态 0未发布 1未开始 2进行中 3已结束 4违规关闭 -->
                  <span v-if="item.status === 0" class="color-gray-500">待审核</span>
                  <span v-if="item.event.status === 2 && (item.status === 1 && item.is_checkin === 0)" class="color-blue-500">待签到</span>
                </div>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </van-space>
    </van-list>
    <SignupInfoPopup v-if="detail" v-model:show="showPopupIng" :signup="detail" />
  </div>
</template>

<style scoped lang="less">
:deep(.detail-info) {
  .van-cell__title {
    width: 6em;
    flex: none;
  }

  .van-cell__value {
    text-align: left;
  }
}
</style>
