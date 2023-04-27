<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { queryProductDetail } from '@/api'

const router = useRouter()
const route = useRoute()
const id = route.params.id

interface ProductInfo {
  id: number
  name: string
  price: number
  buy_link: string
}

const info = ref<ProductInfo | null>(null)

queryProductDetail(id).then(({ data }) => {
  info.value = data
})

const onClickIcon = (name) => {
  router.replace({ name })
}

const onClickButton = () => {
  window.location.replace(info.value.buy_link)
}
</script>

<template>
  <div v-if="info">
    <div class="mod-slider">
      <van-image :src="info.image" width="375" height="375" fit="cover" />
    </div>
    <div class="buy-area">
      <div class="price-wrap">
        <span class="price">¥ <em>{{ info.price }}</em></span>
        <span class="double-price">市场价：¥ {{ info.market_price }}</span>
      </div>
      <h1 class="goods-name" v-text="info.name" />
    </div>
    <div class="goods-info" v-html="info.content" />
    <van-action-bar>
      <van-action-bar-icon icon="home-o" text="首页" @click="onClickIcon('Home')" />
      <van-action-bar-icon icon="chat-o" text="活动" @click="onClickIcon('ActivityIndex')" />
      <van-action-bar-icon icon="shop-o" text="好店" @click="onClickIcon('StoreIndex')" />
      <van-action-bar-button type="danger" text="前去购买" @click="onClickButton" />
    </van-action-bar>
  </div>
</template>

<style lang="less" scoped>
.mod-slider {
  width: 375px;
  height: 375px;
  overflow: hidden;
}

.buy-area {
  padding: 12px 18px;
  background-color: #FFF;

  .price-wrap {
    position: relative;
    margin-bottom: 12px;

    .price {
      color: #f2270c;
      display: inline-block;
      margin-right: 10px;

      i, em {
        font-style: normal;
        font-size: 30px;
        line-height: 30px;
      }
    }

    .price-decimals {
      font-size: 18px;
      color: #262626;
    }
  }
}

.goods-name {
  font-size: 18px;
  align-items: center;
  display: flex;
  margin: 0;
}

.goods-info {
  margin-top: 10px;
  padding: 12px 18px;
  background-color: #FFFFFF;
}
</style>

