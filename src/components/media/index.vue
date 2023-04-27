<script lang="ts">
import type { PropType } from 'vue'

export interface MediaItem {
  id: number
  title: string
  cover: string
  external_link: string
  created_at: string
  // 其他属性
}

export default {
  name: 'Media',
  props: {
    list: {
      type: Array as PropType<MediaItem[]>, // 增加类型定义
      required: true,
    },
  },
  methods: {
    handleClick(row: any) {
      if (row.external_link)
        window.location.href = row.external_link
      else
        this.$router.push({ name: 'ArticleDetail', params: { id: row.id } })
    },
  },
}
</script>

<template>
  <div v-for="row in list" :key="row.id" class="media-box" @click="handleClick(row)">
    <van-image class="media-box_hd" :src="row.cover" fit="cover" />
    <div class="media-box_bd">
      <div class="media-box_title van-multi-ellipsis--l2">
        {{ row.title }}
      </div>
      <div class="media-box_info">
        {{ row.created_at }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.media-box {
  padding: 16px;
  position: relative;
  display: flex;
  align-items: center;

  &:before {
    content: " ";
    position: absolute;
    left: 16px;
    top: 0;
    right: 16px;
    height: 1px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.1);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }

  &:first-child {
    padding-top: 0;

    &:before {
      display: none;
    }
  }

  &_hd {
    margin-right: 16px;
    width: 80px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
  }

  &_bd {
    flex: 1;
    min-width: 0;
  }

  &_title {
    display: block;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.4;
    height: 44px;
    overflow: hidden;
  }

  &_info {
    font-size: 13px;
    color: #C8C9CC;
  }
}
</style>
