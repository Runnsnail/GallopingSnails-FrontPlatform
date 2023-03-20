<template>
  <div>
  <b-form-group>
    <v-select
        v-model="condition.action"
        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
        label="title"
        :options="afterAction"
        class="select-size-lg"
    />
  </b-form-group>

  <b-card
      title="提交表单"
      v-if="condition.action==='文本断言'||condition.action === '元素断言'||condition.action==='数据提取'"
  >
      <b-form @submit.prevent="onSubmit()">
        <b-row>
          <b-col cols="12" v-if="condition.action==='文本断言'">

              <b-form-group
                  label="判断变量"
                  label-for="judgment-variable"
                  label-cols-md="4"
              >
                <b-input-group class="input-group-merge"  :class="validationVariable ? 'is-valid' : 'is-invalid'">
                  <b-input-group-prepend is-text>
                    <feather-icon icon="ActivityIcon"/>
                  </b-input-group-prepend>
                  <b-form-input
                      id="judgment-variable"
                      v-model="condition.variable"
                      :state="validationVariable"
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
                <b-input-group class="input-group-merge"  :class="validationOccupation ? 'is-valid' : 'is-invalid'">
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
          <!--数据提取-->
          <b-col cols="12" v-if="condition.action==='数据提取'">
            <b-form-group
                label="xpath path"
                label-for="xpath-value"
                label-cols-md="4"
            >
              <b-input-group class="input-group-merge"  :class="validationXpath ? 'is-valid' : 'is-invalid'">
                <b-input-group-prepend is-text>
                  <feather-icon icon="SmartphoneIcon"/>
                </b-input-group-prepend>
                <b-form-input
                    id="xpath-value"
                    :state="validationXpath"
                    v-model="condition.elementXpath"
                    placeholder="/html/body/div[2]/div[1]/div/div/div/a"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="12" v-if="condition.action==='数据提取'">
            <b-form-group
                label="变量名称"
                label-for="data-value"
                label-cols-md="4"
            >
              <b-input-group class="input-group-merge"  :class="validationVar ? 'is-valid' : 'is-invalid'">
                <b-input-group-prepend is-text>
                  <feather-icon icon="BookmarkIcon"/>
                </b-input-group-prepend>
                <b-form-input
                    id="data-value"
                    :state="validationVar"
                    v-model="condition.varName"
                    placeholder="..."
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
                    :options="afterElementAction"
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
                <b-input-group class="input-group-merge"  :class="validationXpath ? 'is-valid' : 'is-invalid'">
                  <b-input-group-prepend is-text>
                    <feather-icon icon="SmartphoneIcon"/>
                  </b-input-group-prepend>
                  <b-form-input
                      id="xpath-value"
                      :state="validationXpath"
                      v-model="condition.elementXpath"
                      placeholder="/html/body/div[2]/div[1]/div/div/div/a"
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
  </b-card>
  <!--图片断言-->
  <div v-if="condition.action==='图片断言'">
    <b-form-file
        ref="fileInput"
        v-model="file"
        class="mb-2"
        @input="inputImageRenderer"
    />

    <b-button
        class="mr-2"
        variant="primary"
        @click="clearFiles"
    >
      Reset tagetImage
    </b-button>
    <b-button
        variant="primary"
        @click="$refs.fileInput.click()"
    >
      Upload
    </b-button>

    <b-img
        thumbnail fluid
        :src="tagetImageUrl"
        @click="showImgViewer(tagetImageUrl)"
    />
    <el-image-viewer
        v-if="imgViewerVisible"
        :on-close="closeImgViewer"
        :url-list="[tagetImageUrl]"/>

  </div>

  <!-- CodeEdit -->
  <b-card
      title="JavaScript 编辑器"
      v-if="condition.action==='JavaScript'"
  >
    <js-edit id="jsEdit-default"
             :get-item="condition.jsContent===null?defalut:condition.jsContent"
    />
  </b-card>
  </div>
