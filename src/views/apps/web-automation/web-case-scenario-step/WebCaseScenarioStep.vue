<template>
  <b-card>
    <!-- form -->
    <b-form>
      <b-row>
        <!-- 场景步骤 -->
        <b-col cols="12">
          <div class="d-flex align-items-center mb-2" >
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
<!--            <v-select-->
<!--                id="browser"-->
<!--                v-model="stepObject.action"-->
<!--                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"-->
<!--                label="title"-->
<!--                :options="browserOptions"-->
<!--            />-->
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

        <!-- Action -->
        <b-col cols="6" v-show="stepObject.actionType!==operationName.BrowserOperation||stepObject.actionType!==operationName.CookerOperation">
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

        <b-col
            cols="3" v-show="stepObject.action==='点击'"
        >
          <label for="count">Number of clicks</label>
          <b-form-spinbutton
              id="count"
              v-model="value"
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
                v-model="stepObject.optionData"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="watingTimes"
            />
          </b-form-group>
        </b-col>
        <!-- Operation Object -->
        <b-col md="6" xl="4" v-show="stepObject.actionType!==operationName.BrowserOperation||stepObject.actionType!==operationName.CookerOperation">
          <b-form-group
              label-for="operationObject"
              label="Operation Object"
          >
            <b-form-select
                id="operationObject"
                v-model="pageType"
                :options="pageOption"
            />
<!--            <v-select-->
<!--                id="operationObject"-->
<!--                v-model="stepObject.pageId"-->
<!--                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"-->
<!--                :options="pageOption"-->
<!--            />-->
          </b-form-group>
        </b-col>

        <!-- Operation element -->
        <b-col md="6" xl="4" v-show="pageType!=null&&stepObject.actionType!==operationName.BrowserOperation">
          <b-form-group
              label-for="operationElement"
              label="Operation element"
          >
            <b-form-select
                id="operationElement"
                v-model="elementName"
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

        <!-- CodeEdit -->
        <b-col cols="12" v-show="stepObject.action==='添加cookie信息'">
          <label for="codeArea-default">CodeEdit</label>
          <pre
              v-model="stepObject.optionData"
              id="codeArea-default"
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
              @click="saveStep"
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
  BImg,
  BFormCheckbox,
  BFormSelect,
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
import {watch} from "@vue/composition-api";

export default {
  components: {
    BButton,
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

  props: {
    stepObject: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      countryOption: ['USA', 'India', 'Canada'],
      localOptions: {},
    }
  },

  setup(props, {emit}) {

    const saveStep = () => {
      emit('next-step');
    }

    const {operationName} = getDebugerCase();
    const {watingTimes, watie, actionPotions,cookerPotions, pageType, elementName,browserOptions,pageOption,elementOption} = getStepInformation();


    const fetchElementsList = (param) => {
      store.dispatch('web-scenario/fetchElementsList',param)
          .then(response => {
            // console.log(response)
            elementOption.value = response.data.data
          })
    }

    const fetchPageNamesList = () => {
      store.dispatch('web-scenario/fetchPageNamesList')
          .then(response => {
            // console.log(response)
            pageOption.value = response.data.data
          })
    }

    watch(pageType, () => {
      console.log("pageType:  "+pageType.value)
      fetchElementsList(pageType.value)
    }, {
      deep: true,
    })

    fetchPageNamesList()
    return {
      saveStep,
      watingTimes,
      watie,
      pageType,
      elementName,
      actionPotions,
      cookerPotions,
      operationName,
      browserOptions,
      pageOption,
      elementOption,

      fetchElementsList,
    }
  },
  methods: {

    resetForm() {
      this.localOptions = JSON.parse(JSON.stringify(this.stepObject))
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
</style>
