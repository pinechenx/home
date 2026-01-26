<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { store } from '@/store/store.js'

const wallpaper = ref('')
// 本地图片
// wallpaper.value = '/images/bg1.jpg'

// bing每日图片
wallpaper.value = 'https://bing.ee123.net/img/'

// 随机二次元图片
// wallpaper.value = 'https://www.loliapi.com/acg/pc/'

// 动画播放时间
const startTime = ref(0)
const imgRef = ref(null)
let timer = null

onMounted(() => {
  startTime.value = Date.now()
  if (imgRef.value) {
    initImageLoad()
  }
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

const initImageLoad = async () => {
  try {
    const img = imgRef.value
    if (img.complete) {
      await img.decode()
    } else {
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })
      await img.decode()
    }

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
    store.imgLoaded = true
  }, delay)
}
</script>
<template>
  <div class="container" :class="{ 'show': store.imgLoaded }">
    <img
      ref="imgRef"
      :src="wallpaper"
      class="bg-img"
      :class="{ 'animate': store.imgLoaded }"
      decoding="async"
      loading="eager"
      draggable="false"
      alt="wallpaper" />
    <div class="cover"></div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  transition: opacity 0.25s ease;
  opacity: 0;
  contain: strict;
  will-change: opacity;
  transition: opacity 0.5s ease;

  &.show {
    opacity: 1;
  }

  .bg-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    backface-visibility: hidden;
    transform: translateZ(0) scale(1.2);
    isolation: isolate;
    filter: blur(10px) brightness(0.3);
    will-change: transform, filter, opacity;

    &.animate {
      will-change: transform, filter, opacity;
      animation: fade-blur-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      animation-delay: 0.36s;
    }
  }

  .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(#0000, #00000080), radial-gradient(#0000 33%, #0000004d 166%);
    contain: layout style paint;
    pointer-events: none;
  }
}
</style>
