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
          Log页面
        </h4>
      </div>
    </div>
    <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="email-scroll-area scroll-area"
    >
      <h1>
        我在打印日志
      </h1>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import {
  BDropdown, BDropdownItem, BRow, BCol, BBadge, BCard, BLink,
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

    // 3rd Party
    VuePerfectScrollbar,

  },
  props: {

  },
  setup() {

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
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
