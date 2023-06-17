import { useIntersectionObserver } from '@vueuse/core'
export const LazyPlus = {
  install(app) {
    app.directive('img-lazy', {
      mounted(el,binding) {
        // console.log(el,binding)
        const { stop } = useIntersectionObserver(
          // el为标签源于
          el,
    
          // 检测图片是否到了视口高度，到了视口高度自动获取服务器图片链接 isIntersecting 为 布尔值
          ([{ isIntersecting }]) => {
            // console.log(isIntersecting);
            if(isIntersecting) {
              el.src = binding.value
              stop()
            }
          },
        )
      }
    })
  }
}