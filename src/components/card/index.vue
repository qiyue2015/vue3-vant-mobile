<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true,
    },
    moreText: {
      type: String,
      default: 'More',
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
    <!-- <div class="card"> -->
    <!--  <div class="card-header"> -->
    <!--    <div class="title" v-text="title" /> -->
    <!--    <a v-if="moreLink" :href="moreLink">{{ moreText }}</a> -->
    <!--  </div> -->
    <!--  <div class="card-body"> -->
    <!--    <slot /> -->
    <!--  </div> -->
    <!-- </div> -->
    </van-cell-group>
  </div>
</template>

<style lang="less" scoped>
.card {
  background: var(--van-cell-group-background);
  margin: var(--van-cell-group-inset-padding);
  border-radius: var(--van-cell-group-inset-radius);
  overflow: hidden;

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
      color: #333;
    }
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--van-cell-group-title-padding);
  padding-bottom: 0;
  color: var(--van-cell-group-title-color);
  font-size: var(--van-cell-group-title-font-size);
  line-height: var(--van-cell-group-title-line-height);
}

.card-body {
  background: var(--van-cell-group-background);
  margin: var(--van-cell-group-inset-padding);
  border-radius: var(--van-cell-group-inset-radius);
  overflow: hidden;
}
</style>
