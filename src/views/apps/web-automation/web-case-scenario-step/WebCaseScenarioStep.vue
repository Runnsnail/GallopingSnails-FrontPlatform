<template>
  <b-card>
    <!-- form -->
    <b-form>
      <b-row>
        <!-- 场景步骤 -->
        <b-col cols="12">
          <div class="d-flex align-items-center mb-2">
            <feather-icon
                icon="ChevronsRightIcon"
                size="18"
            />
            <h4 class="mb-0 ml-75">
              场景步骤
            </h4>

            <b-form-checkbox
                v-model="stepObject.enable"
                @click="stepObject.enable"
                class="custom-control-success"
                name="check-button"
                switch
                style="padding-left: 700px;"
            >
              <span class="switch-icon-left">
                <feather-icon icon="GithubIcon"/>
              </span>
              <span class="switch-icon-right">
                <feather-icon icon="GitlabIcon"/>
              </span>
            </b-form-checkbox>
          </div>
        </b-col>

        <!-- Step Name -->
        <b-col md="6">
          <b-form-group
              label-for="stepName"
              label="Step Name"
          >
            <b-form-input
                id="stepName"
                v-model="stepObject.name"
                placeholder="步骤名称..."
            />
          </b-form-group>
        </b-col>
        <!-- remark -->
        <b-col
            md="6" xl="4"
        >
          <b-form-group
              label="Remark"
              label-for="remark"
          >
            <b-form-input
                id="remark"
                v-model="stepObject.remark"
                placeholder="备注信息..."
            />
          </b-form-group>
        </b-col>

        <!-- Browser Operations -->
        <b-col cols="6" v-show="stepObject.actionType===operationName.BrowserOperation">
          <b-form-group
              label-for="browser"
              label="Browser Operations (select operation) "
          >
            <b-form-select
                id="browser"
                v-model="stepObject.action"
                :options="browserOptions"
            />
          </b-form-group>
        </b-col>

        <!-- Alter Operations -->
        <b-col cols="6" v-show="stepObject.actionType===operationName.AlterOperation">
          <b-form-group
              label-for="browser"
              label="Browser Operations (select operation) "
          >
            <b-form-select
                id="browser"
                v-model="stepObject.action"
                :options="alterOptions"
            />
          </b-form-group>
        </b-col>

        <!-- URL地址 -->
        <b-col
            md="6" xl="4" v-show="stepObject.action==='打开URL'"
        >
          <b-form-group
              label="URL地址"
              label-for="urlAddress"
          >
            <validation-provider
                #default="{ errors }"
                name="URL"
                rules="required|url"
            >
              <b-form-input
                  id="urlAddress"
                  v-model="stepObject.optionData"
                  :state="errors.length > 0 ? false:null"
                  placeholder="https://www.baidu.com/"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- 根据title进行窗口切换 -->
        <b-col
            md="6" xl="4" v-show="stepObject.action==='根据title进行窗口切换'"
        >
          <b-form-group
              label="title name"
              label-for="urlAddress"
          >
            <b-form-input
                id="urlAddress"
                v-model="stepObject.optionData"
                placeholder="Title 名称..."
            />
          </b-form-group>
        </b-col>

        <!-- 根据frame进行窗口切换 -->
        <b-col
            md="6" xl="4" v-show="stepObject.action==='切换iframe'"
        >
          <b-form-group
              label="切换iframe (cssSelector)"
              label-for="iframeName"
          >
            <b-form-input
                id="iframeName"
                v-model="stepObject.optionData"
                placeholder="cssSelector 选择器..."
            />
          </b-form-group>
        </b-col>


        <!-- Action -->
        <b-col cols="6"
               v-show="isShowOther(stepObject.actionType)">
          <b-form-group
              label-for="action"
              label="Action (select operation) "
          >
            <v-select
                id="action"
                v-model="stepObject.action"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="actionPotions"
            />
          </b-form-group>
        </b-col>

        <!-- mouseAction -->
        <b-col cols="6"
               v-show="stepObject.actionType===operationName.MouseOperation">
          <b-form-group
              label-for="action"
              label="Action (select operation) "
          >
            <v-select
                id="action"
                v-model="stepObject.action"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="actionMousePotions"
            />
          </b-form-group>
        </b-col>

        <!-- KeyboardAction -->
        <b-col cols="6"
               v-show="stepObject.actionType===operationName.KeyboardOperation">
          <b-form-group
              label-for="action"
              label="Action (select operation) "
          >
            <v-select
                id="action"
                v-model="stepObject.action"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="actionKeysPotions"
            />
          </b-form-group>
        </b-col>

        <!-- FileAction -->
        <b-col cols="6"
               v-show="stepObject.actionType===operationName.FileOperation">
          <b-form-group
              label-for="action"
              label="Action (select operation) "
          >
            <v-select
                id="action"
                v-model="stepObject.action"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="filePotions"
            />
          </b-form-group>
        </b-col>

        <!-- 上传文件路径URL -->
        <b-col
            md="6" xl="4" v-show="stepObject.actionType===operationName.FileOperation"
        >
          <b-form-group
              label="File path"
              label-for="urlAddress"
          >
            <b-form-input
                id="urlFile"
                v-model="stepObject.optionData"
                placeholder="C:\GollpingSnailWork\logo.png"
            />
          </b-form-group>
        </b-col>

        <!-- JsAction -->
        <b-col cols="6"
               v-show="stepObject.actionType===operationName.JSOperation">
          <b-form-group
              label-for="action"
              label="Action (select operation) "
          >
            <v-select
                id="action"
                v-model="stepObject.action"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="actionJsPotions"
            />
          </b-form-group>
        </b-col>

        <!-- js给指定元素value赋值 -->
        <b-col
            md="6" xl="4" v-show="stepObject.action==='js给指定元素value赋值'"
        >
          <b-form-group
              label="指定元素 (value)"
              label-for="iframeName"
          >
            <b-form-input
                id="iframeName"
                v-model="stepObject.optionData"
                placeholder="value..."
            />
          </b-form-group>
        </b-col>

        <b-col
            cols="3" v-show="stepObject.action==='点击'"
        >
          <label for="count">Number of clicks</label>
          <b-form-spinbutton
              id="count"
              v-model="stepObject.counts"
              min="1"
              max="100"
          />
        </b-col>

        <!-- cooker -->
        <b-col
            cols="6" v-show="stepObject.actionType===operationName.CookerOperation"
        >
          <b-form-group
              label="Add Cooker"
              label-for="cooker"
          >
            <v-select
                id="action"
                v-model="stepObject.action"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="cookerPotions"
            />
          </b-form-group>
        </b-col>

        <!-- wating -->
        <b-col
            cols="3"
        >
          <b-form-group
              label="Watie Time (单位: s)"
              label-for="wating"
          >
            <v-select
                id="action"
                v-model="stepObject.waite"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="watingTimes"
            />
          </b-form-group>
        </b-col>

        <!-- 根据title进行窗口切换 -->
        <b-col
            md="6" xl="4" v-show="stepObject.action==='根据cookie名称删除cookie'"
        >
          <b-form-group
              label="cooker name"
              label-for="urlAddress"
          >
            <b-form-input
                id="urlAddress"
                v-model="stepObject.optionData"
                placeholder="Cooker 名称..."
            />
          </b-form-group>
        </b-col>

        <!-- CodeVariable -->
        <b-col cols="4"
               v-show="stepObject.action==='添加cookies信息'"
        >
          <b-card
              no-body
              class="mb-4 my-xl-0"
          >
            <b-list-group flush>
              <b-list-group-item
                  v-for="data in cookerVariable"
                  :key="data.text"
                  @click="showCodeEdit(data.value)"
              >
                {{ data.text }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>

        <!-- CodeEdit -->
        <b-col cols="8"
               v-show="stepObject.action==='添加cookies信息'"
        >
          <code-edit id="codeEdit-default" :json-code="stepObject.optionData===null?'1':stepObject.optionData"/>
        </b-col>

        <!-- Operation Object -->
        <b-col md="6" xl="4"
               v-show="isShowJs(stepObject.action)">
          <b-form-group
              label-for="operationObject"
              label="Operation Object"
          >
            <b-form-select
                id="operationObject"
                v-model="stepObject.page.value"
                @change="fetchElementsList(stepObject.page.value)"
                :options="pageOption"
            />
          </b-form-group>
        </b-col>

        <!-- Operation Object -->
        <b-col md="6" xl="4"
               v-show="stepObject.actionType!==operationName.BrowserOperation&&
               stepObject.actionType!==operationName.CookerOperation&&
               stepObject.actionType!==operationName.JSOperation&&
               stepObject.actionType!==operationName.KeyboardOperation&&
               stepObject.actionType!==operationName.AlterOperation
">
          <b-form-group
              label-for="operationObject"
              label="Operation Object"
          >
            <b-form-select
                id="operationObject"
                v-model="stepObject.page.value"
                @change="fetchElementsList(stepObject.page.value)"
                :options="pageOption"
            />
          </b-form-group>
        </b-col>

        <!-- Operation element -->
        <b-col md="6" xl="4" v-show="stepObject.page.value!=null&&
        stepObject.actionType!==operationName.BrowserOperation&&
        stepObject.action!=='滚动到窗口最上方'&&
        stepObject.action!=='滚动到窗口最下方'&&
        stepObject.actionType!==operationName.CookerOperation">
          <b-form-group
              label-for="operationElement"
              label="Operation element"
          >
            <b-form-select
                id="operationElement"
                v-model="stepObject.element.value"
                :options="elementOption"
            />
          </b-form-group>
        </b-col>

        <!-- Text -->
        <b-col cols="12" v-show="stepObject.action==='输入'">
          <label for="textarea-default">Textarea</label>
          <b-form-textarea
              v-model="stepObject.optionData"
              id="textarea-default"
              placeholder="Textarea"
              rows="2"
          />
        </b-col>


        <b-col cols="12">
          <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mt-1 mr-1"
              @click="saveStep"
          >
            Save StepInfor
          </b-button>
          <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              class="mt-1"
              variant="outline-secondary"
              @click="nextSeting"
          >
            Setting
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BCard,
  BFormTextarea,
  BFormSpinbutton,
  BFormCheckbox,
  BFormSelect, BListGroup, BListGroupItem,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
import Cleave from 'vue-cleave-component'

// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'
import {getStepInformation} from "@/views/apps/web-automation/web-case-scenario-step/webScenarioStep";
import {getDebugerCase} from "@/views/apps/web-automation/web-test-suit/webDebugCaseList";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import store from "@/store";
import {ref, watch} from "@vue/composition-api";
import CodeEdit from "@/views/apps/web-automation/web-case-scenario-step/CodeEdit";
import {
  required, email, confirmed, url, between, alpha, integer, password, min, digits, alphaDash, length,
} from '@validations'
export default {

  props: {
    stepObject: {
      type: Object,
      required: true,
    }
  },

  components: {
    CodeEdit,
    BButton,
    BListGroup,
    BListGroupItem,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BFormCheckbox,
    BFormTextarea,
    ValidationProvider,
    ValidationObserver,

    vSelect,
    flatPickr,
    Cleave,
    BFormSpinbutton,
    BFormSelect,

  },
  directives: {
    Ripple,
  },

  setup(props, {emit}) {

    const nextSeting = () => {
      emit('next-step');
    }

    const {operationName} = getDebugerCase();
    const {
      watingTimes,
      watie,
      actionPotions,
      actionJsPotions,
      filePotions,
      actionKeysPotions,
      actionMousePotions,
      cookerPotions,
      cookerVariable,
      browserOptions,
      alterOptions,
      pageOption,
      elementOption
    } = getStepInformation();


    const jsVar = ['JS点击', 'js给指定元素value赋值', 'js使元素隐藏元素显示','滚动到某个元素'];

    const actionTypeVar = ['Cooker操作', '浏览器操作', 'JS操作','鼠标操作','键盘操作','弹窗操作','文件操作'];

    const isShowJs = (param) => {
      for (const i in jsVar) {
        if(jsVar[i]===param){return true};
      }
      return false;
    }

    const isShowOther = (param) => {
      for (const i in actionTypeVar) {
        if(actionTypeVar[i]===param){return false};
      }
      return true;
    }

    const iniPageType = (param) => {
      param=null;
    }


    const fetchElementsList = (param) => {
      store.dispatch('web-scenario/fetchElementsList', param)
          .then(response => {
            elementOption.value = response.data.data
          })
    }

    const fetchPageNamesList = () => {
      store.dispatch('web-scenario/fetchPageNamesList')
          .then(response => {
            pageOption.value = response.data.data
          })
    }



    fetchPageNamesList()
    return {
      nextSeting,
      watingTimes,
      watie,
      actionPotions,
      actionJsPotions,
      filePotions,
      actionKeysPotions,
      actionMousePotions,
      cookerPotions,
      cookerVariable,
      operationName,
      browserOptions,
      alterOptions,
      pageOption,
      elementOption,

      fetchElementsList,
      // showCodeEdit,
      isShowJs,
      isShowOther,
      iniPageType,
    }
  },
  methods: {

    resetForm() {
      this.localOptions = JSON.parse(JSON.stringify(this.stepObject))
    },

     showCodeEdit(param) {
      this.stepObject.optionData=param;
    },

    saveStep () {
      const iniStep = {
        id: this.stepObject.id,
        name: this.stepObject.name,
        actionType: this.stepObject.actionType,
        action: this.stepObject.action,
        waite:this.stepObject.waite,
        counts:this.stepObject.counts,
        pageId: this.stepObject.page.value,
        elementId: this.stepObject.element.value,
        remark: this.stepObject.remark,
        optionData: this.stepObject.optionData,
        enable: this.stepObject.enable
      }
      console.log(iniStep.value)
      store.dispatch('web-scenario/saveStepInformation', iniStep)
          .then(() => {
            this.$bvToast.toast('Congratulations: Save successfully', {
              title: `Variant  success`,
              variant: 'success',
              solid: false,
              toaster: 'b-toaster-bottom-right',
            })
          }, e => {
            this.$bvToast.toast('Note: Save failed', {
              title: `Variant  fail`,
              variant: 'danger',
              solid: false,
              toaster: 'b-toaster-bottom-right',
            })
          })
    }
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
</style>
