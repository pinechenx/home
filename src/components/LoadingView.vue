<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { store } from '@/store/store.js'
import DomainIcon from './icons/IconDomain.vue'

const iconRef = ref(null)
const written = ref(false)
let writeTimer = null

onMounted(() => {
  // 书写阶段结束（2.8s × 55%，对应 @keyframes write 的 55%）后标记完成，
  // 由 App 等壁纸就绪后一起揭幕；定时器不依赖 path 检测，避免图标异常时永久卡在加载页
  writeTimer = setTimeout(() => {
    store.signWritten = true
    // 冻结在写完的 55% 状态，保证揭幕淡出时签名是完整的
    written.value = true
  }, 1540)

  const path = iconRef.value?.$el?.querySelector('path')
  if (!path) return
  // 按真实路径长度描边，才能呈现完整的“手写”效果
  path.style.setProperty('--path-length', Math.ceil(path.getTotalLength()))
})

onUnmounted(() => {
  if (writeTimer) clearTimeout(writeTimer)
})
</script>
<template>
  <div class="loading">
    <div class="loading-cover"></div>
    <div class="loading-icon" :class="{ written }"><DomainIcon ref="iconRef" /></div>
  </div>
</template>
<style lang="scss" scoped>
.loading {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  contain: strict;

  .loading-cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    animation: fade-in 0.3s ease forwards;
  }

  .loading-icon {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    :deep(path) {
      stroke-dasharray: var(--path-length, 0 9999);
      stroke-dashoffset: var(--path-length, 0);
      fill: transparent;
      animation: write 2.8s ease-in-out infinite;
      stroke-width: 2px;
      stroke: white;
    }

    &.written :deep(path) {
      animation-play-state: paused;
    }
  }

  // 无障碍：系统开启“减弱动态效果”时直接呈现完整签名（全局规则会把动画压成 0.01ms 且无填充，
  // path 将回落到 dashoffset=全长的不可见状态）
  @media (prefers-reduced-motion: reduce) {
    .loading-icon :deep(path) {
      animation: none;
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes write {
  0% {
    stroke-dashoffset: var(--path-length, 0);
    opacity: 1;
  }
  55% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  80% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
}
</style>
