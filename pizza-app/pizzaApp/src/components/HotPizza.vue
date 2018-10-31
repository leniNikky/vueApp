<template>
<div>
 <div id="barchart" class="mt-3 col-md-10 col-sm-10 col-sm-offset-1" style="height:500px;"></div>
 <div id="piechart" class="mt-3 col-md-10 col-sm-10 col-md-offset-1 col-sm-offset-1" style="height:500px;"></div>
</div>
   
</template>
<script>
    export default{
        data () {
            return {
                orders: [],
                menuItems:[],
                arrName:[],
                arrQuantity:[],
                arrMoney:[],
                pay:0,
                sum:0
            }
        },
        mounted(){
            this.fetchOrder(),
            this.drawLine()
            
        },
  methods: {
       fetchOrder(){
            this.http.get('order.json')
                     .then(res=> {
                         for(let index in res.data){
                             res.data[index].id=index
                         }
                         this.$store.commit('setOrderItems',res.data)
                         console.log(123);
                         console.log(res.data);
             })      
        },
    drawLine(){
        this.orders = this.$store.getters.getOrderItems;
        this.menuItems = this.$store.getters.getMenuItems;
        
        for(let item in this.menuItems){
            this.sum = 0;    
            this.pay = 0;    
            for(let order in this.orders){
                if(this.menuItems[item].name == this.orders[order].name){
                    this.sum+=this.orders[order].quantity
                    this.pay+=this.orders[order].quantity * this.orders[order].price
                }
            }
            this.arrName.push(this.menuItems[item].name);
            this.arrQuantity.push(this.sum);
            this.arrMoney.push({name:this.menuItems[item].name,value:this.pay});
        }
        // 基于准备好的dom，初始化echarts实例
        let myChartBar = this.$echarts.init(document.getElementById('barchart'))
        let myChartPie = this.$echarts.init(document.getElementById('piechart'))
        // 绘制图表
        myChartBar.setOption({
            title: { text: '销售情况分析' },
            tooltip: {},
            legend:{
                data:['销量']
            },
            xAxis: {
                data:this.arrName
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: this.arrQuantity
            }]
        });
        myChartPie.setOption({
            title: { text: '收入分析' },
            tooltip: {},
            series: [{
                type: 'pie',
                data: this.arrMoney
            }]
        });
    }
  }

    }
</script>