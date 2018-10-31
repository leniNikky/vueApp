<template>
    <div class="row">
       <div class="col-sm-12 text-center" id="home">
           <div class="background">
               <h1>欢迎大家品尝Pizza！</h1>
               <h3>你喜欢的pizza都有</h3>
               <button @click="changeLink" class="btn btn-success">Les's order!</button>
           </div>
       </div>
        
    </div>
</template>
<script>
export default {
    methods:{
        changeLink:function(){
            //跳转回上一个浏览的页面
            //this.$router.go(-1)

            //跳转到指定页面
            //this.$router.replace('menu')

            //指定跳转到路由下的名字
            this.$router.replace({name:'menuLink'})

        }
    }
}
</script>
<style>
#home{
    background: url('../../src/assets/pizza.jpg');
    height:85vh;/*vh为屏幕显示出来的高度，85vh为显示高度的85%，谷歌浏览器支持，其他兼容性不太好*/
    padding:10%;
}
.background{
    background: #eee;
    opacity: 0.8;
    max-width: 70vw;
    margin:0 auto;
    padding: 20px 0;
}
</style>
