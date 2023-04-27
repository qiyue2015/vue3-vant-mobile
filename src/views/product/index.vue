<script setup lang="ts">
import { ref } from 'vue'
import { queryProductCategories, queryProducts } from '@/api'

const query = ref({
  categoryId: 0,
  page: 1,
})

const active = ref(0)
const categories = ref([])
queryProductCategories().then(({ data }) => {
  categories.value = data
  categories.value.unshift({
    id: 0,
    name: '全部',
  })
})

const list = ref([])
const loading = ref(false)
const finished = ref(false)
const onLoad = () => {
  queryProducts(Object.assign({}, query.value)).then(({ data }) => {
    list.value = data
  })
}

const handleTabClick = ({ name }) => {
  const category = categories.value[name]
  query.value.categoryId = category.id
  query.value.page = 1
  list.value = []
  loading.value = false
  finished.value = false
}
</script>

<template>
  <div>
    <van-tabs v-model:active="active" sticky @click-tab="handleTabClick">
      <van-tab v-for="category in categories" :key="category.id" :title="category.name">
        <van-list class="product-list" :loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-row gutter="16">
            <van-col v-for="row in list" :key="row.id" :span="12" class="product-list__item">
              <router-link :to="{ name: 'ProductDetail', params: { id: row.id } }" class="img-wrapper">
                <van-image :src="row.image" width="100%" height="160" fit="cover" />
              </router-link>
              <router-link to="to" class="info-wrapper">
                <div class="title">
                  {{ row.name }}
                </div>
                <div class="price-box">
                  <span class="price">¥{{ row.price }}</span>
                  <span>{{ row.market_price }}</span>
                </div>
              </router-link>
            </van-col>
          </van-row>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="less" scoped>
.product-list {
  padding: 16px;

  &__item {
    min-height: 120px;
    margin-bottom: 16px;
  }

  .img-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    align-content: flex-start;
    flex-shrink: 0;
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    height: 160px;

    .img {
      width: 100%;
      height: 100%;
    }
  }

  .info-wrapper {
    position: relative;
    padding: 8px;
    background-color: #FFF;
    display: block;

    .title {
      margin-bottom: 8px;
    }

    .price-box {
      font-size: 12px;
      color: #666666;

      .price {
        font-size: 16px;
        color: red;
        margin-right: 8px;
      }
    }
  }
}
</style>
