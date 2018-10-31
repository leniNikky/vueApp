<template>
    <div>
        <div class="card text-dark bg-light mb-3 mt-2">
            <div class="card-header">联系我们</div>
            <div class="card-body">
                <h4 class="card-title">联系我们</h4>
                <p class="card-text">111111@163.com</p>
                <router-link :to="{name:'phoneNumber'}"><a>电话</a></router-link>
                <router-link :to="{name:'personName'}"><a>联系人</a></router-link>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
