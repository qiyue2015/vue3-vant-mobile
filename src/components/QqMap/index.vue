<script setup lang="ts">
import { onMounted, watch } from 'vue'

// 定义组件的 props
const props = defineProps({
  item: Object,
})

let mapInstance = null

const initMap = () => {
  if (mapInstance)
    mapInstance.destroy()

  const TMap = (window as any).TMap // TMap地图实例
  const LatLng = TMap.LatLng // 用于创建经纬度坐标实例
  const center = new LatLng(props.item.latitude, props.item.longitude) // 设置中心点坐标

  // 初始化地图
  mapInstance = new TMap.Map('map-container', {
    center,
    zoom: 15,
    showControl: false,
    offset: {
      x: 0,
      y: 60,
    },
  })

  // 设置infoWindow
  const htmlTpl
    = '<div id="map-info-window">'
    + '   <div class="map-pop-wrapper">'
    + `         <img class="act-image" src="${props.item.images[0]}" />`
    + `         <div class="act-name van-multi-ellipsis--l2">${props.item.name}</div>`
    + '     </div>'
    + '</div>'

  /* eslint-disable no-new */
  new TMap.InfoWindow({
    map: mapInstance,
    position: center,
    content: htmlTpl,
    enableCustom: true,
    offset: {
      x: 0,
      y: -60,
    },
  })
}

onMounted(() => {
  initMap()
})

watch(() => props.item, () => {
  initMap()
})
</script>

<template>
  <div>
    <div id="map-container" class="map-area" />
  </div>
</template>
