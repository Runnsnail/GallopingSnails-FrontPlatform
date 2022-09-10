import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import route from "./route";
import webAuto from "./web-automation"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    route,
    app,
    appConfig,
    verticalMenu,
    webAuto,
    'app-ecommerce': ecommerceStoreModule,
  },
  strict: process.env.DEV,
})
