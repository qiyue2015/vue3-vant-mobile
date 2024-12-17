<script setup lang="ts">
import { useNavigation } from '@/composables/go'

const props = defineProps<{
  params: {
    constraint: {
      hidden_title: boolean
      inset: boolean
      title: string
      type: number
    }
    items: any[]
  }
}>()

const { items, constraint } = toRefs(props.params)
const { go } = useNavigation()
</script>

<template>
  <van-cell-group v-if="items" :inset="constraint.inset">
    <template v-if="!constraint.hidden_title" #title>
      {{ constraint.title }}
    </template>
    <template v-if="items.length">
      <van-swipe :autoplay="3000" class="m-slide" lazy-render>
        <van-swipe-item v-for="(item, index) in items" :key="index" @click="go(item.url)">
          <van-image :src="item.thumb" class="m-slide_image" fit="cover" lazy-load />
        </van-swipe-item>
      </van-swipe>
    </template>
    <van-empty v-else :description="`暂无${constraint.title}数据`" image-size="64px" />
  </van-cell-group>
</template>

<style lang="less" scoped>
.m-slide {
  :deep(.van-swipe-item) {
    height: 160px;
  }

  .m-slide_image {
    width: 100%;
    height: 160px;
  }
}
</style>
