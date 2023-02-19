export const codeBasic = `
<template>
  <b-sidebar
      id="variable-sidebar"
      sidebar-class="sidebar-lg"
      bg-variant="white"
      shadow
      backdrop
      no-header
      right
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Case Local Variable
        </h5>

        <feather-icon
            class="ml-1 cursor-pointer"
            icon="XIcon"
            size="16"
            @click="hide"
        />

      </div>
      <b-form
          ref="form"
          v-if="showData"
          :style="{height: trHeight}"
          class="repeater-form"
          @submit.prevent="repeatAgain"
      >
        <!-- Row Loop -->
        <b-row
            v-for="(caseVariable, index) in caseVariableLists"
            :id="caseVariable.id"
            :key="index"
            ref="row"
            class="mx-2 my-sm-1"
        >

          <!-- Variable Name -->
          <b-col md="3">
            <b-form-group
                label="Name"
                label-for="variable-name"
            >
              <b-form-input
                  id="variable-name"
                  v-model="caseVariable.name"
                  type="text"
                  placeholder="The drop-down menu"
              />
            </b-form-group>
          </b-col>

          <!-- Positioning -->
          <b-col md="3">
            <b-form-group
                label="caseVariable"
                label-for="case-variable"
            >
              <b-form-input
                  id="case-variable"
                  v-model="caseVariable.value"
                  type="text"
                  placeholder="...class"
              />
            </b-form-group>
          </b-col>

          <!-- Describe -->
          <b-col md="5">
            <b-form-group
                label="Describe"
                label-for="describe"
            >
              <b-form-input
                  id="describe"
                  v-model="caseVariable.describe"
                  type="text"
                  placeholder="..."
              />
            </b-form-group>
          </b-col>

          <!-- Dropdown -->
          <b-col md="1">
            <b-dropdown
                variant="link"
                toggle-class="p-0"
                class="vstack"
                no-caret
                :right="$store.state.appConfig.isRTL"
            >

              <template #button-content>
                <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="align-middle text-body"
                />
              </template>
              <b-dropdown-item
                  @click="saveElement(caseVariable)"
                  transfer="true"
                  :popper-append-to-body="false">
                <feather-icon icon="EditIcon"/>
                <span class="align-middle ml-50">Save</span>
              </b-dropdown-item>
              <b-dropdown-item
                  @click="removeItem(index,caseVariable.id)"
                  transfer="true"
                  :popper-append-to-body="false"
              >
                <feather-icon icon="TrashIcon"/>
                <span class="align-middle ml-50">Delete</span>
              </b-dropdown-item>
            </b-dropdown>
          </b-col>
        </b-row>
      </b-form>
      <hr>

      <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          style="margin-left: 280px;"
          @click="repeatAgain"
      >
        <feather-icon
            icon="PlusIcon"
            class="mr-25"
        />
        <span>Add New</span>
      </b-button>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar, BForm, BFormGroup, BFormInput, BRow, BCol, BButton, BCardText, BFormCheckbox, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import {heightTransition} from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import BCardCode from "@core/components/b-card-code";
import store from "@/store";
import {useWebFiltersPages} from "@/views/apps/web-automation/web-test-case/webFillterPage";

const {getStepInformation} = require("@/views/apps/web-automation/web-case-scenario-step/webScenarioStep");
const bus = require("@/views/apps/web-automation/bus.js");

export default {
  components: {
    bus,
    BSidebar,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BDropdown,
    BDropdownItem,
    BCardCode,
    BCardText,
    BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  props: {
    caseVariableLists: {
      type: Array,
      required: true,
      default: ()=>[],
    }
  },

  mixins: [heightTransition],
  data() {
    return {
      nextTodoId: 2,
      Enable: true,
      showData:false,
      caseVariableList:this.caseVariableLists,
    }
  },
  mounted() {
    this.initTrHeight()
    setTimeout(() =>{
      this.showData =true
    },0)
    // this.shownVariables()
  },
  watch:{
    caseVariableLists:function (val) {
      this.$nextTick(()=>{
        this.caseVariableList = val
      })
    },
    deep:true
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },

  methods: {

    repeatAgain() {
      this.caseVariableLists.push({
        id: this.nextTodoId += this.nextTodoId,
        name: '',
        value: '',
        describe: '',
        caseId: '',
      })

      this.$nextTick(() => {
          this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem(index, param) {
      this.caseVariableLists.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
      store.dispatch('web-test-suits/removeCaseVariables', param).then(() => {
            this.$bvToast.toast('removeCaseVariables: remove successfully', {
              title: `👋 removeCaseVariables  success`,
              variant: 'success',
              solid: false,
              toaster: 'b-toaster-bottom-right',
            })

          }, e => {
            this.$bvToast.toast('Note: remove failed', {
              title: `Variant  fail`,
              variant: 'danger',
              solid: false,
              toaster: 'b-toaster-bottom-right',
            })
          }
      )
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        if(this.$refs.form){
          this.trSetHeight(this.$refs.form.scrollHeight)
        }
      })
      this.$forceUpdate()
    },

    saveElement(param) {
      store.dispatch('web-test-suits/saveCaseVariables', param).then(() => {
            this.$bvToast.toast('Congratulations: Join successfully', {
              title: `Variant  success`,
              variant: 'success',
              solid: false,
              toaster: 'b-toaster-bottom-right',
            })
          }, e => {
            this.$bvToast.toast('Note: Join failed', {
              title: `Variant  fail`,
              variant: 'danger',
              solid: false,
              toaster: 'b-toaster-bottom-right',
            })
          }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.repeater-form {
  overflow: hidden;
  transition: .35s height;
}
</style>
`

export const codeInfo = 'default'
