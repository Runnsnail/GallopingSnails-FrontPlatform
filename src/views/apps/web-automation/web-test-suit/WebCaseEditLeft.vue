<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content email-app-sidebar">
        <div class="email-app-menu">
          <div class="demo-inline-spacing">
            <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                style="margin-left: 30px;"
                variant="relief-primary"
                size="sm"
                @click="debuggerStepsCase"
            >
              Debug
            </b-button>
            <!-- browser Button -->
            <b-dropdown
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                :text="browserBy.text"
                right
                size="sm"
                variant="outline-primary"
            >
              <b-dropdown-item
                  v-for="browser in browserByOptions"
                  :key="browser.value"
                  @click="browserBy=browser"
              >
                {{ browser.text }}
              </b-dropdown-item>
            </b-dropdown>
          </div>
          <vue-perfect-scrollbar
              :settings="perfectScrollbarSettings"
              class="sidebar-menu-list scroll-area"
          >
            <b-card-code title="Test Steps">
            <!-- draggable -->
            <app-timeline>
            <draggable
                v-model="stepList"
                class="list-group list-group-flush cursor-move"
            >
                <app-timeline-item
                    v-for="listItem in stepList"
                    :key="listItem.id"
                    :title="listItem.name"
                    :icon="listItem.icon"
                    :time="listItem.remark"
                    :variant="listItem.variant"
                    @click="showStepInfo(listItem.id)"
                />
            </draggable>
            </app-timeline>
            </b-card-code>
          </vue-perfect-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BAlert,
  BBadge,
  BButton,
  BCardText,
  BDropdown,
  BDropdownItem,
  BLink,
  BListGroup,
  BListGroupItem, VBModal
} from 'bootstrap-vue'
import BCardCode from "@core/components/b-card-code";
import AppTimeline from "@core/components/app-timeline/AppTimeline";
import AppTimelineItem from "@core/components/app-timeline/AppTimelineItem";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import  {getDebugerCase, getSuitCaseList,} from "@/views/apps/web-automation/web-test-suit/webDebugCaseList";
import draggable from "vuedraggable";
import {ref, watch} from "@vue/composition-api";
import Ripple from "vue-ripple-directive";
import bus from "@/views/apps/web-automation/bus";
import store from "@/store";

export default {

  directives: {
    'b-modal': VBModal,
    Ripple,
  },

  props: {
    caseId: {
      type: String,
      required: true,
    },
  },

  components: {
    // BSV
    BButton,
    BListGroup,
    BListGroupItem,
    BBadge,
    BDropdown,
    BDropdownItem,
    BCardText,

    BAlert,
    BLink,
    BCardCode,
    AppTimeline,
    AppTimelineItem,
    VuePerfectScrollbar,

    draggable,
  },

  setup(props,{ emit }) {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
    }

    const {browserByOptions ,browserBy,stepList,showStep,caseId}= getDebugerCase()


    console.log("bus事件回调"+showStep.value)
    const debuggerStepsCase =() =>{
      emit('close-left-sidebar')
      emit('update:show-case-info', true)
    }

    const showStepInfo = (stepId) => {
      this.$emit('fetch-step-info-id', stepId)
    }

    // const fetchCaseStepsCallBack = () =>{
    //   store.dispatch("web-test-suits/fetchCaseSteps",newCardID.value).then(
    //       response => {
    //         stepList.value = response.data.data;
    //         console.log(stepList.value)
    //       }
    //   )
    // }

    caseId.value = props.caseId;
    const fetchCaseSteps = () =>{
      store.dispatch("web-test-suits/fetchCaseSteps",caseId.value).then(
          response => {
            stepList.value = response.data.data;
            console.log(stepList.value)
          }
      )
    }

    fetchCaseSteps()

    watch([showStep,caseId], () => {
      fetchCaseSteps()
    }, {
      deep: true,
    })
    return {
      perfectScrollbarSettings,
      browserByOptions,
      browserBy,
      showStep,
      stepList,

      debuggerStepsCase,
      showStepInfo,
    }
  },

}
</script>
<style lang="scss" scoped>
.app-timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  margin-left: 1rem;
}
</style>
