<script setup lang="ts">
import { take } from 'lodash-es'
import dayjs from 'dayjs'

import { ref } from 'vue'
import { queryActivities, queryArticles, queryProducts, queryStores } from '@/api'
// import { useStore } from '@/stores'

// const store = useStore()

const activities = ref<any>([])
const mapAct = ref<any>({})
const articles = ref<any>([])
const products = ref<any>([])
const stores = ref<any>([])
const location = ref<any>({
  latitude: '',
  longitude: '',
})

const currentDate = ref(dayjs())

const weekdays = computed(() => {
  const days = ['日', '一', '二', '三', '四', '五', '六']
  const dayIndex = currentDate.value.day()
  return [...days.slice(dayIndex), ...days.slice(0, dayIndex)]
})

const dates = computed(() => {
  const days = []
  let day = currentDate.value.startOf('week')
  for (let i = 0; i < 7; i++) {
    days.push(day)
    day = day.add(1, 'day')
  }
  return days
})

const fetchData = () => {
  queryActivities().then(({ data }) => {
    activities.value = take(data, 4)
    mapAct.value = data[0]
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    initMap()
  })
  queryArticles().then(({ data }) => {
    articles.value = data
  })
  queryProducts({}).then(({ data }) => {
    products.value = take(data, 6)
  })
  queryStores({}).then(({ data }) => {
    stores.value = take(data, 3)
  })
}

const initMap = () => {
  const TMap = (window as any).TMap // TMap地图实例
  const LatLng = TMap.LatLng // 用于创建经纬度坐标实例
  const center = new LatLng(39.908802, 116.397502) // 设置中心点坐标

  // 初始化地图
  const map = new TMap.Map('map-container', {
    center,
    zoom: 11,
    minZoom: 15,
    maxZoom: 18,
    showControl: false,
    viewMode: '2D',
    offset: { x: 0, y: 20 },
    baseMap: {
      type: 'vector',
    },
  })

  // 设置infoWindow
  const htmlTpl
    = '<div id="map-info-window">'
    + '   <div class="map-pop-wrapper">'
    + `         <img class="act-image" src="${mapAct.value.images[0]}" />`
    + `         <div class="act-name">${mapAct.value.name}</div>`
    + '     </div>'
    + '</div>'

  TMap.InfoWindow({
    map,
    position: center,
    content: htmlTpl,
    enableCustom: true,
    offset: { x: 0, y: -30 },
  })
}

onMounted(async () => {
  await fetchData()

  const wx = (window as any).wx
  wx.getLocation({
    type: 'gcj02',
    success(res) {
      location.value = res
    },
    cancel(error) {
      location.value = error
    },
  })

  return {
    currentDate,
    weekdays,
    dates,
  }
})
</script>

<template>
  <div class="container">
    <div class="header-area">
      <div class="sign-up-area" />
    </div>
    <Card title="活动日历" more-link="/activities" more-text="更多">
      <div class="activity-area">
        <div class="calendar">
          <div v-for="(day, index) in weekdays" :key="day" :class="{ selected: index === 0 }" class="calendar-item">
            {{ day }}<br>{{ dates[index].format('DD') }}
          </div>
        </div>
        <Activity :list="activities" />
      </div>
    </Card>

    <Card title="全市消费地图">
      <!-- 地图容器 -->
      <div class="consume-map-area">
        <div id="map-container" class="map-area" />
      </div>
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
    background: url('@/assets/banner.png');
    background-size: 100% 100%;
    border-radius: 4px;
  }
}

.products-area, .activity-area {
  padding: 0 16px;
}

.calendar {
  display: flex;
  margin-bottom: 16px;
  font-size: 14px;

  .selected {
    background-color: red;
    color: #FFF;
  }

  &-item {
    flex: 1;
    text-align: center;
    margin-left: 10px;
    background-color: #EBEDF0;
    padding: 8px 6px;
    border-radius: 4px;

    &:first-child {
      margin-left: 0;
    }
  }
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
    width: 160px;
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
      font-size: 12px;
    }
  }
}
</style>
