<script setup>
import { ref, onMounted, watch } from 'vue'
import { store } from '@/store/store.js'
import Loading from './components/LoadingView.vue'
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
  () => store.imgLoaded && store.signWritten,
  ready => {
    if (!ready) return
    // 壁纸就绪且签名写完，开始揭幕；主内容稍后淡入
    store.reveal = true
    setTimeout(() => {
      showMain.value = true
    }, 900)
  },
  { immediate: true },
)
</script>
<template>
  <Transition name="fade">
    <Loading v-if="!store.reveal" />
  </Transition>
  <Wallpaper />
  <div class="app-container" v-if="showMain">
    <Main />
    <Footer />
  </div>
</template>
<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
  padding: 15px 15px 0 15px;
  contain: layout style paint layout;
  animation: fade 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>
