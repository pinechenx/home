<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { store } from '@/store/store.js'
import Loading from './LoadingView.vue'

let imgUrl
// 本地图片
// imgUrl = '/images/bg1.jpg'

// bing每日图片
imgUrl = 'https://bing.ee123.net/img/'

// 动画播放时间
const startTime = ref(0)
const activeWallpaper = ref('')
let timer = null

onMounted(() => {
  startTime.value = Date.now()
  initImageLoad()
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

const initImageLoad = async () => {
  try {
    const loader = new Image()
    loader.src = imgUrl
    await loader.decode()
    handleLoadSuccess()
  } catch (error) {
    console.warn('背景图加载/解码失败，执行降级显示', error)
    handleLoadSuccess()
  }
}

const handleLoadSuccess = () => {
  const time = Date.now() - startTime.value
  const minWaitTime = 800
  const delay = time < minWaitTime ? minWaitTime - time : 0

  timer = setTimeout(() => {
    activeWallpaper.value = imgUrl
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        store.imgLoaded = true
      })
    })
  }, delay)
}
</script>
<template>
  <Loading v-show="!store.imgLoaded" />
  <img
    v-if="activeWallpaper"
    :src="activeWallpaper"
    class="bg-img"
    :class="{ 'animate': store.imgLoaded }"
    decoding="async"
    loading="eager"
    draggable="false"
    alt="wallpaper" />
</template>
<style lang="scss" scoped>
.bg-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
  backface-visibility: hidden;
  transform: translateZ(0) scale(1.2);
  filter: blur(10px) brightness(0.3);
  will-change: transform, filter;

  &.animate {
    animation: fade-blur-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    animation-delay: 0.2s;
  }
}
</style>
