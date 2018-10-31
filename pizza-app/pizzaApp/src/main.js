import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import axios from 'axios'
import {store} from './store/store.js'
import echarts from 'echarts'

Vue.use(VueRouter)
//配置默认根路径
axios.defaults.baseURL = 'https://pizza-app-8a624.firebaseio.com/'
//设置vue原型(在任何组件中都能正常使用)
Vue.prototype.http = axios
Vue.prototype.$echarts = echarts

const router =new VueRouter({
  routes,
  mode:'history',
  scrollBehavior(to,from,savedPosition){
    //return{x:0,y:100}
    //return {selector:'btn'}
    if(savedPosition){
      return savedPosition
    }else{
      return {x:0,y:0}
    }
  }
})

//全局守卫
router.beforeEach((to,from,next)=>{

  // alert("你还未登录，请先登录！");
  // next();

  //判断store.setter.isLogin===false
  if(store.getters.getIsLogin===true || to.path == '/login' || to.path == '/register'){
    next();
  }else{
    alert("你还未登录，请先登录！");
    next('/login')
  }

})

//后置钩子
// router.afterEach((to,from)=>{
//   alert("after each")
// })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
