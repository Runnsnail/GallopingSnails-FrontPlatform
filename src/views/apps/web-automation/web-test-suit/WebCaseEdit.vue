<template>
  <!-- Need to add height inherit because Vue 2 don't support multiple root ele -->
  <div style="height: inherit">
    <div
        class="body-content-overlay"
        :class="{'show': mqShallShowLeftSidebar}"
        @click="mqShallShowLeftSidebar = false"
    />

    <!-- case List -->

    <web-case-edit-info
        :message="stepInfo"
        :case-id="caseId"
    />
    <!-- case List -->
    <web-debug-brower-message
        :class="{'show': showCaseInfo}"
        @close-brower-view="showCaseInfo = false"
    />
    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <web-case-edit-left
          :show-case-info.sync="showCaseInfo"
          :case-id="caseId"
          :class="{'show': mqShallShowLeftSidebar}"
          @close-left-sidebar="mqShallShowLeftSidebar = false"
          @fetch-step-info-id="fetchStepById"
      />
    </portal>

  </div>
</template>

<script>

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {useResponsiveAppLeftSidebarVisibility} from '@core/comp-functions/ui/app'
import WebTestLeftSider from "@/views/apps/web-automation/web-test-suit/WebTestLeftSider";
import WebCaseDebug from "@/views/apps/web-automation/web-test-suit/WebCaseDebug";
import WebCaseEditInfo from "@/views/apps/web-automation/web-test-suit/WebCaseEditInfo";
import WebCaseEditLeft from "@/views/apps/web-automation/web-test-suit/WebCaseEditLeft";
import {useRouter} from "@core/utils/utils";
import {ref} from "@vue/composition-api";
import WebDebugBrowerMessage from "@/views/apps/web-automation/web-test-suit/WebDebugBrowerMessage";
import bus from "@/views/apps/web-automation/bus";
import store from '@/store'
import {getDebugerCase} from "@/views/apps/web-automation/web-test-suit/webDebugCaseList";
import WebLogMessage from "@/views/apps/web-automation/web-test-suit/WebLogMessage";
import {useWebFiltersPages} from "@/views/apps/web-automation/web-test-case/webFillterPage";



export default {
  components: {

    // 3rd Party
    VuePerfectScrollbar,

    // App SFC
    WebCaseEditLeft,
    WebCaseEditInfo,
    WebDebugBrowerMessage,
    WebLogMessage,
  },


  setup() {

    const showCaseInfo = ref(false)
    // Left Sidebar Responsiveness
    const {mqShallShowLeftSidebar} = useResponsiveAppLeftSidebarVisibility()

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    const {stepInfo }= useWebFiltersPages()

    const fetchStepById = (param) => {
      store.dispatch('web-test-suits/fetchStepById', param).then(response =>
          stepInfo.value = response.data.data
      )
    }
    const {route} = useRouter()
    const newCardID = getDebugerCase()
    const caseId = newCardID.value==null ? route.value.params.id:newCardID.value

    return {

      // Left Sidebar Responsiveness
      mqShallShowLeftSidebar,
      perfectScrollbarSettings,
      caseId,
      showCaseInfo,
      fetchStepById,
      stepInfo,
      newCardID,
    }
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
@import "src/@core/scss/base/pages/app-element.scss";
</style>
