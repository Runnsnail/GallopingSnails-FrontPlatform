export default {
    namespaced: true,
    state: {
        initRoutes: [],
        asyncRoutes: true
    },

    getters: {
        getAsyncRoutes: state => { return state.asyncRoutes }
    },

    mutations: {
        ADD_ROUTE(state, val) {
            state.initRoutes = val
            //修改是否存储路由状态
            state.asyncRoutes = !state.asyncRoutes
        },

    },

    actions: {
        ADD_ROUTE(context,val){
            context.commit("ADD_ROUTE",val)
        }
    },
}
