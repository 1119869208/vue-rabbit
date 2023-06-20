import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
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
    // 思路 2、使用数组的过滤方法实现  核心思路是过滤不等于对应的skuId的值形成一个新数组
    const idx = cartList.value.filter(item => skuId !== item.skuId)
    cartList.value = idx
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
  const allPrice = computed(() => cartList.value.reduce((amt, item) => amt + item.count * item.price, 0))

  // 计算求商品总价

  return {
    cartList,
    addCart,
    delCartList,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck
  }
},
  {
    persist: true,
  })