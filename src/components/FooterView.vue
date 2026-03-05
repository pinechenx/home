<script setup>
import { ref, onMounted } from 'vue'
import siteConfig from '@/config/site.config.js'

const currentYear = ref(new Date().getFullYear())

onMounted(() => {
  // 更新年份
  currentYear.value = new Date().getFullYear()
})

const policeFilingUrl = siteConfig.policeFilingNumber
  ? `https://beian.mps.gov.cn/#/query/webSearch?code=${siteConfig.policeFilingNumber.match(/\d+/)[0]}`
  : ''
</script>
<template>
  <footer>
    <span class="text">Copyright © {{ currentYear }}</span>
    <span class="text hide2">Made by {{ siteConfig.author }}</span>
    <span class="text hide1" v-if="siteConfig.icpFilingNumber">
      <a class="link" href="https://beian.miit.gov.cn" target="_blank">{{ siteConfig.icpFilingNumber }}</a>
    </span>
    <span class="text" v-if="siteConfig.policeFilingNumber">
      <img class="icp-icon" src="https://s2.loli.net/2024/10/27/MaB9VmiEwrT1xje.png" alt="备案图标" />
      <a class="link" :href="policeFilingUrl" target="_blank">{{ siteConfig.policeFilingNumber }}</a>
    </span>
  </footer>
</template>
<style lang="scss" scoped>
footer {
  width: 100%;
  padding: 16px 10px;
  background: rgba(0, 0, 0, 0.15);
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  z-index: 1;
  white-space: nowrap;
  transition: opacity 0.3s ease;
  margin-top: auto;

  &:hover {
    opacity: 0.8;
  }

  .text {
    color: #fff;
    padding: 0 5px;

    .link {
      color: #fff;
      text-decoration: none;
      transition: opacity 0.3s ease;
      &:hover {
        opacity: 0.8;
        text-decoration: underline;
      }
    }

    .icp-icon {
      vertical-align: -3px;
      padding-right: 5px;
      border: 0;
    }
  }
}

@media (max-width: 768px) {
  .hide1 {
    display: none;
  }
}
@media (max-width: 480px) {
  .hide2 {
    display: none;
  }
  footer {
    flex-wrap: wrap;
    gap: 4px;
    .text {
      padding: 0 3px;
    }
  }
}
</style>
