<template>
  <!-- Need to add height inherit because Vue 2 don't support multiple root ele -->
  <div style="height: inherit">
    <div
        class="body-content-overlay"
        :class="{'show': mqShallShowLeftSidebar}"
        @click="mqShallShowLeftSidebar = false"
    />

    <!-- case List -->

          <web-case-debug  />


    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <web-test-left-sider
          :class="{'show': mqShallShowLeftSidebar}"
          @close-left-sidebar="mqShallShowLeftSidebar = false"
      />
    </portal>

  </div>
</template>

<script>

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {useResponsiveAppLeftSidebarVisibility} from '@core/comp-functions/ui/app'
import WebTestLeftSider from "@/views/apps/web-automation/web-test-suit/WebTestLeftSider";
import WebCaseDebug from "@/views/apps/web-automation/web-test-suit/WebCaseDebug";


export default {
  components: {

    // 3rd Party
    VuePerfectScrollbar,

    // App SFC
    WebTestLeftSider,
    WebCaseDebug,
  },


  setup() {


    // Left Sidebar Responsiveness
    const {mqShallShowLeftSidebar} = useResponsiveAppLeftSidebarVisibility()
    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }
    return {

      // Left Sidebar Responsiveness
      mqShallShowLeftSidebar,
      perfectScrollbarSettings,
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
