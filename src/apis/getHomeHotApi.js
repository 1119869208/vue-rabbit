import http from "@/utils/http"

export function getHomeHotList() {
  return http('/home/hot')
}