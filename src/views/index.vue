<script setup lang="ts">
import { take } from 'lodash-es'
import { queryActivities, queryArticles, queryBanners, queryProducts, queryStores } from '@/api'

const banners = ref<any>([])
const activities = ref<any>([])
const mapAct = ref<any>(null)
const articles = ref<any>([])
const products = ref<any>([])
const stores = ref<any>([])

function handleDateSelected(dateString) {
  queryActivities({ beginTime: dateString }).then(({ data }) => {
    activities.value = take(data, 4)
    mapAct.value = data[0]
  })
}

// 一共有多少个活动
let index = 0
const onClickMap = () => {
  const actNum = activities.value.length
  index = (index + 1) % actNum
  mapAct.value = activities.value[index]
}

const fetchData = () => {
  queryBanners().then(({ data }) => {
    banners.value = data
  })
  queryProducts({}).then(({ data }) => {
    products.value = take(data, 6)
  })
  queryStores({}).then(({ data }) => {
    stores.value = take(data, 3)
  })
  queryArticles().then(({ data }) => {
    articles.value = data
  })
}

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <div class="container">
    <div class="header-area">
      <van-swipe class="sign-up-area" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="image in banners" :key="image">
          <van-image :src="image" width="100%" height="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <Card title="活动日历" more-link="/activities" more-text="更多">
      <div v-if="activities" class="activity-area">
        <Calendar @date-selected="handleDateSelected" />
        <Activity :list="activities" style="margin-top: 16px" />
      </div>
    </Card>

    <Card v-if="mapAct" title="全市消费地图">
      <template #more-text>
        <van-button type="default" size="mini" @click="onClickMap">
          换一换
        </van-button>
      </template>
      <QqMap :item="mapAct" class="consume-map-area" />
    </Card>

    <Card title="好店推荐" more-link="/stores">
      <Store :list="stores" />
    </Card>

    <Card title="电商好货" more-link="/products">
      <div class="products-area">
        <Product :list="products" />
      </div>
    </Card>

    <Card title="区县动态" more-link="/articles">
      <Media :list="articles" />
    </Card>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  padding-top: 16px;
  padding-bottom: 32px;
  position: relative;

  .header-area {
    margin-bottom: 16px;
  }

  .sign-up-area {
    width: 343px;
    height: 190px;
    margin: 0 auto;
    background-size: 100% 100%;
    border-radius: 4px;
  }
}

.products-area, .activity-area {
  padding: 0 16px;
}

.consume-map-area {
  padding-left: 14px;
  padding-right: 14px;
  padding-bottom: 16px;
}

:deep(.map-area) {
  height: 180px;

  canvas {
    border-radius: 4px;
  }

  div > .logo-text, div > a {
    display: none;
  }

  .map-pop-wrapper {
    width: 10em;
    background: #fff;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    box-sizing: border-box;
    text-align: center;
    padding: 8px;

    .act-image {
      width: 100%;
    }

    .act-name {
      width: 100%;
      font-size: .75em;
    }
  }
}
</style>
