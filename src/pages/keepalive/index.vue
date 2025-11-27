<script setup lang="ts">
defineOptions({
  name: 'KeepAlive',
})

const value = ref(0)
</script>

<template>
  <div class="text-sm space-y-2">
    <p>当前组件将会被缓存</p>
    <van-stepper v-model="value" />
  </div>
</template>

<route lang="json5">
{
  name: 'KeepAlive',
  meta: {
    keepAlive: true
  },
}
</route>
