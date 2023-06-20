import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCartStore = defineStore('cart', () => {
  // 1、定义购物车数据列表
  const cartList = ref([])
  // 2、添加购物车方法
  const addCart = (goods) => {
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

  // 删除业务 删除购物车产品功能
  const delCartList = (skuId) => {
    // 思路 1、找到要删除的数组下标号 通过splice下标值删除产品
    // const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    // cartList.value.splice(idx, 1)
    // 思路 2、使用数组的过滤方法实现 
    const idx = cartList.value.filter(item => skuId !== item.skuId)
    cartList.value = idx
  }

  return {
    cartList,
    addCart,
    delCartList
  }
},
  {
    persist: true,
  })