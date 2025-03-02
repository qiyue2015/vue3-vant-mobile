<script setup lang="ts">
import { useUserStore } from '@/stores'
import { type FieldRule, showNotify } from 'vant'
import { loginByVerifyCode, sendVerifyCode } from '@/api/user'
import router from '@/router'

const userStore = useUserStore()
const [loading, setLoading] = useToggle(false)
const timer = ref<NodeJS.Timeout | null>(null)
const countDown = ref(0)
const isGettingCode = ref(false)
const isCodeSent = ref(false)
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

const buttonText = computed(() => {
  return isGettingCode.value ? '获取中' : '获取验证码'
})

async function onSubmit(values: any) {
  try {
    setLoading(true)
    const res = await loginByVerifyCode(values.receiver, values.code)
    await userStore.info()
    showNotify({
      type: 'success',
      message: res.message || '登录成功',
    })
    const { redirect } = router.currentRoute.value.query
    if (redirect) {
      // router 不会携带 redirect 中的 query 参数，所以使用 window.location.replace
      const url = decodeURIComponent(redirect as string)
      window.location.replace(url)
    }
    else {
      await router.replace({ name: 'QiyueProHome' })
    }
  }
  finally {
    loading.value = false
  }
}

async function getCode() {
  if (!postData.receiver) {
    showNotify({
      type: 'warning',
      message: '请输入手机号',
    })
    return
  }

  // 验证是否11位手机号
  if (!/^1\d{10}$/.test(postData.receiver)) {
    showNotify({
      type: 'warning',
      message: '手机号码格式不正确',
    })
    return
  }

  try {
    isGettingCode.value = true
    isCodeSent.value = true
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
</script>

<template>
  <van-form :model="postData" validate-trigger="onSubmit" @submit="onSubmit">
    <van-space direction="vertical" fill>
      <van-cell-group inset>
        <van-field v-model="postData.receiver" :rules="rules.receiver" placeholder="请输入手机号码" name="receiver" clearable />
      </van-cell-group>
      <van-cell-group inset>
        <van-field v-model="postData.code" :rules="rules.code" name="code" placeholder="请输入验证码">
          <template #button>
            <div v-if="isCodeSent" class="min-w-72 text-center text-gray">
              {{ countDown }}
            </div>
            <div v-else class="min-w-72 cursor-pointer text-center color-blue" @click="getCode">
              {{ buttonText }}
            </div>
          </template>
        </van-field>
      </van-cell-group>
      <div class="mt-16">
        <van-button :loading="loading" type="primary" native-type="submit" round block>
          登录
        </van-button>
      </div>
    </van-space>
  </van-form>
</template>

<style scoped lang="less">

</style>
