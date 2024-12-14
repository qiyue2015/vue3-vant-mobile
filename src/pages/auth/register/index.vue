<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { FieldRule } from 'vant'
import { useUserStore } from '@/stores'
import vw from '@/utils/inline-px-to-vw'

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

const postData = reactive({
  email: '',
  code: '',
  nickname: '',
  password: '',
  confirmPassword: '',
})

const validatorPassword = (val: string) => val === postData.password

const rules = reactive({
  email: [
    { required: true, message: t('register.pleaseEnterEmail') },
  ],
  code: [
    { required: true, message: t('register.pleaseEnterCode') },
  ],
  nickname: [
    { required: true, message: t('register.pleaseEnterNickname') },
  ],
  password: [
    { required: true, message: t('register.pleaseEnterPassword') },
  ],
  confirmPassword: [
    { required: true, message: t('register.pleaseEnterConfirmPassword') },
    { required: true, validator: validatorPassword, message: t('register.passwordsDoNotMatch') },
  ] as FieldRule[],
})

async function register() {
  try {
    loading.value = true

    const res = await userStore.register()

    if (res.code === 0) {
      showNotify({ type: 'success', message: t('register.registerSuccess') })
      router.push({ name: 'login' })
    }
  }
  finally {
    loading.value = false
  }
}

const isGettingCode = ref(false)

const buttonText = computed(() => {
  return isGettingCode.value ? t('register.gettingCode') : t('register.getCode')
})

async function getCode() {
  if (!postData.email) {
    showNotify({ type: 'warning', message: t('register.pleaseEnterEmail') })
    return
  }

  isGettingCode.value = true
  const res = await userStore.getCode()
  if (res.code === 0) {
    showNotify({ type: 'success', message: `${t('register.sendCodeSuccess')}: ${res.result}` })
  }

  isGettingCode.value = false
}
</script>

<template>
  <div class="m-x-a mt-32 w-7xl text-center">
    <van-form :model="postData" :rules="rules" validate-trigger="onSubmit" @submit="register">
      <div class="overflow-hidden rounded-3xl">
        <van-field v-model.trim="postData.email" :rules="rules.email" :placeholder="t('register.email')" name="email" />
      </div>
      <div class="mt-16 overflow-hidden rounded-3xl">
        <van-field v-model.trim="postData.code" :rules="rules.code" :placeholder="t('register.code')" name="code">
          <template #button>
            <van-button size="small" type="primary" plain @click="getCode">
              {{ buttonText }}
            </van-button>
          </template>
        </van-field>
      </div>
      <div class="mt-16 overflow-hidden rounded-3xl">
        <van-field v-model.trim="postData.nickname" :rules="rules.nickname" :placeholder="t('register.nickname')" name="nickname" />
      </div>
      <div class="mt-16 overflow-hidden rounded-3xl">
        <van-field v-model.trim="postData.password" :rules="rules.password" :placeholder="t('register.password')" name="password" type="password" />
      </div>
      <div class="mt-16 overflow-hidden rounded-3xl">
        <van-field v-model.trim="postData.confirmPassword" :rules="rules.confirmPassword" :placeholder="t('register.comfirmPassword')" name="confirmPassword" type="password" />
      </div>
      <div class="mt-16">
        <van-button :loading="loading" type="primary" native-type="submit" round block>
          {{ $t('register.confirm') }}
        </van-button>
      </div>
    </van-form>
    <ghost-button to="login" block :style="{ 'margin-top': vw(16) }">
      {{ $t('register.backToLogin') }}
    </ghost-button>
  </div>
</template>

<route lang="json5">
{
  name: 'register',
  meta: {
    title: '注册'
  },
}
</route>
