import http from "@/utils/http"
export function getProductApi() {
    return http({
      url: '/home/goods'
    })
}