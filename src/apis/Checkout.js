import http from "@/utils/http"

export const checkOutAPI = () => {
  return http({
    url: '/member/order/pre'
  })
}