<script setup>
import DomainIcon from './icons/IconDomain.vue'
</script>
<template>
  <div class="loading">
    <div class="loading-cover"></div>
    <div class="loading-icon"><DomainIcon /></div>
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
      stroke-dasharray: 200;
      stroke-dashoffset: 200;
      fill: transparent;
      animation: draw 1.5s ease-in-out infinite;
      stroke-width: 2px;
      stroke: white;
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

@keyframes draw {
  0% {
    stroke-dashoffset: 200;
    opacity: 0.3;
  }
  50% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  100% {
    stroke-dashoffset: -200;
    opacity: 0.3;
  }
}
</style>
