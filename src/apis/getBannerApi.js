import http from "@/utils/http"
export function getBannerPic(params = {}) {
  // 默认为1 ，商品分类页为二
  const {distributionSite = '1'} = params
  return http({
    url:'/home/banner',
    params: {
      distributionSite
    }
  })
}