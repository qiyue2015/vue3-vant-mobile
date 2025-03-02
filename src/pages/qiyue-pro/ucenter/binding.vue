<script setup lang="ts">
import { type FieldRule, showNotify } from 'vant'
import { bindMobile, sendVerifyCode } from '@/api/user'
import router from '@/router'
import { useUserStore } from '@/stores'

const userStore = useUserStore()

const timer = ref<NodeJS.Timeout | null>(null)
const countDown = ref(0)

const loading = ref(false)
const postData = reactive({ receiver: '', code: '' })

const rules = reactive({
  receiver: [
    { required: true, message: '请输入手机号码' },
    { pattern: /^1\d{10}$/, message: '手机号码格式不正确' },
  ] as FieldRule[],
  code: [
    { required: true, message: '请输入验证码' },
    { pattern: /^\d{4}$/, message: '验证码格式错误' },
  ] as FieldRule[],
})

// 获取验证码按钮状态
const isGettingCode = ref(false)
const isCodeSent = ref(false)

const buttonText = computed(() => {
  return isGettingCode.value ? '获取中' : '获取验证码'
})

async function getCode() {
  if (!postData.receiver) {
    showNotify({
      type: 'warning',
      message: '请输入手机号',
    })
    return
  }

  try {
    isGettingCode.value = true
    const res = await sendVerifyCode(postData.receiver)
    if (res.errno === 0) {
      isCodeSent.value = true
      showNotify({
        type: 'success',
        message: '验证码已发送',
      })
    }
    countDown.value = 60
    timer.value = setInterval(() => {
      countDown.value--
      if (countDown.value === 0) {
        clearInterval(timer.value)
        timer.value = null
        isCodeSent.value = false
      }
    }, 1000)
  }
  finally {
    isGettingCode.value = false
  }
}

async function onSubmit(values: any) {
  try {
    loading.value = true
    const res = await bindMobile(values.receiver, values.code)
    if (res.errno === 0) {
      await userStore.info()
      showNotify({
        type: 'success',
        message: res.message || '绑定成功',
      })
      const { redirect } = router.currentRoute.value.query
      if (redirect) {
        await router.replace({
          path: decodeURIComponent(redirect as string),
        })
      }
      else {
        await router.replace({
          name: 'QiyueProHome',
        })
      }
    }
  }
  catch (e) {
    console.error(e.errno)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="m-x-a mt-32 w-7xl text-center">
    <van-form :model="postData" validate-trigger="onSubmit" @submit="onSubmit">
      <div class="overflow-hidden rounded-3xl">
        <van-field v-model="postData.receiver" :rules="rules.receiver" placeholder="请输入手机号码" name="receiver" clearable />
      </div>
      <div class="mt-16 overflow-hidden rounded-3xl">
        <van-field v-model="postData.code" :rules="rules.code" name="code" placeholder="请输入验证码">
          <template #button>
            <span v-if="isCodeSent" class="w-3xl text-center text-gray">{{ countDown }}</span>
            <van-button v-else size="mini" type="primary" plain @click="getCode">
              {{ buttonText }}
            </van-button>
          </template>
        </van-field>
      </div>
      <div class="mt-16">
        <van-button :loading="loading" type="primary" native-type="submit" round block>
          绑定账号
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped lang="less">

</style>

<route lang="json5">
{
  name: 'QiyueProUcenterBinding',
  meta: {
    title: '手机绑定',
    showNavbar: true,
    requiresAuth: true
  },
}
</route>
