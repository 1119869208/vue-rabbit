import http from "@/utils/http"

// 订单详情接口
export const checkOutAPI = () => {
  return http({
    url: '/member/order/pre'
  })
}

// 订单支付接口
export const payOutAPI = (data) => {
  return http({
    url: '/member/order',
    method: 'POST',
    data
  })
}