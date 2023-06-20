import axios from "axios"
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'


// axios 基础的封装
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000,
})

// axios请求拦截器
http.interceptors.request.use(config => {
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
  // 统一错误提示
  ElMessage({ type: 'warning', message: e.response.data.message })
  return Promise.reject(e)

})

export default http