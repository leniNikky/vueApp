const state = {
    orderItems:[]
}

const getters = {
    getOrderItems:state=>state.orderItems
}

const mutations = {
    setOrderItems(state,data){
        state.orderItems = data
    }
}

const actions = {}

export default{
    state,
    getters,
    mutations,
    actions
}