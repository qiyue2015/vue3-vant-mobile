<script setup lang="ts">
import { showConfirmDialog, type UploaderFileListItem } from 'vant'
import { useUserStore } from '@/stores'
import router from '@/router'
import defaultAvatar from '@/assets/images/default-avatar.svg'
import { version } from '~root/package.json'
import { uploadFile } from '@/api'
import { updateAvatar, updateProfileIndex } from '@/api/user'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const showDialog = ref(false)
const formData = ref({
  nickname: userInfo.value.nickname,
  realname: userInfo.value.realname,
  gender: userInfo.value.gender,
  birth: {
    year: userInfo.value.birthyear,
    month: userInfo.value.birthmonth,
    day: userInfo.value.birthday,
  },
})

function onLogout() {
  showConfirmDialog({ title: '确认登出' }).then(() => {
    userStore.logout()
    router.push({
      name: 'QiyueProHome',
      params: {
        ...router.currentRoute.value.params,
      },
    })
  })
}

function updateProfile() {
  updateProfileIndex(formData.value).then(() => {
    userStore.info()
  })
}

function onProfileDialog() {
  showDialog.value = true
}

async function onAfterRead(file: UploaderFileListItem) {
  try {
    const formData = new FormData()
    formData.append('file', file.file)
    const { attachment } = await uploadFile(formData)
    await updateAvatar(attachment)
    await userStore.info()
  }
  finally {
    // Do something
  }
}
</script>

<template>
  <div class="p12">
    <van-space size="16px" direction="vertical" fill>
      <van-cell-group :inset="true">
        <van-cell center is-link>
          <template #icon>
            <van-image :src="userInfo.avatar || defaultAvatar" round class="mr-12 h-32 w-32" />
          </template>
          <template #value>
            <van-uploader name="file" :after-read="onAfterRead">
              上传头像
            </van-uploader>
          </template>
        </van-cell>
        <van-cell :title="formData.nickname" value="修改昵称" is-link @click="onProfileDialog" />
      </van-cell-group>
      <van-button type="primary" plain block @click="onLogout">
        退出登录
      </van-button>
    </van-space>
    <div class="mt-43 w-full text-center text-5xl text-gray">
      {{ $t("settings.currentVersion") }}: v{{ version }}
    </div>

    <van-dialog v-model:show="showDialog" title="修改昵称" show-cancel-button @confirm="updateProfile">
      <van-field v-model="formData.nickname" :rules="[{ required: true, message: '请填写昵称' }]" />
    </van-dialog>
  </div>
</template>

<route lang="json5">
{
  name: 'QiyueProUcenterProfile',
  meta: {
    title: '个人信息',
    requiresAuth: true
  },
}
</route>
