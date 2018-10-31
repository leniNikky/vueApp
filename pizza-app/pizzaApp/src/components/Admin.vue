<template>
    <div id="admin" class="row">
        <div class="col-sm-12 col-md-8">
            <!--new pizza-->
            <app-new-pizza></app-new-pizza>
        </div>
        <div class="col-sm-12 col-md-4">
            <!--菜单品种展示-->
            <h3 class="title-muted my-5">菜单</h3>
            <table class="table">
                <thead class="table table-default">
                    <tr>
                        <th>品种</th>
                        <th>删除</th>
                    </tr>
                </thead>
                <tbody v-for="item in getMenuItem" :key="item.id">
                    <tr>
                        <td>{{item.name}}</td>
                        <td><button @click="deleteData(item)" class="btn btn-outline-danger btn-sm">&times;</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import NewPizza from './NewPizza.vue'
    export default{
        data(){
            return{
               // getMenuItem:[]
            }
        },
        components:{
            'app-new-pizza':NewPizza
        },
        computed:{
             //从vuex中获取数据
            getMenuItem:{
                get(){
                   // return this.$store.state.menuItems;
                   //通过getters获取数据
                    return this.$store.getters.getMenuItems;
                    
                },
                set(){

                }
            
        },
        },
        created(){
            fetch('https://pizza-app-8a624.firebaseio.com/menu.json')
            .then(res=>{
                return res.json();
            })
            .then(data=>{
               // console.log(data);
               var menuArr = [];
               for(let key in data){
                  // console.log(key)
                  data[key].id = key;
                  menuArr.push(data[key]);
                  this.getMenuItem = menuArr
               }
               //console.log(this.getMenuItem)
               //数据同步
               this.$store.commit('setMenuItems',menuArr)
            })
        },
        updated(){
            fetch('https://pizza-app-8a624.firebaseio.com/menu.json')
            .then(res=>{
                return res.json();
            })
            .then(data=>{
               // console.log(data);
               var menuArr = [];
               for(let key in data){
                  // console.log(key)
                  data[key].id = key;
                  menuArr.push(data[key]);
                  this.getMenuItem = menuArr
               }
               //console.log(this.getMenuItem)
               //数据同步
               this.$store.commit('setMenuItems',menuArr)
            })
        },
        methods:{
            deleteData(item){
                fetch('https://pizza-app-8a624.firebaseio.com/menu/'+item.id+'.json',{
                    method:'DELETE',
                    headers:{
                        'Content-type':'application/json'
                    }
                })
                .then(res => {
                    return res.json();
                     this.$store.commit('removeMenuItems',item)
                    })
                //.then(data => this.$router.push({name:'adminLink'}))
                // .tnen(data => {
                //     this.$store.commit('removeMenuItems',item)
                //     })
                .catch(err => console.log(err))
            }
        }
    }
</script>
