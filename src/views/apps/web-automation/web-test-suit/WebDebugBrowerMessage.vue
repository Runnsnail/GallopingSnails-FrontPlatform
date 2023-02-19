<template>
  <div class="email-app-details">

    <!-- Email Header -->
    <div class="email-detail-header">

      <!-- Header: Left -->
      <div class="email-header-left d-flex align-items-center">
        <span class="go-back mr-1">
          <feather-icon
              :icon="$store.state.appConfig.isRTL ? 'ChevronRightIcon' : 'ChevronLeftIcon'"
              size="20"
              class="align-bottom"
              @click="$emit('close-brower-view')"
          />
        </span>
        <h4 class="email-subject mb-0">
          浏览器调试页面
        </h4>
      </div>
      <div class="email-header-right ml-2 pl-1">
        <feather-icon
            icon="TwitchIcon"
            class="ml-75 cursor-pointer"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            v-b-toggle.sidebar-right
            size="17"
            @click="isLogSidebarActive = true"
        />
        <b-sidebar
            id="sidebar-right"
            shadow
            right
            bg-variant="white"
            backdrop
        >
          <sidebar-log
              :is-log-sidebar-active.sync="isLogSidebarActive"
          />
        </b-sidebar>
      </div>
    </div>
    <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="email-scroll-area scroll-area"
        style="padding-left: 0px; padding-right: 0px;"
    >
      <div class="novpn">
      <b-embed type="iframe"  aspect="16by9" :src="seleniumNode.seleniumIp" allowfullscreen/>
      </div>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import {
  BDropdown, BDropdownItem, BRow, BCol, BBadge, BCard, BLink, BEmbed, BSidebar, VBToggle,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { ref} from '@vue/composition-api'
import Ripple from "vue-ripple-directive";
import SidebarLog from "@/views/apps/web-automation/web-test-suit/SidebarLog";
import {getStepInformation} from "@/views/apps/web-automation/web-case-scenario-step/webScenarioStep";

const {nextTick} = require("@vue/composition-api");


export default {
  components: {

    // BSV
    BDropdown,
    BDropdownItem,
    BRow,
    BCol,
    BBadge,
    BCard,
    BLink,
    BSidebar,

    BEmbed,

    // 3rd Party
    VuePerfectScrollbar,
    SidebarLog,

  },

  directives: {
    'b-toggle': VBToggle,
    Ripple,
  },
  props: {

  },
  setup() {

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    const showWholeThread = ref(false)
    const isLogSidebarActive = ref(false)
    const {seleniumNode} = getStepInformation();

    return {

      // UI
      perfectScrollbarSettings,
      showWholeThread,
      isLogSidebarActive,
      seleniumNode,
    }
  },
}
</script>

<style>

</style>
