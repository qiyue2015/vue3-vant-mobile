<script setup lang="ts">
import { queryQiyueProLayout } from '@/api/qiyue-pro'

const loading = ref(true)
const layouts = ref([])

// 异步加载组件
function getComponent(key: string) {
  return defineAsyncComponent(() => import(`@/components/${key}/index.vue`))
}

onMounted(async () => {
  try {
    loading.value = true
    const layoutRes = await queryQiyueProLayout('home')
    layouts.value = layoutRes.data
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="p16">
    <van-skeleton class="mt-16" title :loading="loading" :row="3">
      <van-space direction="vertical" size="16px" fill>
        <component :is="getComponent(layout.key)" v-for="(layout, index) in layouts" :key="index" :params="layout" />
      </van-space>
    </van-skeleton>
  </div>
</template>

<route lang="json5">
{
  name: 'QiyueProHome',
  meta: {
    showTabbar: true,
    keepAlive: true,
  },
}
</route>
