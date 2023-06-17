import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useIntersectionObserver } from '@vueuse/core'

import App from './App.vue'
import router from './router'

import '@/styles/common.scss'

// import { getCategoryAPI } from './apis/text'

// getCategoryAPI().then(res=>{
//   console.log(res);
// })

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

app.directive('img-lazy', {
  mounted(el,binding) {
    // console.log(el,binding)
    useIntersectionObserver(
      // el为标签源于
      el,

      // 检测图片是否到了视口高度，到了视口高度自动获取服务器图片链接 isIntersecting 为 布尔值
      ([{ isIntersecting }]) => {
        // console.log(isIntersecting);
        if(isIntersecting) {
          el.src = binding.value
        }
      },
    )
  }
})
