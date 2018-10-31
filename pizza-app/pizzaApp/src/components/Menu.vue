<template>
    <div id='menu' class="row">
        <!--菜单-->
        <div class="col-sm-12 col-md-8">
            <table class="table">
                <thead class="table-default">
                    <tr>
                        <th>尺寸</th>
                        <th>价格</th>
                        <th>加入</th>
                    </tr>
                </thead>
                <tbody v-for="item in getMenuItems" :key="item.id">
                    <tr>
                        <td colspan="3"><strong>{{item.name}}</strong></td>
                    </tr>
                    <tr v-for="option in item.options" :key="option.size">
                        <td>{{option.size}}寸</td>
                        <td>￥{{option.price}}</td>
                        <td><button @click="addToCar(item,option)" class="btn btn-sm btn-outline-success">+</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--购物车-->
        <div class="col-sm-12 col-md-4" v-if="shoppingCar.length>0">
            <table class="table">
                <thead class="table-default">
                    <tr>
                        <th>数量</th>
                        <th>品种</th>
                        <th>价格</th>
                    </tr>
                </thead>
                <tbody v-for="item in shoppingCar" :key="item.id">
                    <tr>
                        <td>
                            <button @click="reduceQuantity(item)" class="btn btn-sm">-</button>
                            <span>{{item.quantity}}</span>
                            <button @click="addQuantity(item)" class="btn btn-sm">+</button>
                        </td>
                        <td>{{item.name}}&nbsp;{{item.size}}寸</td>
                        <td>{{item.price*item.quantity}}</td>
                    </tr>
                </tbody>
            </table>
            <p>总价：￥{{total}}</p>
            <button @click="addOrder(shoppingCar)" class="btn btn-success btn-block">下单</button>
        </div>
        <div class="col-sm-12 col-md-4 my-3" v-else>
            <p>购物车为空，快添加餐品吧！</p>
        </div>
    </div>
</template>
<script>
//import axios from 'axios'
export default {
    // data:function(){
    //     return{
    //         name:"leni"
    //     }
    // },
    // beforeRouteEnter :(to, from, next)=> {
    //     //组件内的守卫
    //     //alert("hello,"+this.name);
    //     //会显示hello，undefined;因为beforeRouteEnter在data被渲染前已经执行了
    //     next(vm=>{
    //         alert("hello,"+vm.name);
    //     })
    //     //在next进行回调，可以显示出来
    // }
    data(){
      return{
        shoppingCar:[],
        //getMenuItems:[]
      }
    },
    created() {
        // fetch('https://pizza-app-8a624.firebaseio.com/menu.json')
        // .then(res => res.json())
        // .then(data =>{
        //     var dataArr =[]
        //     for(let key in data){
        //         var dataItem = data[key];
        //         dataArr.push(data[key])
        //     }
        //     this.getMenuItems = dataArr
        // })
        this.fetchData()
    },
    methods:{
        //调取菜单餐品数据
        fetchData:function(){
            //es6的fetch方法
            // fetch('https://pizza-app-8a624.firebaseio.com/menu.json')
            // .then(res =>{
            //     return res.json()
            // })
            // .then(data =>{
            //     this.getMenuItems = data
            // })
            //axios方法(这是将axios设置为vue原型属性之前，需要在所在文件先import)
            // axios.get('menu.json')
            //      .then(res=>this.getMenuItems=res.data)
            //将axios设置为vue原型属性之后的用法
            // this.http.get('menu.json')
            //          .then(res=>this.getMenuItems=res.data)
            //将请求回来的数据存到vuex
            this.http.get('menu.json')
                     .then(res=> {
                         for(let index in res.data){
                             res.data[index].id=index
                         }
                         this.$store.commit('setMenuItems',res.data)
                         console.log(321);
                         console.log(res.data);
                         })
                   
        },
       
        //添加商品到购物车
        addToCar:function(item,option){
            let goodsMsg = {
                name:item.name,
                size:option.size,
                price:option.price,
                quantity:1
            }
            //判断购物车是否为空，为空直接添加商品,否则进行过滤
            if(this.shoppingCar.length !=0){
                //过滤
                let result=this.shoppingCar.filter((item)=>{
                    return (item.name === goodsMsg.name && item.price === goodsMsg.price)
                })
                if(result != null && result.length>0){
                    result[0].quantity++;
                }else{
                    this.shoppingCar.push(goodsMsg)
                }
            }else{
                this.shoppingCar.push(goodsMsg)
            }
            
        },
        //购物车商品数量减1
        reduceQuantity:function(item){
            item.quantity--;
            //判断商品数量为0时，删除该商品条目
            if(item.quantity<=0){
                this.removeFromShoppingCar(item)
            }
        },
        //购物车商品数量加1
        addQuantity:function(item){
            item.quantity++
        },
        //删除购物车里的商品
        removeFromShoppingCar:function(item){
            this.shoppingCar.splice(this.shoppingCar.indexOf(item),1)
        },
        //下订单
        addOrder:function(){
            for(let item in this.shoppingCar){
                //alert(this.shoppingCar[item])
                this.http.post('/order.json',this.shoppingCar[item])
            }
                this.shoppingCar= [];
                alert('点餐成功，请耐心等待...');
                        
        }
    },
    computed:{
        //从vuex中获取数据
        getMenuItems:function(){
           // return this.$store.state.menuItems;
           //通过getters获取数据
           return this.$store.getters.getMenuItems;
        },
        //计算购物车商品总价
        total:function(){
            let totalCost = 0;
            for(let index in this.shoppingCar){
                let shoppingCarItem = this.shoppingCar[index];
                let itemCost = shoppingCarItem.price * shoppingCarItem.quantity;
                totalCost+=itemCost
            }
            return totalCost;
        }
    }
}
</script>

