<template>
  <form-wizard
      ref="refFormWizard"
      color="#7367F0"
      :title="null"
      :subtitle="null"
      finish-button-text="Submit"
      back-button-text="Previous"
      hide-buttons
      class="checkout-form-wizard steps-transparent"
  >
    <!-- TeamGroup tab -->
    <tab-content
        title="TeamGroup"
        icon="feather icon-shopping-cart"
    >
      <team-group @next-step="formWizardNextStep"  />
    </tab-content>

    <!-- ElementMangement -->
    <tab-content
        title="ElementMangement"
        icon="feather icon-home"
    >
      <element-mangement @next-step="formWizardNextStep"/>
    </tab-content>

  </form-wizard>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import { ref } from '@vue/composition-api'
import ElementMangement from "@/views/apps/web-automation/ElementMangement";
import TeamGroup from "@/views/apps/web-automation/TeamGroup";

export default {
  components: {

    // 3rd Party
    FormWizard,
    TabContent,

    // SFC
    TeamGroup,
    ElementMangement,
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
