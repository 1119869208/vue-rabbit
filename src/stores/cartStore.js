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
  return {
    cartList,
    addCart
  }
},
  {
    persist: true,
  })