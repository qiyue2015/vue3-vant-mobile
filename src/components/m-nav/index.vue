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
</script>

<template>
  <van-cell-group v-if="items" :inset="constraint.inset">
    <template v-if="!constraint.hidden_title" #title>
      {{ constraint.title }}
    </template>
    <template v-if="items.length">
      <van-grid :border="false" :column-num="4" class="nav-grid">
        <van-grid-item v-for="(row, index) in items" :key="index" :text="row.name" :icon="row.icon" :url="row.url" />
      </van-grid>
    </template>
    <van-empty v-else :description="`暂无${constraint.title}数据`" image-size="64px" />
  </van-cell-group>
</template>

<style lang="less" scoped>
.van-grid {
  --van-grid-item-content-padding: 12px 0;
  --van-grid-item-icon-size: 38px;
}
</style>
