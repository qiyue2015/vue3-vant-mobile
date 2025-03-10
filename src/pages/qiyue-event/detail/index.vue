<script setup lang="ts">
import signupInfoPopup from '@/pages/qiyue-event/components/signupInfoPopup.vue'
import { queryQiyueEventDetail } from '@/api/qiyue-event'

// const router = useRouter()
const route = useRoute()

const query = route.query as { id: string }
const loading = ref(false)
const detail = ref<any>(null)

const showPopupIng = ref(false)

onMounted(async () => {
  try {
    if (!query.id) {
      throw new Error('id is required')
    }
    loading.value = true
    const { data } = await queryQiyueEventDetail(query)
    detail.value = data
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <van-skeleton :loading="loading">
    <template #template>
      <div class="w-full flex flex-col pt-16">
        <div class="detail-banner">
          <van-skeleton-image image-size="100%" />
        </div>
        <div class="mt-16">
          <van-skeleton-paragraph />
          <van-skeleton-paragraph row-width="60%" />
        </div>
        <div class="mt-32">
          <van-skeleton-title />
          <van-skeleton-paragraph />
        </div>
        <div class="mt-10">
          <van-skeleton-title />
          <van-skeleton-paragraph />
        </div>
        <div class="mt-32">
          <van-skeleton-title />
          <van-skeleton-paragraph v-for="i in 3" :key="i" />
          <van-skeleton-paragraph row-width="60%" />
        </div>
      </div>
    </template>
  </van-skeleton>
  <div v-if="detail" class="p-16">
    <van-image :src="detail.logo" class="detail-banner" fit="cover" lazy-load />
    <div class="detail-session mt-16">
      <div class="details-title" v-text="detail.title" />
      <div class="detail-browse">
        <span>报名：{{ detail.instance_count }} / {{ detail.max_instance }}</span>
      </div>
    </div>
    <van-cell-group :border="false" class="detail-cell--group mt-16">
      <van-cell title="活动时间" icon="clock-o" :label="detail.start_time" :border="false" />
      <van-cell title="活动地点" icon="location-o" :label="detail.address" center />
    </van-cell-group>
    <div class="details-title mt-32">
      活动详情
    </div>
    <div class="mt-16" v-html="detail.description" />
    <van-action-bar placeholder>
      <van-action-bar-icon icon="fire-o" text="更多" :to="{ name: 'QiyueEventHome' }" />
      <van-action-bar-icon icon="user-o" text="我的" :to="{ name: 'QiyueEventMy' }" />
      <template v-if="detail.status === 1 || detail.status === 2">
        <van-action-bar-button v-if="detail.is_registered" type="success" text="已报名" @click="showPopupIng = true" />
        <van-action-bar-button v-else type="primary" text="立即报名" :to="{ name: 'QiyueEventSignup', query: { event_id: detail.id } }" />
      </template>
      <template v-if="detail.status === 3">
        <van-action-bar-button type="primary" text="已结束" disabled />
      </template>
    </van-action-bar>
    <signup-info-popup v-model:show="showPopupIng" :signup="detail.registration_info" />
  </div>
</template>

<style lang="less" scoped>
.detail-banner {
  width: 100%;
  height: 200px;
  border-radius: var(--van-radius-lg);
  overflow: hidden;
}

.detail-cell--group {
  --van-cell-group-background: transparent;
  --van-cell-background: transparent;

  .van-cell {
    padding-left: 0;
    padding-right: 0;
    --van-cell-label-font-size: 14px;
    --van-cell-text-color: var(--van-text-color-2);
    --van-cell-label-color: var(--van-text-color);
  }
}

.details-title {
  font-size: 18px;
  font-weight: 600;
}

.detail-browse {
  margin-top: 8px;
  font-size: 14px;
  color: var(--van-gray-6);
}
</style>

<route lang="json5">
{
  name: 'QiyueEventDetail',
  meta: {
    title: '活动详情',
    showNavbar: true,
  },
}
</route>
