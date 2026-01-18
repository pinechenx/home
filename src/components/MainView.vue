<script setup>
import { reactive, onMounted } from 'vue'
import siteConfig from '@/config/site.config.js'
import NameIcon from '@/components/icons/IconName.vue'
import GitHubIcon from '@/components/icons/IconGithub.vue'
import MailIcon from '@/components/icons/IconMail.vue'

const hitokotoData = reactive({
  text: 'Loading...',
  from: '無名',
})

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
    console.error(error)
  }
}

onMounted(() => {
  fetchHitokoto()
})
</script>
<template>
  <div class="content">
    <div class="left">
      <div class="welcome">
        <span style="margin-right: 10px">Hello I'm</span>
        <NameIcon />
      </div>
      <p class="text">👦 <span>Full Stack</span> Developer</p>
      <p class="text">📝 {{ hitokotoData.text }} -「 {{ hitokotoData.from }} 」</p>
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
      <div class="title">Projects</div>
      <div class="project-list">
        <div class="item" v-for="item in siteConfig.projects" :key="item.name">
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
      <div class="title">Skills</div>
      <div class="skills">
        <img class="skills-img1" width="100%" src="/images/icons/skills1.svg" alt="skills image" />
        <img class="skills-img2" width="100%" src="/images/icons/skills2.svg" alt="skills image" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content {
  margin-top: 120px;
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
      transition: color 0.3s ease, transform 0.3s ease;
      span {
        color: #747bff;
      }
    }
    .links {
      margin-top: 20px;
      width: 100%;
      display: flex;
      align-items: center;
      overflow-x: auto;
      .item {
        width: 49px;
        height: 43px;
        box-sizing: border-box;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-right: 10px;
        background: rgb(247 247 247);
        transition: background-color 0.3s ease, transform 0.2s ease;
        will-change: background-color, transform;
        transform: translateZ(0);
        &.github:hover {
          background-color: #151b23;
          fill: #fff;
        }
        &.mail:hover {
          background-color: rgba(0, 176, 255, 1);
          fill: #fff;
        }
        svg {
          width: 22px;
          height: 22px;
        }
      }
    }
  }
  .right {
    width: 100%;
    margin-top: 24px;
    .title {
      font-size: 2rem;
      color: #fff;
      font-family: sans-serif;
      margin-bottom: 30px;
      transition: transform 0.3s ease;
    }
    .project-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: calc(33.33% - 10px);
        margin-right: 15px;
        margin-bottom: 15px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        contain: layout style paint;
        &:nth-child(3n) {
          margin-right: 0;
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
            .name {
              font-size: 1.2rem;
              color: #000;
              font-family: sans-serif;
            }
            .desc {
              margin-top: 10px;
              font-size: 0.8rem;
              color: #494949;
              font-family: sans-serif;
            }
          }
        }
      }
    }
    .skills {
      transition: opacity 0.3s ease;
      contain: layout style paint;
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
    }
    .right {
      .title {
        font-size: 1.8rem;
      }
      .project-list {
        .item {
          width: calc(50% - 7.5px);
          &:nth-child(2n) {
            margin-right: 0;
          }
        }
      }
    }
  }
}
@media (max-width: 480px) {
  .content {
    .right {
      .title {
        font-size: 1.6rem;
      }
      .project-list {
        .item {
          width: 100%;
          margin-right: 0;
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
