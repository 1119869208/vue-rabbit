import { getCategoryApi } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'


export function useCategory() {
  // 面包屑 获取数据
const categoryData = ref({})
const router = useRoute()
const getCategory = async (id = router.params.id) => {
  const { result } = await getCategoryApi(id)
  categoryData.value = result
}
onMounted(() => getCategory())

// 路由参数变化的时候，可以把分类的数据接口重新发送
onBeforeRouteUpdate((to) => {
  // console.log('11')
  // 存在问题：使用最新的路由参数请求最新的分类数据 
  // console.log(to);
  getCategory(to.params.id)
})

return {
  categoryData
}
}