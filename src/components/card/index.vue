<script lang="ts">
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true,
    },
    moreText: {
      type: String,
      default: '更多',
    },
    moreLink: {
      type: String,
      default: null,
    },
  },
}
</script>

<template>
  <div class="card">
    <van-cell-group :border="false">
      <template #title>
        <div class="left-item" v-text="title" />
        <a v-if="moreLink" :href="moreLink">{{ moreText }}</a>
      </template>
      <slot />
    </van-cell-group>
  </div>
</template>

<style lang="less" scoped>
.card {
  background: var(--van-cell-group-background);
  margin: var(--van-cell-group-inset-padding);
  border-radius: var(--van-cell-group-inset-radius);
  overflow: hidden;
  min-height: 200px;

  ~ .card {
    margin-top: 16px;
  }

  :deep(.van-cell-group__title) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1;

    .left-item {
      font-size: 16px;
    }

    .right-item a {
      color: var(--van-cell-group-title-color);
    }
  }
}
</style>
