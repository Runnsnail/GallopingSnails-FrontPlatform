<template>
  <!-- Earlier Email Messages -->
  <div style="height: inherit">
    {{message}}
  <web-case-scene-ball :case-id="caseId"/>
  </div>
</template>

<script>
import {BAlert, BDropdown, BDropdownItem, BLink} from 'bootstrap-vue'
import WebCaseSceneBall from "@/views/apps/web-automation/web-test-suit/WebCaseSceneBall";
import WebDebugBrowerMessage from "@/views/apps/web-automation/web-test-suit/WebDebugBrowerMessage";

export default {
  components: {
    BAlert,
    BLink,
    BDropdown,
    BDropdownItem,
    WebCaseSceneBall,
    WebDebugBrowerMessage,
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
}
</script>
