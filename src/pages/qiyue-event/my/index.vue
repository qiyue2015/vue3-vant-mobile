<script setup lang="ts">
useHead({ title: '我报名的活动' })

const router = useRouter()

const active = ref('all')

onMounted(() => {
  const { query } = router.currentRoute.value
  active.value = query.key as string || 'all'
})
</script>

<template>
  <van-tabs v-model:active="active">
    <van-tab title="全部" name="all">
      内容 1
    </van-tab>
    <van-tab title="待参加" name="unattend">
      内容 2
    </van-tab>
    <van-tab title="待审核" name="pending">
      内容 3
    </van-tab>
  </van-tabs>
</template>

<style scoped lang="less">

</style>

<route lang="json5">
{
  name: 'QiyueEventMy',
  meta: {
    title: '我报名的活动',
    showNavbar: true,
    requiresAuth: true,
  },
}
</route>
