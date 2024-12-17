<script setup lang="ts">
import { routeWhiteList } from '@/config/routes'
import { isWeixinBrowser } from '@/utils'

const route = useRoute()
const router = useRouter()

function onBack() {
  if (window.history.state.back)
    history.back()
  else
    router.replace('/')
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

  return !routeWhiteList.includes(route.name)
})
</script>

<template>
  <van-nav-bar
    v-show="showLeftArrow"
    :title="title"
    :fixed="true"
    safe-area-inset-top
    placeholder
    @click-left="onBack"
  />
</template>
