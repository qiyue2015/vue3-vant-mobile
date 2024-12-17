<script setup lang="ts">
import { isWeixinBrowser } from '@/utils'

const route = useRoute()
const router = useRouter()

function onBack() {
  if (window.history.state.back)
    history.back()
  else
    router.replace({ name: 'QiyueEventHome' })
}

const { t } = useI18n()

const title = computed(() => {
  if (!route.meta)
    return ''

  return route.meta.i18n ? t(route.meta.i18n) : (route.meta.title || '')
})

const show = computed(() => {
  if (isWeixinBrowser()) {
    return false
  }

  return route.meta?.showNavbar
})
</script>

<template>
  <van-nav-bar
    v-if="show"
    :title="title"
    :fixed="true"
    :safe-area-inset-top="true"
    :placeholder="true"
    :left-arrow="true"
    left-text="返回"
    @click-left="onBack"
  />
</template>
