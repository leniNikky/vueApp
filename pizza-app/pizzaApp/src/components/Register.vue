<template>
    <div id='register' class="row mt-3">
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
                        <div class="from-group mb-3">
                            <label for="confirm-password">确认密码</label>
                            <input type="password" class="form-control" v-model="confirmPassword">
                        </div>
                        <button type="submit" class="btn btn-block btn-success">注册</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//引入axios
import axios from 'axios'
export default {
    data(){
        return{
            email:'',
            password:'',
            confirmPassword:''
        }
    },
    methods:{
        onSubmit(){
            //确认两次密码输入是否一致
           if(this.password == this.confirmPassword){
               const formData = {
                   email:this.email,
                   password:this.password,
                   confirmPassword:this.confirmPassword,
                   userRoot:'admin'
               }
               axios.post('/users.json',formData)//第一个参数是地址，第二个是要传递的参数
                    .then(res => this.$router.push({name:'loginLink'}))
           }else{
               alert('两次密码输入不一致！')
           }
        }
    }

}
</script>
