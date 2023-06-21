import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartAPI, eleCartAPI } from '@/apis/cart.js'


export const useCartStore = defineStore('cart', () => {
  // 获取userstore里面的token值
  const userStore = useUserStore()
  // 提取里面的token值 用来做判断里面是否有token值
  const isLogin = computed(() => userStore.userInfo.token)

  // 1、定义购物车数据列表
  const cartList = ref([])

  // 获取最新购物车列表数据
  const updataNewList = async () => {
    // 获取最新购物车列表逻辑
    const { result } = await findNewCartAPI()
    // 覆盖本地购物车列表
    cartList.value = result
  }

  // 2、添加购物车方法
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      // 登录之后加入购物车的逻辑
      // 加入购物车逻辑
      await insertCartAPI({ skuId, count })
      updataNewList()
    } else {
      // 添加购物车操作
      // console.log(cartList.value);
      // item为商品ID
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        // 如果能找到对应的商品规格ID
        item.count += 1
      } else {
        cartList.value.push(goods)
      }
    }


  }


  // 删除业务 删除购物车产品功能
  const delCartList = async (skuId) => {
    if (isLogin.value) {
      await eleCartAPI([skuId])
      updataNewList()
    } else {
      // 思路 1、找到要删除的数组下标号 通过splice下标值删除产品
      // const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      // cartList.value.splice(idx, 1)
      // 思路 2、使用数组的过滤方法实现  核心思路是过滤不等于对应的skuId的值形成一个新数组
      const idx = cartList.value.filter(item => skuId !== item.skuId)
      cartList.value = idx
    }
  }


  // 退出时清除购物车
  const clearCart = () => {
    cartList.value = []
  }


  // 单选功能实现
  const singleCheck = (skuId, selected) => {
    //  通过skyID找到要修改的那一项，然后把它selected修改为传过来的selected
    const item = cartList.value.find(item => item.skuId === skuId)
    item.selected = selected
  }

  // 全选功能
  // 单选功能都为true 全选为选中状态
  const isAll = computed(() => cartList.value.every((item) => item.selected)
  )

  // 全选功能点击 小复选框都为选中状态
  const allCheck = (selected) => { cartList.value.forEach((item) => item.selected = selected) }



  // 计算属性
  // 计算求商品数量
  const allCount = computed(() => cartList.value.reduce((amt, item) => amt + item.count, 0))

  // 计算求商品总价
  const allPrice = computed(() => cartList.value.reduce((amt, item) => amt + item.count * item.price, 0))

  // 已选择商品数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((amt, item) => amt + item.count, 0))

  // 已选择商品价格合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((amt, item) => amt + item.count * item.price, 0))

  return {
    cartList,
    addCart,
    delCartList,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    clearCart,
    updataNewList
  }
},
  {
    persist: true,
  })