import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions' 
// import * as getters from './getters' 
// import * as mutations from './mutations'
import menu from './module/menu'
import users from './module/users'
import order from './module/order'
// import status from './module/status'


Vue.use(Vuex)

export const store = new Vuex.Store({
    // state:{
    //     //设置属性
    //     menuItems:[],
    //     currentUser:null,
    //     isLogin:false
    // },
    // getters:{
    //     //获取属性的状态
    //     getMenuItems:state=>state.menuItems,
    //     getCurrentUser:state=>state.currentUser,
    //     getIsLogin:state=>state.isLogin
    // },
    
    // mutations:{
    //     //改变属性的状态
    //     setMenuItems(state,data){
    //         state.menuItems = data
    //     },
    //     //将匹配到的对象，在removeMenuItems删除
    //     removeMenuItems(state,data){
    //         state.menuItems.forEach((item,index)=>{
    //             if(item == data){
    //                 state.menuItems.splice(index,1)
    //             }
    //         })
    //     },
    //     //将新增加的pizza push到menuItems属性中
    //     pushToMenuItems(state,data){
    //         state.menuItems.push(data)
    //     },
    //     userStatus(state,user){
    //         if(user){
    //             state.currentUser = user;
    //             state.isLogin = true
    //         }else{
    //             state.currentUser = null;
    //             state.isLogin = false
    //         }
    //     }
    // },
    // actions:{
    //     //应用mutations
    //     setUser({commit},user){
    //         commit('userStatus',user)
    //     }
    // }

    //对store文件进行抽离
    // getters,
    // mutations,
    // actions

    //使用module进行模块化管理
    modules:{
        menu,
        users,
        order
    }
})