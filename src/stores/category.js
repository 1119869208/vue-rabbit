import { ref } from 'vue'
import { getCategoryAPI } from '@/apis/getNavApi.js'

import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  // 导航列表的数据管理

  // 导航列表的数据
  const cateGory = ref([])

  // 获取导航数据的方法
  const getCategory = async () => {
  const res = await getCategoryAPI()
  // console.log(res);
  cateGory.value = res.result
}
  return {  
    cateGory,
    getCategory
  }
})
