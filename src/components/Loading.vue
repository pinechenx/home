<template>
  <div class="loading" :class="store.imgLoaded ? 'hide' : ''">
    <div class="loading-cover"></div>
    <div class="loading-icon"><DomainIcon /></div>
  </div>
</template>
<script setup>
import { store } from '@/store/store.js'
import DomainIcon from './icons/IconDomain.vue'
</script>
<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 1;

  &.hide {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .loading-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .loading-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    :deep(path) {
      stroke-dasharray: 2400;
      stroke-dashoffset: 2400;
      fill: transparent;
      animation: draw 3s linear infinite both;
      stroke-width: 2px;
      stroke: white;
    }
  }
}

@keyframes draw {
  0% {
    stroke-dashoffset: 1px;
    stroke-dasharray: 0 2400;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  45% {
    stroke-dasharray: 2400 0;
  }

  65% {
    stroke-dasharray: 2400 0;
  }
  95%,
  to {
    stroke-dasharray: 0 2400;
  }
}
</style>
