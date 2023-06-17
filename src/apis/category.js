import http from "@/utils/http"
export function getCategoryApi(id) {
  return http({
    url: '/category',
    params: {
      id
    }
  })
}