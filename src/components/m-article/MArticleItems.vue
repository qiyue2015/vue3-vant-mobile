<script setup lang="ts">
import { useNavigation } from '@/composables/go'
import { queryQiyueProArticle } from '@/api/qiyue-pro'
import { setHistory } from '@/utils'

const props = defineProps<{ cid: string }>()

const { go } = useNavigation()

const { cid } = toRefs(props)
const list = ref([])
const loading = ref(false)
const finished = ref(false)
const params = reactive({
  current: 1,
  pageSize: 10,
  pcate: cid.value,
})

async function onLoad() {
  try {
    loading.value = true
    const res = await queryQiyueProArticle(params)
    if (res.data?.list) {
      list.value = list.value.concat(res.data.list)
    }
    if (res.data.list.length < params.pageSize) {
      finished.value = true
    }
  }
  finally {
    params.current++
    loading.value = false
  }
}

function onClickItem(item: any) {
  setHistory({ title: item.title, thumb: item.thumb, url: item.url })
  go(item.url)
}
</script>

<template>
  <van-list v-model:loading="loading" :finished="finished" @load="onLoad">
    <van-cell v-for="item in list" :key="item" @click="onClickItem(item)">
      <template #icon>
        <van-image :src="item.thumb" class="mr-12 h-60 w-80" fit="cover" lazy-load />
      </template>
      <template #title>
        <div class="van-multi-ellipsis--l2">
          {{ item.title }}
        </div>
      </template>
    </van-cell>
  </van-list>
</template>
