<template>
  <div style="height: inherit">

    <form-wizard
        ref="refFormWizard"
        class="mb-3"
        color="#7367F0"
        :title="null"
        :subtitle="null"
        finish-button-text="Submit"
        back-button-text="Previous"
        hide-buttons
        style="background-color: transparent;box-shadow: none;"
    >
      <!-- 场景步骤 tab -->
      <tab-content title="Scenario Step"  icon="feather icon-cast" >
        <web-case-scenario-step @next-step="formWizardNextStep" :stepObject="message"/>
      </tab-content>

      <!-- 设置 tab -->
      <tab-content title="Advanced Settings"  icon="feather icon-monitor">
        <web-case-setting  @next-step="formWizardNextStep"/>
      </tab-content>
    </form-wizard>
  <web-case-scene-ball :case-id="caseId"/>
  </div>
</template>

<script>
import {BAlert, BCol, BDropdown, BDropdownItem,BLink, BRow} from 'bootstrap-vue'
import WebCaseSceneBall from "@/views/apps/web-automation/web-test-suit/WebCaseSceneBall";
import WebDebugBrowerMessage from "@/views/apps/web-automation/web-test-suit/WebDebugBrowerMessage";
import WebCaseSetting from "@/views/apps/web-automation/web-case-setting/WebCaseSetting";
import WebCaseScenarioStep from "@/views/apps/web-automation/web-case-scenario-step/WebCaseScenarioStep";
import {FormWizard, TabContent} from "vue-form-wizard";
import ToastificationContent from "@core/components/toastification/ToastificationContent";
import {ref} from "@vue/composition-api";

export default {
  components: {
    WebCaseScenarioStep,
    WebCaseSetting,
    BAlert,
    BLink,
    BDropdown,
    BDropdownItem,
    WebCaseSceneBall,
    WebDebugBrowerMessage,

    FormWizard,
    TabContent,
    BRow,
    BCol,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },

  props: {
    message: {
      type: Object,
      required: true,
    },
      caseId: {
        type: String,
        required: true,
      },
  },

  setup() {
    const refFormWizard = ref(null)
    const formWizardNextStep = () => {
      refFormWizard.value.nextTab()
    }

    return {
      refFormWizard,
      formWizardNextStep,

    }
  },

  methods: {
    formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Form Submitted',
          icon: 'EditIcon',
          variant: 'success',
        },
      })
    },
  },
}
</script>
<style lang="scss">
@import '/src/@core/scss/vue/libs/vue-wizard.scss';
@import '/src/@core/scss/base/pages/app-ecommerce.scss';
@import '~vue-form-wizard/dist/vue-form-wizard.min.css';
</style>
<style lang="scss" scoped>
.checkout-form-wizard ::v-deep {
  .wizard-tab-content {
    box-shadow: none !important;
    background: transparent !important;
    padding: 0;
  }
}
</style>
