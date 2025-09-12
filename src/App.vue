<script setup>
import { onMounted } from 'vue'
import Loading from './components/Loading.vue'
import Wallpaper from './components/Wallpaper.vue'
onMounted(() => {
  // 控制台输出
  const styleTitle1 = 'font-size: 20px;font-weight: 600;color: rgb(244,167,89);'
  const styleTitle2 = 'font-size:12px;color: rgb(244,167,89);'
  const styleContent = 'color: rgb(30,152,255);'
  const title1 = '流明灵石的主页'
  const title2 = `

   ____  _   ______  __________  _________   __
  / __ \\/ | / / /\\ \\/ / ____/ / / / ____/ | / /
 / / / /  |/ / /  \\  / /   / /_/ / __/ /  |/ / 
/ /_/ / /|  / /___/ / /___/ __  / /___/ /|  /  
\\____/_/ |_/_____/_/\\____/_/ /_/_____/_/ |_/   

`
  const content = `更新日期：2025-09-01`
  console.info(`%c${title1} %c${title2} %c${content}`, styleTitle1, styleTitle2, styleContent)
})
</script>

<template>
  <Loading />
  <Wallpaper />
</template>

<style scoped></style>
