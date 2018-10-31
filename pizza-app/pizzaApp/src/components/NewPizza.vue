<template>
    <form>
        <h3 class="title-muted my-5">添加新的Pizza</h3>
        <div class="form-group row">
            <label for="" class="col-sm-1">品种</label>
            <div class="col-sm-11">
                <input type="text" class="form-control" v-model="newPizza.name">
            </div>
        </div>
        <div class="form-group row">
            <label for="" class="col-sm-1">描述</label>
            <div class="col-sm-11">
                <textarea type="text" class="form-control" v-model="newPizza.description" row="5"></textarea>
            </div>
        </div>
        <p><strong>选项1</strong></p>
        <div class="form-group row">
            <label for="" class="col-sm-1">尺寸</label>
            <div class="col-sm-11">
                <input type="text" class="form-control" v-model="newPizza.size1">
            </div>
        </div>
        <div class="form-group row">
            <label for="" class="col-sm-1">价格</label>
            <div class="col-sm-11">
                <input type="text" class="form-control" v-model="newPizza.price1">
            </div>
        </div>
         <p><strong>选项2</strong></p>
        <div class="form-group row">
            <label for="" class="col-sm-1">尺寸</label>
            <div class="col-sm-11">
                <input type="text" class="form-control" v-model="newPizza.size2">
            </div>
        </div>
        <div class="form-group row">
            <label for="" class="col-sm-1">价格</label>
            <div class="col-sm-11">
                <input type="text" class="form-control" v-model="newPizza.price2">
            </div>
        </div>
        <div class="form-group row">
            <button @click="addMenuItem" type="button" class="btn btn-success btn-block">添加</button>
        </div>
    </form>
</template>
<script>
export default {
    data(){
        return{
            newPizza:{}
            
        }
    },
    methods:{
        addMenuItem:function(){
            //console.log(this.newPizza);
            let data = {
                name:this.newPizza.name,
                description:this.newPizza.description,
                options:[
                    {
                        size:this.newPizza.size1,
                        price:this.newPizza.price1
                    },
                    {
                        size:this.newPizza.size2,
                        price:this.newPizza.price2
                    }
                ]
            }
            //将数据请求到数据库，可以用axios和vue-resource,以及es6的fetch
            //fetch方法
            // fetch('https://pizza-app-8a624.firebaseio.com/menu.json',{
            //     method:'POST',
            //     headers:{
            //         'Content-type':'application/json'
            //     },
            //     body:JSON.stringify(data)
            // })
            // //返回的数据可读，但是需要先转码
            //     .then(res=>this.$router.push({name:'menuLink'}))
                 //.tnen(res => res.json())
                 // .tnen(res => {this.$router.push({name:'menuLink'})})
                 // .catch(err => console.log(err))
            // this.http.post('menu.json',data)
            //          .then(res => this.$router.push({name:'menuLink'}))
            this.http.post('menu.json',data)
                     .then(res => this.$store.commit('pushToMenuItems'),data)
                     this.newPizza={}

        }
    
    }
}
</script>
