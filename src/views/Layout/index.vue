<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue';

// 获取导航列表的数据
import { useCategoryStore } from '@/stores/categoryStore.js'
import { onMounted } from 'vue';

const useCategory = useCategoryStore()

onMounted(() => {
  // 这里是父组件在onMounted函数里获取服务器数据导航项
  useCategory.getCategory()
})

</script>
<template>
  <LayoutFixed />
  <layout-nav></layout-nav>
  <layout-header></layout-header>
  <!-- <router-view :key="$route.fullPath"></router-view> -->
  <router-view></router-view>
  <layout-footer></layout-footer>
</template>@/stores/categoryStore.js