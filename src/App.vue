<script setup>
import { onMounted } from 'vue'
import { store } from '@/store/store.js'
import Loading from './components/Loading.vue'
import Wallpaper from './components/Wallpaper.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'

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
</script>
<template>
  <Wallpaper />
  <Transition name="fade" mode="out-in">
    <Loading v-if="!store.imgLoaded" />
    <main v-else>
      <Main />
      <Footer />
    </main>
  </Transition>
</template>
<style scoped>
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
</style>
