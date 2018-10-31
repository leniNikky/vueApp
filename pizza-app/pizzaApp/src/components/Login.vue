<template>
    <div id='login' class="row mt-3">
        <div class="col-md-12 col lg-12">
            <div class="card">
                <div class="card-body">
                    <img class="mx-auto d-block" src="../../src/assets/icon.jpg">
                    <form @submit.prevent="onSubmit">
                        <div class="from-group mb-3">
                            <label for="email">邮箱</label>
                            <input type="email" class="form-control" v-model="email">
                        </div>
                        <div class="from-group mb-3">
                            <label for="password">密码</label>
                            <input type="password" class="form-control" v-model="password">
                        </div>
                        <button type="submit" class="btn btn-block btn-success">登录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            email:'',
            password:'',
        }
    },
    methods:{
        onSubmit(){
            //console.log(123)
            axios.get('/users.json')
            .then(res=>{
               // console.log(res.data)
               const data = res.data;
               const users = [];
               for(let key in data){
                   const user = data[key];
                   //console.log(user)
                   users.push(user);
               }
               //实现过滤
               let result = users.filter((user)=>{
                   return user.email === this.email && user.password === this.password
               })
               //console.log(result)
               //判断result的长度
               if(result != null && result.length>0){
                   //this.$store.dispatch('setUser',result[0])
                   this.$store.commit('userStatus',result[0])
                   this.$router.push({name:'homeLink'})
               }else{
                   alert('账号或密码输入有误，请重新输入！')
                   //this.$store.commit('userStatus',null)
                   this.$store.dispatch('setUser',null)
               }
            })
        }
    }

}
</script>
