import Vue from 'vue';
import VueRouter from 'vue-router';

// Routes
import {canNavigate} from '@/libs/acl/routeProtection';
import {isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser, initMenu} from '@/auth/utils';
import apps from './routes/apps';
import dashboard from './routes/dashboard';
import uiElements from './routes/ui-elements/index';
import pages from './routes/pages';
import autoMation from './routes/auto-mation';
import settings from './routes/system-seting';
import chartsMaps from './routes/charts-maps';
import formsTable from './routes/forms-tables';
import others from './routes/others';
import login from '../views/pages/authentication/Login';
import roles from './routes/roles';
import store from '@/store';
import route from "@/store/route";


Vue.use(VueRouter)
const defaultRouter = [
    {path: '/', component: login},
    {
        path: '*',
        redirect: 'error-404',
    },
]

const allRouter = [
    {path: '/', redirect: {name: 'auth-login'}},
    {path: '/dashboard', redirect: {name: 'dashboard-ecommerce'}},
    ...apps,
    ...dashboard,
    ...autoMation,
    ...settings,
    ...pages,
    ...chartsMaps,
    ...formsTable,
    ...roles,
    ...uiElements,
    ...others,
    {
        path: '*',
        redirect: 'error-404',
    },
]


// export const createRouter = () => new VueRouter({
const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: allRouter
})

// const router = createRouter()
//
// // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//     const newRouter = createRouter()
//     router.matcher = newRouter.matcher // reset router
// }
const whiteList = ['/login', '/error-404', '/', '/pages/miscellaneous/not-authorized','/apps/roles-permission'] // no redirect whitelist

router.beforeEach((to, _, next) => {
    const isLoggedIn = isUserLoggedIn()
    //&& !isLoggedIn
    if (whiteList.indexOf(to.path) !== -1 ) {
        next();
    } else {
        if (!canNavigate(to)) {
            // Redirect to login if not logged in
            if (!isLoggedIn) return next({name: 'auth-login'})
            else {
                // If logged in => not authorized
                to.name === 'misc-not-authorized' ? next() : next({name: 'misc-not-authorized'})
            }
        }

        // Redirect if logged in
        if (to.meta.redirectIfLoggedIn && isLoggedIn && to.path !== '/') {

            // alert(store.state.route.asyncRoutes)
            if (store.state.route.asyncRoutes) {
                const fmtRoutes = initMenu();
                if (fmtRoutes) {
                    store.dispatch('route/ADD_ROUTE', fmtRoutes).then(() => {
                            router.addRoutes(fmtRoutes)
                            next({...to, replace: true})
                        }
                    )
                }
            }
            //  console.log(router)
            //  const userData = getUserData()
            //  const userRole = userData.userInfo.authorities[0].authority
            // next(getHomeRouteForLoggedInUser(userData ? userRole : null))

            // to.path === '/dashboard' ?  next() : next('/dashboard')
            return next()
        }

        return next()
    }
    return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = 'none'
    }
})

export default router
