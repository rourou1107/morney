import Vue from 'vue'
import VueRouter from 'vue-router'
import Money from "@/views/Money.vue";
import Labels from "@/views/Labels.vue";
import Statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '*', // 上述四个都不匹配的情况下, 走这条路径
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
