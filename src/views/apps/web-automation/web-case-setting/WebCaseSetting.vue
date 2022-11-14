<template>
  <div style="height: inherit">
  <!-- 场景步骤 -->
  <b-col cols="12">
    <div class="d-flex align-items-center mb-2">
      <feather-icon
          icon="ChevronsRightIcon"
          size="18"
      />
      <h4 class="mb-0 ml-75">
        高级设置
      </h4>
    </div>
  </b-col>
  <b-tabs
      vertical
      content-class="col-12 col-md-9 mt-1 mt-md-0 "
      pills
      nav-wrapper-class="col-md-3 col-12 "
      nav-class="nav-left"
  >

    <!-- general tab -->
    <b-tab active>
      <!-- title -->
      <template #title>
        <feather-icon
            icon="UserIcon"
            size="18"
            class="mr-50"
        />
        <span class="font-weight-bold">前置条件</span>
      </template>

      <web-case-setting-before/>
    </b-tab>
    <!--/ general tab -->

    <!-- change password tab -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
            icon="LockIcon"
            size="18"
            class="mr-50"
        />
        <span class="font-weight-bold">后置条件</span>
      </template>

      <web-case-setting-after />
    </b-tab>
    <!--/ change password tab -->

    <!-- info -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
            icon="InfoIcon"
            size="18"
            class="mr-50"
        />
        <span class="font-weight-bold">错误处理</span>
      </template>

      <web-case-setting-error/>
    </b-tab>

  </b-tabs>
  </div>
</template>

<script>
import {BTabs, BTab, BCol} from 'bootstrap-vue'
import WebCaseSettingBefore from "@/views/apps/web-automation/web-case-setting/WebCaseSettingBefore";
import WebCaseSettingAfter from "@/views/apps/web-automation/web-case-setting/WebCaseSettingAfter";
import WebCaseSettingError from "@/views/apps/web-automation/web-case-setting/WebCaseSettingError";

export default {
  components: {
    WebCaseSettingError,
    WebCaseSettingAfter,
    WebCaseSettingBefore,
    BTabs,
    BTab,
    BCol,
  },
  data() {
    return {
      options: {},
    }
  },
  beforeCreate() {
    this.$http.get('/account-setting/data').then(res => { this.options = res.data })
  },
}
</script>
