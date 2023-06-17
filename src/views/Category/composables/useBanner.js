import { ref, onMounted } from 'vue' 
import { getBannerPic } from '@/apis/getBannerApi'


export function useBanner() {
  
// banner轮播图
const BannerPicList = ref([])

const getBanner = async () => {
  const { result } = await getBannerPic({
    distributionSite: '2'
  })
  // console.log(result);
  BannerPicList.value = result
}

onMounted(() => getBanner())

return { 
  BannerPicList
}

}