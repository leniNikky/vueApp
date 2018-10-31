import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import About from './components/about/About'
import Login from './components/Login'
import Register from './components/Register'
import Error from './components/Error'
import HotPizza from './components/HotPizza'
import {store} from './store/store.js'

//二级路由
import History from "./components/about/History";
import Contact from "./components/about/Contact";
import Delivery from "./components/about/Delivery";
import OrderingGuide from "./components/about/OrderingGuide";
//三级路由
import Phone from "./components/about/contact/Phone";
import PersonName from "./components/about/contact/PersonName";

export const routes= [
    {path:'/',name:'homeLink',components:{
      default:Home,
      'orderingGuide':OrderingGuide,
      'history':History,
      'delivery':Delivery
    }},
    {path:'/menu',name:'menuLink',component:Menu,
    //beforeEnter:(to,from,next)=>{
      //路由独享守卫
      // alert("before enter");
      // next();
  
      //     //判断store.setter.isLogin===false
      // if(to.path == '/login' || to.path == '/register'){
      //   next();
      // }else{
      //   alert("你还未登录，请先登录！");
      //   next('/login')
      // }
  
    //}
    },
    {path:'/hotpizza',name:'hotpizzaLink',component:HotPizza},
    {path:'/admin',name:'adminLink',component:Admin,
      beforeEnter:(to,from,next)=>{
        if(store.getters.getCurrentUser.userRoot == 'admin'){
          next();
        }else{
          alert("此内容仅对管理员开放！");
          //this.$router.go(-1)
        }
      }
    },
    {path:'/about',name:'aboutLink',redirect:'/about/history',component:About,children:[
      {path:'/about/history',name:'historyLink',component:History},
      {path:'/contact',name:'contactLink',redirect:'/phone',component:Contact,children:[
        {path:'/phone',name:'phoneNumber',component:Phone},
        {path:'/personname',name:'personName',component:PersonName}
      ]},
      {path:'/delivery',name:'deliveryLink',component:Delivery},
      {path:'/orderingGuide',name:'orderingGuideLink',component:OrderingGuide}
    ]},
    {path:'/login',name:'loginLink',component:Login},
    {path:'/register',name:'registerLink',component:Register},
    {path:'*',component:Error}
  ]