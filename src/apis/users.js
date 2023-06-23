import http from '@/utils/http'

export const loginAPI = ({ account, password }) => {
  return http({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}

// 个人中心 猜您喜欢
export const getLikeListAPI = ({ limit = 4 }) => {
  return http({
    url: '/goods/relevant',
    params: {
      limit
    }
  })
}


// 我的订单接口
export const getUserOrder = (params) => {
  return http({
    url: '/member/order',
    method: 'GET',
    params
  })
}