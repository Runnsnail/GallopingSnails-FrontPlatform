import useJwt from '@/auth/jwt/useJwt'
import {getNoParamRequest, getRequestWithNoToken} from '@/libs/axios'
import router from "@/router";
import store from "@/store";


/**
 * Return if user is logged in
 * This is completely up to you and how you want to store the token in your frontend application
 * e.g. If you are using cookies to store the application please update this function
 */
// eslint-disable-next-line arrow-body-style
export const isUserLoggedIn = () => {
    return localStorage.getItem('userData') && localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
}

export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 * This function is used for demo purpose route navigation
 * In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 * Please note role field is just for showing purpose it's not used by anything in frontend
 * We are checking role just for ease
 * NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
    if (userRole === 'admin') return '/dashboard'
    if (userRole === 'client') return {name: 'access-control'}
    return {name: 'auth-login'}
}

export const initMenu = async () => {
    debugger
    let fmtRoutes;
    await getRequestWithNoToken('/spi/menus/build').then(response => {
        debugger
        if (response.data.success) {
            // 格式化router
            // eslint-disable-next-line no-use-before-define
            // 添加到router
            debugger
            fmtRoutes = formatRoutes(response.data.data)
            // this.$store.dispatch('route/ADD_ROUTE',fmtRoutes)
            // store.commit('route/ADD_ROUTE', fmtRoutes)
            // console.log(fmtRoutes)
            // if (store.getters.getAsyncRoutes) {
            //     router.addRoutes(fmtRoutes)
            // }
            ;
        }
    })
    return fmtRoutes;
}

const loadView = (viewPath) => {
    // 用字符串模板实现动态 import 从而实现路由懒加载
    return () => import(`@/views/${viewPath}`)
}

export const formatRoutes = (routes) => {
    debugger
    const fmRoutes = []
    routes.forEach(item => {
        const {name, path, hidden, redirect, component, meta, alwaysShow, children} = item
        const fmRouter = {
            path,
            name,
            meta,
        }
        fmRouter['component'] = loadView(component)
        if (children && children instanceof Array) {
            // 递归
            fmRouter['children'] = formatRoutes(children)
        }
        fmRoutes.push(fmRouter)
    })
    return fmRoutes
}
