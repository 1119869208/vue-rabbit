import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import '@/styles/common.scss'

// 导入懒加载插件
import { LazyPlus } from '@/directives/index.js'

// 导入需要全局注册的Components组件
import { componentPlugin } from '@/components/index.js'

// import { getCategoryAPI } from './apis/text'

// getCategoryAPI().then(res=>{
//   console.log(res);
// })

const app = createApp(App)
const pinia = createPinia()

// 用户数据持久化
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(LazyPlus)
app.use(componentPlugin)

app.mount('#app')


