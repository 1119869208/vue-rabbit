import axios from "axios"
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user.js'
import router from '@/router'


// axios 基础的封装
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000,
})

// axios请求拦截器
http.interceptors.request.use(config => {
  // 为什么要拼接接口的健全呢
  // 你需要告诉我你有token，我才能把数据提供给你，
  // 因为有很多接口，所以需要在请求拦截器里去配置 一次配置，都可以生效 拼接 Beare + 空格 + token值
  const UserStore = useUserStore()
  const token = UserStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
  // 统一错误提示
  ElMessage({ type: 'warning', message: e.response.data.message })

  // 报错401token失效 token失效不能在请求数据了 所以要实现下面功能
  const UserStore = useUserStore()

  if (e.response.status === 401) {
    // 1、清除本地数据
    UserStore.clearUserInfo()
    // 2、跳转到登录页
    router.push('/login')
  }

  return Promise.reject(e)


})

export default http