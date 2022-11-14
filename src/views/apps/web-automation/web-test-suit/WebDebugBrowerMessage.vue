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
    </div>
    <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="email-scroll-area scroll-area"
        style="padding-left: 0px; padding-right: 0px;"
    >
      <div class="novpn">
      <b-embed type="iframe"  aspect="16by9" src="http://116.62.219.238:7903/" allowfullscreen/>
      </div>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import {
  BDropdown, BDropdownItem, BRow, BCol, BBadge, BCard, BLink, BEmbed,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { ref, watch } from '@vue/composition-api'


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

    BEmbed,

    // 3rd Party
    VuePerfectScrollbar,

  },
  props: {

  },
  setup() {

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    const showWholeThread = ref(false)


    return {

      // UI
      perfectScrollbarSettings,
      showWholeThread,

    }
  },
}
</script>

<style>

</style>
