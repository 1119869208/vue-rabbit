import http from "@/utils/http"

// 加入购物车
export const insertCartAPI = ({ skuId, count }) => {
  return http({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

// 获取最新-购物车列表
export const findNewCartAPI = () => {
  return http({
    url: '/member/cart',
  })
}


// 删除购物车列表
export const eleCartAPI = (ids) => {
  return http({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}


// 未登录时添加商品合并购物车列表
export const memberCartApi = (data) => {
  return http({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}