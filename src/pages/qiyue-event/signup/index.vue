<script setup lang="ts">
import type { FieldRule } from 'vant'
import { showToast } from 'vant'
import { useUserStore } from '@/stores'
import { qiyueEventSignup } from '@/api/qiyue-event'
import router from '@/router'

const userStore = useUserStore()

const loading = ref(false)
const postData = reactive({
  event_id: router.currentRoute.value.query.event_id,
  name: '',
  phone: '',
})

const rules = reactive({
  name: [
    { required: true, message: '请填写姓名' },
  ] as FieldRule[],
  phone: [
    { required: true, message: '请输入手机' },
  ] as FieldRule[],
})

async function onSubmit() {
  try {
    loading.value = true
    await qiyueEventSignup({ ...postData })
    showToast({ type: 'success', message: '报名信息提交成功' })
    router.replace({
      name: 'QiyueEventDetail',
      query: {
        id: postData.event_id,
      },
    })
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  postData.event_id = router.currentRoute.value.query.event_id
  postData.name = userStore.userInfo.realname
  postData.phone = userStore.userInfo.mobile
})
</script>

<template>
  <div class="p-16">
    <van-form required="auto" label-width="3.1em" @submit="onSubmit">
      <van-cell-group title="请填写报名信息" inset>
        <van-field v-model="postData.name" name="name" label="姓名" placeholder="请填写姓名" :rules="rules.name" />
        <van-field v-model="postData.phone" name="phone" label="手机" placeholder="请填写手机" :rules="rules.phone" />
      </van-cell-group>
      <div class="mt-20">
        <van-button :loading="loading" round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped lang="less">

</style>

<route lang="json5">
{
  name: 'QiyueEventSignup',
  meta: {
    title: '报名表单纯',
    showNavbar: true,
    requiresAuth: true,
  },
}
</route>
