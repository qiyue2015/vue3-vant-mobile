<script setup lang="ts">

</script>

<template>
  <div class="p-20">
    <van-space direction="vertical" size="16px" fill>
      <van-swipe class="h-md bg-blue" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
      </van-swipe>
      <div class="bg-blue">
        <van-grid :border="false">
          <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
        </van-grid>
      </div>
      <van-cell-group>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group>
    </van-space>
  </div>
</template>

<style scoped>

</style>

<route lang="json5">
{
  name: 'QiyuePro',
  meta: {
    title: '主页',
    showTabbar: true,
  },
}
</route>
