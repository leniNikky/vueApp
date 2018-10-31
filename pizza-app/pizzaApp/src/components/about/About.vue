<template>
    <div id="about">
        <div class="row">
            <div class="col-4">
                <!--导航-->
                <div class="list-group">
                    <router-link tag="li" class="nav-link" :to="{name:'historyLink'}">
                        <a class="list-group-item list-group-action">历史订单</a>
                    </router-link>
                    <router-link tag="li" class="nav-link" :to="{name:'contactLink'}">
                        <a class="list-group-item list-group-action">联系我们</a>
                    </router-link>
                    <router-link tag="li" class="nav-link" :to="{name:'deliveryLink'}">
                        <a class="list-group-item list-group-action">快递消息</a>
                    </router-link>
                    <router-link tag="li" class="nav-link" :to="{name:'orderingGuideLink'}">
                        <a class="list-group-item list-group-action">订餐指南</a>
                    </router-link>
                </div>
            </div>
            <div class="col-8">
                <!--导航对应的内容-->
                <router-view></router-view>
            </div>
        </div>

        
    </div>
</template>
