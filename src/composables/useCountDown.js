import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  let timer = null
  // 响应式时间数
  const time = ref(0)
  // 格式化时间数
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  const start = (currentTime) => {
    // 开始倒计时逻辑
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }
  // 当组件销毁时的生命周期函数
  onUnmounted(() => {
    timer && clearInterval(timer)
  })
  return {
    formatTime,
    start
  }
}