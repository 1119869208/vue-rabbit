import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/styles/common.scss'

// 导入懒加载插件
import { LazyPlus } from '@/directives/index.js'

// import { getCategoryAPI } from './apis/text'

// getCategoryAPI().then(res=>{
//   console.log(res);
// })

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(LazyPlus)

app.mount('#app')


