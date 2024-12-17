<script setup lang="ts">
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
const active = ref(0)
</script>

<template>
  <van-cell-group :inset="constraint.inset">
    <template v-if="!constraint.hidden_title" #title>
      {{ constraint.title }}
    </template>
    <template v-if="items.length">
      <van-tabs v-model:active="active">
        <van-tab v-for="item in items" :key="item.id" :title="item.name">
          <MArticleItems :cid="item.id" />
        </van-tab>
      </van-tabs>
    </template>
    <van-empty v-else :description="`暂无${constraint.title}数据`" image-size="64px" />
  </van-cell-group>
</template>
