<script setup lang="ts">
import { checkinSignup, queryQiyueEventDetail, querySignupDetail } from '@/api/qiyue-event'
import { showToast } from 'vant'

const route = useRoute()
const router = useRouter()
const [loading, setToggle] = useToggle(true)
const [postIng, setCheckin] = useToggle(false)

const queryParams = route.query as { event_id: string, signup_id: string }

const eventDetail = ref<any>(null)
const signupDetail = ref<any>(null)

async function fetchData() {
  try {
    const eventResponse = await queryQiyueEventDetail({ id: queryParams.event_id })
    eventDetail.value = eventResponse.data

    const signupResponse = await querySignupDetail(queryParams.event_id, queryParams.signup_id)
    if (signupResponse.errno === 0) {
      setToggle(false)
      signupDetail.value = signupResponse.data
    }
    else {
      await router.replace({
        name: 'QiyueEventDetail',
        query: {
          id: queryParams.event_id,
        },
      })
    }
  }
  catch (error) {
    console.error(error)
  }
}

async function onCheckinSignup() {
  try {
    setCheckin(true)
    await checkinSignup(queryParams.event_id, queryParams.signup_id)
    showToast('签到成功')
    await fetchData()
  }
  finally {
    setCheckin(false)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <van-skeleton :loading="loading" class="mt-20" title :row="3">
    <div class="p-12">
      <van-cell-group title="报名信息" class="detail-info" inset>
        <van-cell title="活动" :value="eventDetail.title" />
        <van-cell title="姓名" :value="signupDetail.name" />
        <!-- 待审0 已审1 已拒2 取消3 -->
        <van-cell title="状态">
          <template #value>
            <van-tag v-if="signupDetail.status === 0" type="primary">
              待审核
            </van-tag>
            <van-tag v-if="signupDetail.status === 1" type="success">
              已通过
            </van-tag>
            <van-tag v-if="signupDetail.status === 2" type="danger">
              已拒绝
            </van-tag>
            <van-tag v-if="signupDetail.status === 3" type="warning">
              已取消
            </van-tag>
          </template>
        </van-cell>
        <template v-if="signupDetail.status === 1">
          <van-cell title="签到状态">
            <template #value>
              <van-tag v-if="signupDetail.is_checkin === 0" type="primary">
                待签到
              </van-tag>
              <van-tag v-if="signupDetail.is_checkin === 1" type="success">
                已签到
              </van-tag>
            </template>
          </van-cell>
          <van-cell title="签到时间" :value="signupDetail.checkin_at" />
        </template>
      </van-cell-group>
      <div class="mt-16">
        <template v-if="signupDetail.status === 1">
          <van-button v-if="signupDetail.is_checkin === 1" :loading="loading" disabled round plain block>
            已签到
          </van-button>
          <van-button v-if="signupDetail.is_checkin === 0" :loading="postIng" type="primary" round block @click="onCheckinSignup">
            确认签到
          </van-button>
        </template>
      </div>
    </div>
  </van-skeleton>
</template>

<style scoped lang="less">
:deep(.detail-info) {
  .van-cell__title {
    width: 6.1em;
    flex: none;
  }

  .van-cell__value {
    text-align: left;
  }
}
</style>

<route lang="json5">
{
  name: 'QiyueEventOperatorVerify',
  meta: {
    title: '活动签到',
    showNavbar: true,
    requiresAuth: true,
  },
}
</route>
