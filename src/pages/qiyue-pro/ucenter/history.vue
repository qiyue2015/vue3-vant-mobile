<script setup lang="ts">
import { getHistory } from '@/utils'

const list = ref([])
onMounted(() => {
  list.value = getHistory()
})
</script>

<template>
  <van-cell-group class="pt-12" :border="false">
    <van-cell v-for="item in list" :key="item.url" :title="item.title" :url="item.url" center is-link>
      <template #icon>
        <van-image :src="item.thumb" class="mr-12 h-60 w-80" fit="cover" lazy-load />
      </template>
      <template #title>
        <div class="van-multi-ellipsis--l2">
          {{ item.title }}
        </div>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<style scoped lang="less">

</style>

<route lang="json5">
{
  name: 'QiyueProUcenterHistory',
  meta: {
    title: '会员中心',
    showTabbar: true,
  },
}
</route>
