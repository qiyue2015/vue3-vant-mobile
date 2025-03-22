<script setup lang="ts">
import QRCode from 'qrcode'
import { queryQiyueEventDetail } from '@/api/qiyue-event'

const props = defineProps<{
  signup: any
}>()

const attrs = useAttrs()
const route = useRoute()
const [loading, setToggle] = useToggle(false)

const timer = ref(null)
const bindingQRCode = ref('')
const detail = ref<any>(props.signup)

async function fetchData() {
  try {
    if (!loading.value) {
      setToggle(true)
      const res = await queryQiyueEventDetail({ id: props.signup.event_id })
      if (res.errno === 0) {
        detail.value = res.data.registration_info
        if (detail.value.is_checkin === 1) {
          clearInterval(timer.value)
          timer.value = null
        }
      }
    }
  }
  finally {
    setToggle(false)
  }
}

function onOpen() {
  const { uniacid } = route.params as { uniacid: string }
  const bindingUrl = `https://h5.wifixc.com/${uniacid}/qiyue-event/verify?event_id=${props.signup.event_id}&signup_id=${props.signup.id}&_t=${Date.now()}`
  QRCode.toDataURL(bindingUrl).then((url) => {
    bindingQRCode.value = url
  })
  if (props.signup.status === 1 && props.signup.is_checkin === 0) {
    timer.value = setInterval(() => {
      fetchData()
    }, 1000)
  }
}

function onClose() {
  clearInterval(timer.value)
  timer.value = null
}
</script>

<template>
  <van-popup v-bind="{ ...attrs }" position="bottom" class="min-h-3xl" close-on-popstate round closeable safe-area-inset-bottom @open="onOpen" @close="onClose">
    <!-- <div v-if="detail.status === 1 && detail.is_checkin === 0" class="pt-48 text-center"> -->
    <!--  <van-image :src="bindingQRCode" class="h-2xl w-2xl" lazy-load /> -->
    <!--  <div class="mt-10 text-5xl text-gray"> -->
    <!--    请向现场工作人员出示该二维码 -->
    <!--  </div> -->
    <!-- </div> -->
    <van-cell-group title="报名信息" class="registration-info py-10">
      <van-cell title="状态">
        <template #value>
          <van-tag v-if="detail.status === 0" type="primary">
            待审核
          </van-tag>
          <van-tag v-if="detail.status === 1" type="success">
            已通过
          </van-tag>
        </template>
      </van-cell>
      <van-cell title="姓名" :value="detail.name" />
      <van-cell title="手机" :value="detail.phone" />
      <van-cell title="报名时间" :value="detail.created_at" />
      <template v-if="detail.status === 1">
        <van-cell title="活动签到">
          <template #value>
            <van-tag v-if="detail.is_checkin === 0" type="primary">
              待签到
            </van-tag>
            <van-tag v-if="detail.is_checkin === 1" type="success">
              已签到
            </van-tag>
          </template>
        </van-cell>
        <van-cell v-if="detail.is_checkin === 1" title="签到时间" :value="detail.checkin_at" />
      </template>
    </van-cell-group>
  </van-popup>
</template>

<style scoped lang="less">
:deep(.registration-info) {
  .van-cell__title {
    width: 6em;
    flex: none;
  }

  .van-cell__value {
    text-align: left;
  }
}
</style>
