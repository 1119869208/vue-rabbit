<script setup>
import { getHotGoodsApi } from '@/apis/detail'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// 定义设计defineprops数值
const props = defineProps({
  hotType: {
    type: Number
  }
})

// 配置title 1、24小时热榜 2、周热榜
const TypeList = {
  1: '24小时热榜',
  2: '周热榜'
}

const title = computed(() => TypeList[props.hotType])

const goodsHot = ref([])
const route = useRoute()
const getGoodsHot = async () => {
  const { result } = await getHotGoodsApi({
    id: route.params.id,
    type: props.hotType
  })
  goodsHot.value = result
}

onMounted(() => getGoodsHot())

</script>


<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in goodsHot" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  background-color: #fff;

  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    // padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    margin: 20px 30px;
    text-align: center;
    background: #fff;

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
}
</style>