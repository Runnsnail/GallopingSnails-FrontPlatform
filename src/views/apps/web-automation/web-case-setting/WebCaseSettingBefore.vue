<template>
  <div>
    <b-form-group>
      <v-select
          v-model="condition.action"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          label="title"
          :options="beforeAction"
          class="select-size-lg"
      />
    </b-form-group>
    <b-card
        title="提交表单"
        v-if="condition.action==='文本断言'||condition.action ==='元素断言'"
    >
      <validation-observer
          #default="{ handleSubmit }"
          ref="refFormObserver"
      >
      <b-form @submit.prevent="onSubmit()">
        <b-row>
          <b-col cols="12" v-if="condition.action==='文本断言'">
            <b-form-group
                label="判断变量"
                label-for="judgment-variable"
                label-cols-md="4"
            >
              <b-input-group class="input-group-merge" :class="validationOccupation ? 'is-valid' : 'is-invalid'">
                <b-input-group-prepend is-text>
                  <feather-icon icon="ActivityIcon"/>
                </b-input-group-prepend>
                <b-form-input
                    id="judgment-variable"
                    v-model="condition.variable"
                    :state="validationOccupation"
                    placeholder="变量:${xx}"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="12" v-if="condition.action==='文本断言'">
            <b-form-group
                label="期望值"
                label-for="expected-value"
                label-cols-md="4"
            >
              <b-input-group class="input-group-merge" :class="validationOccupation ? 'is-valid' : 'is-invalid'">
                <b-input-group-prepend is-text>
                  <feather-icon icon="SmartphoneIcon"/>
                </b-input-group-prepend>
                <b-form-input
                    id="expected-value"
                    v-model="condition.tagetName"
                    :state="validationOccupation"
                    placeholder="期望值"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
            <!--判断元素-->
          <b-col cols="12" v-if="condition.action==='元素断言'">
              <b-form-group
                  label="元素方法"
                  label-for="judgment-element"
                  label-cols-md="4"
              >
                <v-select
                    v-model="condition.elementAction"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="title"
                    :options="beforeElementAction"
                    class="select-size-lg"
                />
              </b-form-group>
          </b-col>
          <b-col cols="12" v-if="condition.action==='元素断言'">
              <b-form-group
                  label="xpath path"
                  label-for="xpath-value"
                  label-cols-md="4"
              >
                <b-input-group class="input-group-merge" :class="validationOccupation ? 'is-valid' : 'is-invalid'">
                  <b-input-group-prepend is-text>
                    <feather-icon icon="SmartphoneIcon"/>
                  </b-input-group-prepend>
                  <b-form-input
                      id="xpath-value"
                      v-model="condition.elementXpath"
                      :state="validationOccupation"
                      placeholder="//*[@id=‘app’]/div[1]"
                  />
                </b-input-group>
              </b-form-group>
          </b-col>
          <b-col>
          <b-form-checkbox
              v-model="condition.status"
              @click="condition.status"
              class="custom-control-success"
              name="check-button"
              switch
          >
            <h6 class="item-price">
              失败终止！
            </h6>
          </b-form-checkbox>
          </b-col>
          <!-- submit and reset -->
          <b-col offset-md="4">
            <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
                class="mr-1"
            >
              Submit
            </b-button>
            <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="reset"
                variant="outline-secondary"
            >
              Reset
            </b-button>
          </b-col>
        </b-row>

      </b-form>
      </validation-observer>
    </b-card>

    <!-- CodeEdit -->
    <b-card
        title="JavaScript 编辑器"
           v-if="condition.action==='JavaScript'"
    >
      <js-edit id="jsEdit-default"
               :get-item="condition.jsContent===null?defalut:condition.jsContent"
      />
      <b-col offset-md="4">
        <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            @click="onSubmit()"
            variant="primary"
            class="mr-1"
            style="position: relative;margin-left: 250px;margin-top: 30px;"
        >
          Submit
        </b-button>
      </b-col>
    </b-card>

  </div>
</template>

<script>
import {
  BFormGroup,BCard, BFormInput, BFormCheckbox, BForm, BButton, BInputGroup, BInputGroupPrepend, BRow, BCol,BFormFile,
  BFormInvalidFeedback,
  BFormValidFeedback,
} from 'bootstrap-vue'
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import CodeEdit from "@/views/apps/web-automation/web-case-scenario-step/CodeEdit";
import JsEdit from "@/views/apps/web-automation/web-case-setting/JsEdit"
import bus from "@/views/apps/web-automation/bus";
import axiosIns from "@/libs/axios";
const {getSettingInformation} = require("@/views/apps/web-automation/web-case-setting/webCaseSettings");
export default {
  name: "WebCaseSettingBefore",

  components: {
    BRow,
    BCard,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BInputGroup,
    BInputGroupPrepend,
    BForm,
    BFormFile,
    BButton,
    vSelect,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
    BFormValidFeedback,
    CodeEdit,
    JsEdit,

  },

  directives: {
    Ripple,
  },


  mounted() {
    bus.$on('getStepLogMessages',(val)=>{this.caseId = val })
    bus.$on('getStepId',(val)=>{this.stepID = val} )
  },

  computed: {
    validation() {
      return this.userId.length > 4 && this.userId.length < 13
    },
    validationOccupation() {
      return this.condition.tagetName.length > 0
    },
  },


  data() {
    return {
      defalut:"window.opener.location.reload()",
      jsCode:'',
      stepID:'',
      condition: {
        id:null,
        stepId:null,
        caseId:null,
        type:null,
        tagetName:'',
        variable:'',
        action:"",
        status:null,
        tagetImage:'',
        jsContent:null,
        elementAction:'',
        elementXpath:'',
      },
      beforeAction: ['元素断言', '文本断言', 'JavaScript'],
      beforeElementAction: ['判断元素是否存在','判断元素是否显示','判断元素是否可写','判断元素是否选中'],
    }
  },


  watch: {
    stepID: function (val) {
      this.fetchConditionByStepId()
    },
    immediate: true,
    deep: true,
  },

  methods: {


    clearFiles() {
      this.$refs['file-input'].reset()
    },

    fetchConditionByStepId() {
      const conditions = {
        stepId:this.stepId,
        caseId:this.caseId.value,
        type:0
      }
      axiosIns.post("/conditionManagement/fetchConditionByStepId", conditions).then(response => {

        if(null!==response.data.data){
          this.condition = response.data.data;
        }

      })
    },


    onSubmit(){
      bus.$on('getStepLogMessages',(val)=>{this.caseId = val }),

          this.jsCode  =  localStorage.getItem('getJscode')

      const conditions = {
        stepId:this.stepID,
        caseId:this.caseId.value,
        type:0,
        tagetName:this.condition.tagetName,
        variable:this.condition.variable,
        varName: '',
        action:this.condition.action,
        status:this.condition.status,
        tagetImage:this.condition.tagetImage,
        jsContent:this.jsCode,
        elementAction:this.condition.elementAction,
        elementXpath:this.condition.elementXpath,
      }
      axiosIns.post("/conditionManagement/saveConditions", conditions).then(() => {

        this.$bvToast.toast('Congratulations: Submit successfully', {
          title: `Variant  success`,
          variant: 'success',
          solid: false,
          toaster: 'b-toaster-bottom-right',
        })
      }, e => {
        this.$bvToast.toast('Note: Submit failed', {
          title: `Variant  fail`,
          variant: 'danger',
          solid: false,
          toaster: 'b-toaster-bottom-right',
        })
      })
    },
  },



}


</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
