import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Chenkout from '@/views/Chenkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/userInfo.vue'
import UserOrder from '@/views/Member/components/userOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        // 二级路由
        { path: '', component: Home },
        { path: 'category/:id', component: Category },
        { path: 'category/sub/:id', component: SubCategory },
        { path: 'detail/:id', component: Detail },
        { path: 'cartlist', component: CartList },
        { path: 'chenkout', component: Chenkout },
        { path: 'pay', component: Pay },
        { path: 'paycallback', component: PayBack },
        {
          path: 'member', component: Member, redirect: 'member/user',
          children: [
            { path: 'user', component: UserInfo, },
            { path: 'order', component: UserOrder },
          ]
        }
      ]
    },

    { path: '/login', component: Login },
  ],
  // 路由滚动的行为定制
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
