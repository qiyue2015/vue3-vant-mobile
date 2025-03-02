<script setup lang="ts">
import { queryQiyueEventList } from '@/api/qiyue-event'

const props = defineProps<{
  params: {
    constraint: {
      hidden_title: boolean
      inset: boolean
      title: string
    }
    items: any[]
  }
}>()

const { constraint } = toRefs(props.params)

const active = ref(1)
const total = ref(0)

const list = ref([])
const loading = ref(false)
const isEmpty = ref(false)

async function onLoad() {
  try {
    loading.value = true
    const { data } = await queryQiyueEventList()
    if (data.list.length === 0) {
      isEmpty.value = true
    }
    else {
      list.value = data.list
      total.value = data.list.length
    }
  }
  finally {
    loading.value = false
  }
}

function onChange(index: number) {
  active.value = index + 1
}

onMounted(() => {
  onLoad()
})
</script>

<template>
  <div class="m-cell-group--wrapper" :class="{ inset: constraint.inset }">
    <van-cell-group :inset="constraint.inset">
      <template v-if="!constraint.hidden_title" #title>
        <div>{{ constraint.title }}</div>
        <div v-if="total">
          {{ active }}/{{ total }}
        </div>
      </template>
      <van-empty v-if="isEmpty" :description="`暂无${constraint.title}数据`" image-size="64px" />
      <div v-else class="event-card">
        <van-swipe class="h-90" :looo="false" :show-indicators="false" @change="onChange">
          <van-swipe-item v-for="(item, index) in list" :key="index">
            <van-cell :to="{ name: 'QiyueEventDetail', query: { id: item.id } }">
              <template #icon>
                <van-image :src="item.logo" class="mr-12 h-90 w-130" fit="cover" lazy-load />
              </template>
              <template #title>
                <div class="h-full flex flex-col justify-between">
                  <div class="van-multi-ellipsis text-15 font-bold">
                    {{ item.title }}
                  </div>
                  <div>
                    <div class="item-info van-ellipsis text-12">
                      {{ item.address }}
                    </div>
                    <div class="item-info van-ellipsis flex justify-between text-12">
                      <span>{{ item.date_str }}</span>
                      <span class="btn-signup">立即报名</span>
                    </div>
                  </div>
                </div>
              </template>
            </van-cell>
          </van-swipe-item>
        </van-swipe>
      </div>
    </van-cell-group>
  </div>
</template>

<style lang="less" scoped>
.m-cell-group--wrapper {
  background: var(--van-cell-group-background);

  &.inset {
    border-radius: var(--van-cell-group-inset-radius);
    overflow: hidden;
  }
}

:deep(.van-cell-group__title) {
  display: flex;
  justify-content: space-between;
}

.event-card {
  padding: 0 var(--van-padding-md) var(--van-padding-md);

  .van-image {
    border-radius: var(--van-radius-md);
    overflow: hidden;
  }

  .item-info {
    width: 175px;
    color: var(--van-gray-7);
    line-height: 1.8;

    .btn-signup {
      color: var(--van-tabbar-item-active-color);
    }
  }
}

.van-cell {
  padding: 0;
}
</style>
