<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import goodsList from '../Home/components/goodsItem.vue'

// 获取面包屑导航数据
const CategoryData = ref([])
const route = useRoute()
const getCategory = async () => {
  const { result } = await getCategoryFilterAPI(route.params.id)
  CategoryData.value = result
}

onMounted(() => getCategory())


// 获取导航列表数据
const goodsLists = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'   //排序字段
})

const getSubGoods = async () => {
  const { result } = await getSubCategoryAPI(reqData.value)
  // console.log(result);
  goodsLists.value = result.items
}

onMounted(() => getSubGoods())

// 筛选功能实现
const getNewGoodsList = () => {
  console.log('tab栏切换了', reqData.value.sortField)
  reqData.value.page = 1
  getSubGoods()
}

// 加载功能实现
const disabled = ref(false)
const load = async () => {
  // console.log('监听了加载事件')
  reqData.value.page++
  const { result } = await getSubCategoryAPI(reqData.value)
  goodsLists.value = [...goodsLists.value, ...result.items]

  // 加载事件禁用 （加载完毕）
  if (result.items.length === 0) {
    disabled.value = true
  }
}

</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${CategoryData.parentId}` }">{{ CategoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ CategoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="getNewGoodsList">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <goodsList v-for="goods in goodsLists" :goods="goods" :key="goods.id" />
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>