<script setup lang="ts">
import { useToggle } from '@vant/use'
import { useUserStore } from '@/stores'
import { bindOperator } from '@/api/qiyue-event'

const userStore = useUserStore()
const [state, toggle] = useToggle(false)

const loading = ref(false)
const postData = reactive({
  name: userStore.userInfo.realname,
})
const rules = reactive({
  name: [{ required: true, message: '请输入姓名' }],
})

async function onSubmit(values: any) {
  try {
    loading.value = true
    const res = await bindOperator(values)
    if (res.errno === 0) {
      toggle(true)
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="h-screen w-full bg-white p-16">
    <template v-if="state">
      <div class="text-center">
        <van-icon name="checked" size="3rem" class="my-32 color-green" />
        <div class="my-12 text-7xl">
          提交成功
        </div>
        <div class="text-6xl text-gray">
          请等待管理员审核
        </div>
      </div>
    </template>
    <template v-else>
      <van-form :model="postData" class="w-full" validate-trigger="onSubmit" @submit="onSubmit">
        <van-cell-group title="绑定操作员" inset>
          <van-field v-model="postData.name" :rules="rules.name" placeholder="请输入姓名" name="name" left-icon="user" clearable />
        </van-cell-group>
        <div class="mt-16">
          <van-button :loading="loading" type="primary" native-type="submit" round block>
            绑定
          </van-button>
        </div>
      </van-form>
    </template>
  </div>
</template>

<route lang="json5">
{
  name: 'QiyueEventOperatorBinding',
  meta: {
    title: '操作员绑定',
    showNavbar: true,
    requiresAuth: true,
  },
}
</route>
