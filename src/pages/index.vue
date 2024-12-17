<script setup lang="ts">
const router = useRouter()

onMounted(() => {
  router.replace({ name: 'QiyueProHome' })
})
</script>

<route lang="json5">
{
  name: 'home'
}
</route>