</template>

<script>
import {
  BFormGroup,BCard, BFormInput, BFormCheckbox, BForm, BButton, BInputGroup, BInputGroupPrepend, BRow, BCol,BFormFile,
  BFormInvalidFeedback,BImg,
  BFormValidFeedback,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import CodeEdit from "@/views/apps/web-automation/web-case-scenario-step/CodeEdit";
import JsEdit from "@/views/apps/web-automation/web-case-setting/JsEdit";
import bus from "@/views/apps/web-automation/bus";
const {getSettingInformation, useInputImageRenderer} = require("@/views/apps/web-automation/web-case-setting/webCaseSettings");
const {ValidationProvider, ValidationObserver} = require("vee-validate");
import { ref } from '@vue/composition-api'
import axiosIns from "@/libs/axios";

export default {
  name: "WebCaseSettingAfter",

  components: {
    BRow,
    BCol,
    BCard,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BInputGroup,
    BInputGroupPrepend,
    BForm,
    BFormFile,
    BButton,
    ElImageViewer,
    BImg,
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
    validationVariable() {
      return this.condition.variable.length > 1
    },
    validationOccupation() {
      return this.condition.tagetName.length > 1
    },
    validationXpath(){
      return this.condition.elementXpath.length > 1
    },
    validationVar(){
      return this.condition.varName.length > 1
    }
  },

  setup(){

    const fileInput = ref(null)
    const tagetImageUrl = ref(null)
    const file = []
    let stepNameId = null
    bus.$on('getStepId',(val)=>{stepNameId = val} )
    let baseFile = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(fileInput, base64 => {
      // eslint-disable-next-line no-param-reassign
      baseFile= base64

      axiosIns.post("/conditionManagement/saveImag", {
        baseFile:baseFile,
        conditionName:stepNameId
      }).then(response => {

        tagetImageUrl.value = response.data.data;
        this.onSubmit()

      })

    })



    return{
      file,
      fileInput,
      tagetImageUrl,
      inputImageRenderer,
    }
  },


  data() {
    return {
      defalut:"window.opener.location.reload()",
      jsCode:'',
      imgViewerVisible:false,
      condition: {
        id:null,
        stepId:null,
        caseId:null,
        type:null,
        tagetName:'',
        variable:'',
        varName:'',
        action:'',
        status:null,
        tagetImage:'',
        jsContent:null,
        elementAction:'',
        elementXpath:'',
      },
      afterAction: [ '元素断言' ,  '数据提取' , '文本断言' , '图片断言', 'JavaScript' ],
      afterElementAction: ['判断元素是否存在','判断元素是否显示','判断元素是否可写','判断元素是否选中'],
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

    showImgViewer (param) {
      this.imgViewerVisible = true;

      const m = (e) => {
        e.preventDefault()
      };
      document.body.style.overflow = 'hidden';
      document.addEventListener("touchmove", m, false); // 禁止页面滑动

    },

    closeImgViewer () {
      this.imgViewerVisible = false;
      const m = (e) => {
        e.preventDefault()
      };
      document.body.style.overflow = 'auto';
      document.removeEventListener("touchmove", m, true);
    },


    fetchConditionByStepId() {
      const conditions = {
        stepId:this.stepId,
        caseId:this.caseId.value,
        type:1
      }
      axiosIns.post("/conditionManagement/fetchConditionByStepId", conditions).then(response => {

        if(null!==response.data.data){
          this.condition = response.data.data;
        }

      })
    },

    onSubmit(){
      const conditions = {
        stepId:this.stepID,
        caseId:this.caseId.value,
        type:1,
        tagetName:this.tagetImageUrl,
        variable:this.condition.variable,
        varName: this.condition.varName,
        action:this.condition.action,
        status:this.condition.status,
        tagetImage:this.condition.tagetImage,
        jsContent:this.condition.jsContent,
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
