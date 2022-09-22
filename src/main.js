import Vue from 'vue'
import App from './App.vue'
// 三级联动组件--全局组件
import TypeNav from "@/components/TypeNav"
import Carousel from "@/components/Carousel"
import Pagination from '@/components/Pagination'
// 第一个参数:全局组件的名字 第二个参数:哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
//引入路由
import router from "@/router"
//引入仓库
import store from "@/store"
//引入MockServe.js------mock数据
import "@/mock/mockServe"
Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  //注册路由:底下的写法KV一致省略V【router小写的】
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$router,$router属性
  router,
  //注册仓库:组件实例的身上会多了一个属性$store属性
  store
}).$mount('#app')
