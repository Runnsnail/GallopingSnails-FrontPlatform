<template>
  <div >
    <b-sidebar
        id="sidebar-task-handler"
        sidebar-class="sidebar-lg"
        :visible="isAddCaseSidebarActive"
        bg-variant="white"
        shadow
        backdrop
        no-header
        right
        @change="(val) => $emit('update:is-add-case-sidebar-active', val)"
        @hidden="resetForm"
    >
  <template #default="{ hide }">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
      <h5
          class="mb-0"
      >
        {{ caseId===0 ? 'Add Case' : ' Update Case ' }}
      </h5>

        <feather-icon
            class="ml-1 cursor-pointer"
            icon="XIcon"
            size="16"
            @click="hide"
        />

    </div>

    <div class="bg-light-primary rounded-top text-center">
      <b-img
          :src="require('@/assets/images/illustration/email.svg')"
          alt="Meeting Pic"
          height="170"
      />
    </div>
    <!-- Body -->
    <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
    >

      <!-- Form -->
      <b-form
          class="p-2"
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
      >

        <!-- Case Name -->
        <validation-provider
            #default="validationContext"
            name="Case Name"
            rules="required"
        >
          <b-form-group
              label="Case Name"
              label-for="case-name"
          >
            <b-form-input
                id="case-name"
                v-model="caseData.caseName"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Case Name"
            />

            <b-form-invalid-feedback>
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <!-- Project Name -->
        <b-form-group
            label="ProjectName"
            label-for="project"
        >
          <v-select
              v-model="caseData.projectName"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="projectNames"
              input-id="project"
          >
          </v-select>
          <div class="mt-1">
            Selected: <strong>{{ caseData.projectName.value}}</strong>
          </div>
        </b-form-group>


        <!-- Status -->
        <b-form-group
            label="Status"
            label-for="status"
        >
          <v-select
              v-model="caseData.status"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="status"
              input-id="status"
          >
          </v-select>
        </b-form-group>

        <!-- TeamName -->
        <b-form-group
            label="TeamName"
            label-for="teamName"
        >
          <v-select
              v-model="caseData.teamName"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="teamNames"
              input-id="teamName"
          >
          </v-select>
        </b-form-group>


        <!--EnvOptions -->
        <b-form-group
            label="EnvOptions"
            label-for="env"
        >
          <v-select
              v-model="caseData.envName"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="envOptions"
              input-id="env"
          />
        </b-form-group>

        <!-- Description -->

        <!-- Form Actions -->
        <div class="d-flex mt-2">
          <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
          >
            {{ caseId===0 ? 'Add' : 'Update ' }}
          </b-button>
          <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="outline-secondary"
          >
            Reset
          </b-button>
        </div>
      </b-form>
    </validation-observer>
  </template>
    </b-sidebar>
  </div>
</template>

<script>
import {
  BAvatar,
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BFormSelect, BImg,
  BSidebar
} from "bootstrap-vue";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import {quillEditor} from "vue-quill-editor";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import { required, url} from "@core/utils/validations/validations";
import {ref, toRefs} from "@vue/composition-api";
import formValidation from "@core/comp-functions/forms/form-validation";
import Ripple from "vue-ripple-directive";
import axiosIns, {getNoParamRequest} from "@/libs/axios";
import {getDebugerCase} from "@/views/apps/web-automation/web-test-suit/webDebugCaseList";

export default {
  name: "WebAddCase",

  components: {
    // BSV
    BButton,
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BAvatar,
    BFormInvalidFeedback,
    BFormSelect,
    BImg,

    // 3rd party packages
    vSelect,
    flatPickr,
    quillEditor,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },

  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddCaseSidebarActive',
    event: 'update:is-add-case-sidebar-active',
  },

  props: {
    suitId: {
      type: Number,
      required: true,
    },
    caseId: {
      type: Number,
      required: true,
    },
    isAddCaseSidebarActive: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      required,
      url,
    }
  },
  setup(props, { emit }) {

    const blankCaseData = {
      suitId: props.suitId,
      caseId: props.caseId,
      envName: {
        label:'',
        value:'',
      },
      projectName:  {
        label:'',
        value:'',
      },
      caseName: '',
      status: {
        label:'',
        value:'',
      },
      teamName:  {
        label:'',
        value:'',
      },
    }


    const caseData = ref(JSON.parse(JSON.stringify(blankCaseData)))

    const resetCaseData = () => {
      caseData.value = JSON.parse(JSON.stringify(blankCaseData))
    }
    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetCaseData)

    const {envOptions,status,teamNames,projectNames} = getDebugerCase()

    const caseParams = ref(
    {
      suitId: props.suitId,
      caseId: props.caseId,
        projectName: caseData.value.projectName.value,
        envName: caseData.value.envName.value,
        caseName:caseData.value.caseName,
        status: caseData.value.status.value,
        teamName: caseData.value.teamName.value,
    })


    const onSubmit = () => {
      axiosIns.post("/TestcaseUiNew/addOrEdit", {
        suitId: props.suitId,
        caseId: props.caseId,
        projectName: caseData.value.projectName.value,
        envName: caseData.value.envName.value,
        caseName:caseData.value.caseName,
        status: caseData.value.status.value,
        teamName: caseData.value.teamName.value,
      }).then(response => {
        emit('update:is-add-case-sidebar-active', false)
      })
    }

    const getEnvList = () => {
      getNoParamRequest('/TestcaseUiNew/getUiEnv')
          .then(response => {
            envOptions.value = response.data.data
          })
          .catch(error => reject(error))
    }

    const getTeamNameList = () => {
      getNoParamRequest('/teamGroup/getTeamNameList')
          .then(response => {
            teamNames.value = response.data.data
          })
          .catch(error => reject(error))
    }

    const getProjectNameList = () => {
      getNoParamRequest('/ProjectMember/getProjectNameList')
          .then(response => {
            projectNames.value = response.data.data
          })
          .catch(error => reject(error))
    }
    getEnvList()
    getTeamNameList()
    getProjectNameList()


    return {
      // Add New
      caseData,
      onSubmit,
      status,
      envOptions,
      teamNames,
      projectNames,
      caseParams,


      // Form Validation
      refFormObserver,
      getValidationState,
      resetForm,

    }
  },
}


</script>

<style scoped>

</style>
