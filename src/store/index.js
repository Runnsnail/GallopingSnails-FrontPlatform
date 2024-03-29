import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import route from "./route";
import webAuto from "./web-automation"
import ProjectStoreModule from "@/views/apps/web-automation/ProjectStoreModule";
import WebStoreModule from "@/views/apps/web-automation/web-test-case/webStoreModule"
import webStoreModule from "@/views/apps/web-automation/web-test-case/webStoreModule";
import webTestSuitStore from "@/views/apps/web-automation/web-test-suit/webTestSuitStore";
import webScenarioModule from "@/views/apps/web-automation/web-case-scenario-step/webScenarioModule";
import webDebugCaseStore from "@/views/apps/web-automation/web-test-suit/webDebugCaseStore";
import CodeEdit from "@/views/apps/web-automation/web-case-scenario-step/CodeEdit";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    route,
    app,
    appConfig,
    verticalMenu,
    webAuto,
    'web-test-case': webStoreModule,
    'web-debug-case':webDebugCaseStore,
    'web-test-suits': webTestSuitStore,
    'web-automation': ProjectStoreModule,
    'app-ecommerce': ecommerceStoreModule,
    'web-element':WebStoreModule,
    'web-scenario':webScenarioModule,
    'code-edie': CodeEdit,
  },
  strict: process.env.DEV,
})
