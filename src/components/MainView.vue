<script setup>
import { reactive, onMounted, ref } from 'vue'
import siteConfig from '@/config/site.config.js'
import NameIcon from '@/components/icons/IconName.vue'
import GitHubIcon from '@/components/icons/IconGithub.vue'
import MailIcon from '@/components/icons/IconMail.vue'

const hitokotoData = reactive({
  text: 'Loading...',
  from: '無名',
})
const isLoading = ref(true)
const projectsVisible = ref(false)
const skillsVisible = ref(false)

const fetchHitokoto = async () => {
  try {
    const response = await fetch('https://v1.hitokoto.cn')
    if (!response.ok) {
      throw new Error(`error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    hitokotoData.text = data.hitokoto
    hitokotoData.from = data.from
  } catch (error) {
    hitokotoData.text = '记录每一天的成长'
    hitokotoData.from = '开发者'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchHitokoto()
  // 项目卡片入场动画
  setTimeout(() => {
    projectsVisible.value = true
  }, 300)
  setTimeout(() => {
    skillsVisible.value = true
  }, 500)
})
</script>
<template>
  <div class="content">
    <div class="left">
      <div class="welcome">
        <span style="margin-right: 10px">Hello I'm</span>
        <NameIcon />
      </div>
      <p class="text">Full Stack Developer</p>
      <p class="text hitokoto" :class="{ loading: isLoading }">
        <span v-if="!isLoading">📝</span>
        {{ hitokotoData.text }} -「 {{ hitokotoData.from }} 」
      </p>
      <div class="links">
        <a class="item github" :href="siteConfig.github" target="_blank">
          <GitHubIcon />
        </a>
        <a class="item mail" :href="siteConfig.mail" target="_blank">
          <MailIcon />
        </a>
      </div>
    </div>
    <div class="right">
      <div class="title" :class="{ visible: projectsVisible }">Projects</div>
      <div class="project-list">
        <div
          class="item"
          v-for="(item, index) in siteConfig.projects"
          :key="item.name"
          :class="{ visible: projectsVisible }"
          :style="{ transitionDelay: `${index * 0.1}s` }"
        >
          <a class="list" :href="item.url" target="_blank">
            <div class="text">
              <div class="name">{{ item.name }}</div>
              <div class="desc">{{ item.desc }}</div>
            </div>
            <div class="icon" v-if="item.icon">
              <img :src="item.icon" alt="" />
            </div>
          </a>
        </div>
      </div>
      <div class="title" :class="{ visible: skillsVisible }">Skills</div>
      <div class="skills" :class="{ visible: skillsVisible }">
        <img class="skills-img1" width="100%" src="/images/icons/skills1.svg" alt="skills image" />
        <img class="skills-img2" width="100%" src="/images/icons/skills2.svg" alt="skills image" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content {
  margin-top: 80px;
  .left {
    width: 100%;
    padding-right: 10px;
    .welcome {
      display: flex;
      align-items: center;
      font-size: 2rem;
      color: #fff;
      stroke-width: 2px;
      stroke: white;
      font-family: sans-serif;
      white-space: nowrap;
      margin-bottom: 15px;
    }
    .text {
      font-size: 1.4rem;
      color: #fff;
      font-family: sans-serif;
      transition:
        color 0.3s ease,
        transform 0.3s ease;
      &.hitokoto {
        &.loading {
          opacity: 0.5;
        }
      }
    }
    .links {
      margin-top: 20px;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      .item {
        width: 49px;
        height: 43px;
        box-sizing: border-box;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: rgb(247 247 247);
        transition:
          background-color 0.3s ease,
          transform 0.2s ease;
        will-change: background-color, transform;
        transform: translateZ(0);
        svg {
          width: 22px;
          height: 22px;
          transition: fill 0.3s ease, stroke 0.3s ease;
        }
        &.github:hover {
          background-color: #151b23;
          svg {
            fill: #fff;
            stroke: #fff;
          }
        }
        &.mail:hover {
          background-color: rgba(0, 176, 255, 1);
          svg {
            fill: #fff;
            stroke: #fff;
          }
        }
      }
    }
  }
  .right {
    width: 100%;
    .title {
      margin: 24px 0 16px 0;
      font-size: 2rem;
      color: #fff;
      font-family: sans-serif;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.5s ease, transform 0.5s ease;
      &.visible {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .project-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      .item {
        width: calc(33.33% - 10px);
        opacity: 0;
        transform: translateY(20px);
        transition:
          opacity 0.4s ease,
          transform 0.4s ease,
          box-shadow 0.3s ease;
        &.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .list {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #f7f7f7;
          border-radius: 8px;
          padding: 15px;
          text-decoration: none;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
          will-change: transform, box-shadow;
          transform: translateZ(0);
          &:hover {
            box-shadow: 0 8px 16px -4px #2c2d300c;
            transform: translateY(-2px) translateZ(0);
          }
          .text {
            flex: 1;
            .name {
              font-size: 1.2rem;
              color: #000;
              font-family: sans-serif;
            }
            .desc {
              margin-top: 6px;
              font-size: 0.8rem;
              color: #494949;
              font-family: sans-serif;
            }
          }
          .icon {
            margin-left: 10px;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
    .skills {
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
      contain: layout style paint;
      &.visible {
        opacity: 1;
        transform: translateY(0);
      }
      .skills-img1 {
        display: block;
      }
      .skills-img2 {
        display: none;
      }
    }
  }
}
@media (max-width: 768px) {
  .content {
    .left {
      .text {
        font-size: 1.2rem;
      }
      .welcome {
        font-size: 1.6rem;
      }
    }
    .right {
      .title {
        font-size: 1.8rem;
      }
      .project-list {
        .item {
          width: calc(50% - 7.5px);
        }
      }
    }
  }
}
@media (max-width: 480px) {
  .content {
    .left {
      .welcome {
        font-size: 1.4rem;
        flex-wrap: wrap;
      }
      .text {
        font-size: 1.1rem;
      }
    }
    .right {
      .title {
        font-size: 1.6rem;
      }
      .project-list {
        .item {
          width: 100%;
          margin-right: 0;
          .list {
            height: auto;
            min-height: 80px;
          }
        }
      }
      .skills {
        .skills-img1 {
          display: none;
        }
        .skills-img2 {
          display: block;
        }
      }
    }
  }
}
</style>
