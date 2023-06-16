import http from "@/utils/http"
export function getBannerPic() {
  return http({
    url:'home/banner'
  })
}