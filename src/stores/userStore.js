// 管理用户数据相关
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/users.js'
import { useCartStore } from '@/stores/cartStore'
import { memberCartApi } from '@/apis/cart'


export const useUserStore = defineStore('user', () => {
  // 1、定义管理用户数据的state
  const userStore = useCartStore()
  const userInfo = ref({})
  // 2、定义获取获取接口的action函数
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result

    // 定义合并购物车的操作
    await memberCartApi(userStore.cartList.map((item) => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))

    // 获取新数据列表
    userStore.updataNewList()

  }

  // 用户退出登录删除用户数据方法
  const clearUserInfo = () => {
    userInfo.value = {}
    // 执行清除购物车的函数
    userStore.clearCart()
  }

  // 3、以对象的形式把 action state ruturn出去
  return {
    userInfo,
    getUserInfo,
    clearUserInfo,
  }
},
  {
    persist: true,
  })