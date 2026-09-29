import { reactive } from 'vue'

export const store = reactive({
  imgLoaded: false, // 壁纸资源就绪
  signWritten: false, // 入场签名书写完成
  reveal: false, // 壁纸就绪 + 签名写完，开始揭幕
  hitokoto: {
    text: 'Loading...',
    from: '無名',
    loading: false, // 一言加载中
  },
})

export const fetchHitokoto = async () => {
  if (store.hitokoto.loading) return
  store.hitokoto.loading = true
  try {
    const response = await fetch('https://v1.hitokoto.cn')
    if (!response.ok) {
      throw new Error(`error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    store.hitokoto.text = data.hitokoto
    store.hitokoto.from = data.from
  } catch (error) {
    store.hitokoto.text = '记录每一天的成长'
    store.hitokoto.from = '开发者'
    console.error(error)
  } finally {
    store.hitokoto.loading = false
  }
}

// 应用启动即提前请求，进入主页时一言已就绪
fetchHitokoto()
