<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { store } from '@/store/store.js'

let imgUrl
// 本地图片
// imgUrl = '/images/bg1.jpg'

// bing每日图片
imgUrl = 'https://bing.ee123.net/img/'

let timer = null
// 开场遮罩层动画结束后卸载，释放全屏纹理显存
const veilDone = ref(false)

onMounted(() => {
  initImageLoad(Date.now())
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

const initImageLoad = async startTime => {
  try {
    const loader = new Image()
    loader.src = imgUrl
    // CDN 长时间无响应时超时降级揭幕，避免无限停留在加载页
    await Promise.race([
      loader.decode(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('wallpaper load timeout')), 8000)),
    ])
    handleLoadSuccess(startTime)
  } catch (error) {
    console.warn('背景图加载/解码失败，执行降级显示', error)
    handleLoadSuccess(startTime)
  }
}

const handleLoadSuccess = startTime => {
  // 壁纸解码就绪后仅标记状态；图片元素等揭幕时才挂载，
  // 避免签名播放期间壁纸突然插入导致背景明暗跳变
  const minWaitTime = 800
  const elapsed = Date.now() - startTime
  const delay = Math.max(0, minWaitTime - elapsed)

  timer = setTimeout(() => {
    store.imgLoaded = true
  }, delay)
}
</script>
<template>
  <!-- 双层交叉淡化：底层为最终态，顶层为模糊遮罩。两层滤镜均静止、只光栅化一次，
       动画仅涉及 opacity/transform，全程由合成器线程执行，避免逐帧重绘全屏 blur -->
  <img
    v-if="store.reveal"
    :src="imgUrl"
    class="bg-img"
    decoding="async"
    loading="eager"
    draggable="false"
    alt="wallpaper" />
  <img
    v-if="store.reveal && !veilDone"
    :src="imgUrl"
    class="bg-img bg-veil"
    decoding="async"
    loading="eager"
    draggable="false"
    alt=""
    aria-hidden="true"
    @animationend="veilDone = true" />
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
  // 覆盖全局 crisp-edges，保证缩放动画期间平滑采样
  image-rendering: auto;
  // 底层直接呈现最终态（清晰、提亮）；backwards 使延迟期间呈现起始放大帧
  filter: brightness(0.85);
  animation: bg-settle 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s backwards;

  // 顶层模糊遮罩：blur 静止只光栅化一次，动画期间仅淡出收拢
  &.bg-veil {
    filter: blur(10px) brightness(0.3);
    transform: translate3d(0, 0, 0) scale(1.2);
    animation: veil-out 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
  }
}

@keyframes bg-settle {
  from {
    transform: translate3d(0, 0, 0) scale(1.2);
  }
  to {
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes veil-out {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1.2);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(1);
  }
}
</style>
