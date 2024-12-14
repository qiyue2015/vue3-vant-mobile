<script setup lang="ts">
const router = useRouter()

onMounted(() => {
  router.replace({ name: 'qiyue-pro' })
})
</script>

<route lang="json5">
{
  name: 'home',
  meta: {
    title: '主页',
  },
}
</route>
