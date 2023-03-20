<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content email-app-sidebar">
        <div class="email-app-menu">
          <div>
            <sidebar-variable :case-variable-lists="caseVariableList"/>
          </div>
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
                  @click="browserBy=browser;fetchSeleniumNode(browser.text)"
              >
                {{ browser.text }}
              </b-dropdown-item>
            </b-dropdown>
          </div>
          <div class="demo-inline-spacing">
            <b-button
                v-b-toggle.variable-sidebar
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="outline-primary"
                pill
                style="margin-left: 50px"
            >
              Show Variable
            </b-button>
          </div>
          <vue-perfect-scrollbar
              :settings="perfectScrollbarSettings"
              class="sidebar-menu-list scroll-area"
          >
            <b-card title="Test Steps">
              <!-- draggable -->
              <app-timeline>
                <draggable
                    v-model="stepList"
                    class="list-group list-group-flush cursor-move"
                >
                  <app-timeline-item
                      v-for="listItem in stepList"
                      :key="listItem.id"
                      :icon="listItem.icon"
                      :variant="listItem.variant"
                  >
                    <div
                        class="d-flex align-items-start flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-50">
                      <h6 @click="showStepInfo(listItem.id)">{{ listItem.name }}</h6>
                      <b-badge
                          pill
                          variant="light-primary"
                          @click="deleteStep(listItem.id)"
                      >
                        Delete
                      </b-badge>
                    </div>
                    <div>
                      <span class="text-muted">{{ listItem.remark }}</span>
                    </div>
                  </app-timeline-item>
                </draggable>
              </app-timeline>
            </b-card>
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
  BCard,
  BCardText,
  BDropdown,
  BSidebar,
  BDropdownItem, BFormCheckbox, BImg,
  BLink,
  VBToggle,
  BListGroup,
  BListGroupItem, VBModal
} from 'bootstrap-vue'
import BCardCode from "@core/components/b-card-code";
import AppTimeline from "@core/components/app-timeline/AppTimeline";
import AppTimelineItem from "@core/components/app-timeline/AppTimelineItem";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import {getDebugerCase, getSuitCaseList,} from "@/views/apps/web-automation/web-test-suit/webDebugCaseList";
import draggable from "vuedraggable";
import {ref, watch} from "@vue/composition-api";
import Ripple from "vue-ripple-directive";
import bus from "@/views/apps/web-automation/bus";
import store from "@/store";
import SidebarVariable from "@/views/apps/web-automation/web-test-suit/SidebarVariable";

const {reactive} = require("@vue/composition-api");

export default {

  directives: {
    'b-modal': VBModal,
    'b-toggle': VBToggle,
    Ripple,
  },

  props: {
    caseId: {
      type: String,
      required: true,
    },
  },

  components: {
    SidebarVariable,
    // BSV
    BButton,
    BCard,
    BListGroup,
    BListGroupItem,
    BBadge,
    BDropdown,
    BDropdownItem,
    BCardText,
    BFormCheckbox,
    BImg,

    BAlert,
    BLink,
    BCardCode,
    AppTimeline,
    AppTimelineItem,
    BSidebar,
    VuePerfectScrollbar,

    draggable,
  },

  data() {
    return {
      caseVariableList: []
    }
  },

  mounted() {
    this.fetchCaseVariables()
  },

  setup(props, {emit}) {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
    }
    const isVariableSidebarActive = ref(false)
    const {browserByOptions, browserBy, stepList, showStep, caseId, seleniumNode} = getDebugerCase()

    const fetchSeleniumNode = (param) => {

      store.dispatch('web-test-suits/fetchSeleniumNode', param).then(response => {
        seleniumNode.value = response.data.data
        bus.$emit('getSeleniumNode', seleniumNode)
      })
    }

    const debuggerStepsCase = () => {
      emit('close-left-sidebar')
      emit('update:show-case-info', true)
      bus.$emit('getStepLogMessages', caseId)
      store.dispatch("web-test-suits/debuggerStepsCase", {
        caseId: caseId.value,
        browser: browserBy.value.value,
      }).then(
          response => {
            bus.$emit('getStepLogMessages', caseId)
          }
      ).finally(
          bus.$emit('getStepLogMessages', caseId),
      )
    }

    const showStepInfo = (stepId) => {
          emit('fetch-step-info-id', stepId),
          bus.$emit('getStepLogMessages', caseId)
          bus.$emit('getStepId', stepId)
    }


    const deleteStep = (param) => {

      store.dispatch("web-test-suits/deleteStep", param).then(
          response => {
            fetchCaseSteps()
          }
      )
    }

    caseId.value = props.caseId;
    const fetchCaseSteps = () => {
      store.dispatch("web-test-suits/fetchCaseSteps", caseId.value).then(
          response => {
            stepList.value = response.data.data;
            // bus.$emit('getNewCardId',stepList)
          }
      ).finally(

      )
    }

    const saveCaseSteps = (param) => {

      store.dispatch("web-test-suits/saveCaseSteps", param).then(
          response => {
          }
      )
    }

    fetchCaseSteps()
    // fetchCaseVariables()

    watch(stepList, () => {
      saveCaseSteps(stepList.value)
    }, {
      deep: true,
    })


    watch([showStep, caseId], () => {
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
      isVariableSidebarActive,

      debuggerStepsCase,
      fetchSeleniumNode,
      showStepInfo,
      deleteStep,
    }
  },

  methods: {
    fetchCaseVariables() {
      store.dispatch("web-test-suits/fetchCaseVariables", this.caseId).then(
          response => {
            this.caseVariableList = response.data.data;
          }
      )
    }
  },

  destroyed() {
    bus.$emit('getCaseVariableLists', this.caseVariableList)
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
