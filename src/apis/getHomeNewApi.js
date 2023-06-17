import http from "@/utils/http"
export const getHomeNewApi = () => {
  return http({
    url: "/home/new"
  })
}