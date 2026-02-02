<script setup>
import { ref, onMounted, watch } from 'vue'
import { store } from '@/store/store.js'
import Wallpaper from './components/WallpaperView.vue'
import Main from './components/MainView.vue'
import Footer from './components/FooterView.vue'

const showMain = ref(false)

onMounted(() => {
  // 控制台输出
  const styleTitle = 'font-size:12px;color: rgb(244,167,89);'
  const styleContent = 'color: rgb(30,152,255);'
  const title = `
     ____  _   ______  __________  _________   __
    / __ \\/ | / / /\\ \\/ / ____/ / / / ____/ | / /
   / / / /  |/ / /  \\  / /   / /_/ / __/ /  |/ /
  / /_/ / /|  / /___/ / /___/ __  / /___/ /|  /
  \\____/_/ |_/_____/_/\\____/_/ /_/_____/_/ |_/
  `
  const content = `
  https://onlychen.cn

  https://github.com/pinechenx/home
  `
  console.info(` %c${title} %c${content}`, styleTitle, styleContent)
})

watch(
  () => store.imgLoaded,
  loaded => {
    if (loaded) {
      setTimeout(() => {
        showMain.value = true
      }, 900)
    }
  },
)
</script>
<template>
  <Wallpaper />
  <main v-if="showMain">
    <Main />
    <Footer />
  </main>
</template>
<style scoped>
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
  contain: layout style paint layout;
  animation: fade 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>
