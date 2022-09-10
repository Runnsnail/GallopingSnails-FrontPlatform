<template>
  <b-sidebar
      id="add-team-member-sidebar"
      :visible="isAddMemberSidebarActive"
      bg-variant="white"
      sidebar-class="sidebar-lg"
      shadow
      backdrop
      no-header
      right
      @hidden="resetForm"
      @change="(val) => $emit('update:is-add-member-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add Team Member
        </h5>

        <feather-icon
            class="ml-1 cursor-pointer"
            icon="XIcon"
            size="16"
            @click="hide"
        />

      </div>

      <!-- BODY -->
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

          <!-- Card Title -->
          <validation-provider
              #default="validationContext"
              name="Card Title"
              rules="required"
          >
            <b-form-group
                label="Card Title"
                label-for="cardTitle"
            >
              <b-form-input
                  id="cardTitle"
                  v-model="teamData.cardTitle"
                  autofocus
                  :state="getValidationState(validationContext)"
                  trim
                  placeholder="App Team"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Team Description -->
          <validation-provider
              #default="validationContext"
              name="Team Description"
              rules="required|alpha-num"
          >
            <b-form-group
                label="Team Description"
                label-for="teamDescription"
            >
              <b-form-input
                  id="teamDescription"
                  v-model="teamData.teamDescription"
                  :state="getValidationState(validationContext)"
                  trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Email -->
          <validation-provider
              #default="validationContext"
              name="Team Mail"
              rules="required|email"
          >
            <b-form-group
                label="Team Mail"
                label-for="teamMail"
            >
              <b-form-input
                  id="teamMail"
                  v-model="teamData.teamMail"
                  :state="getValidationState(validationContext)"
                  trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Team Responsibility -->
          <validation-provider
              #default="validationContext"
              name="Team Responsibility"
              rules="required"
          >
            <b-form-group
                label="Team Responsibility"
                label-for="teamResponsibility"
            >
              <b-form-input
                  id="teamResponsibility"
                  v-model="teamData.teamResponsibility"
                  :state="getValidationState(validationContext)"
                  trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!--Team Member -->
          <validation-provider
              #default="validationContext"
              name="Team Member"
              rules="required"
          >
            <b-form-group
                label="Team Member"
                label-for="teamMember"
            >
              <v-select
                  input-id="teamMember"
                  v-model="teamData.teamMember"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  multiple
                  label="title"
                  :options="teamMember"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Team -->
          <validation-provider
              #default="validationContext"
              name="TeamName"
              rules="required"
          >
            <b-form-group
                label="TeamName"
                label-for="teamName"
            >
              <b-form-input
                  id="teamName"
                  v-model="teamData.teamName"
                  :state="getValidationState(validationContext)"
                  trim
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mr-2"
                type="submit"
            >
              Add
            </b-button>
            <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="button"
                variant="outline-secondary"
                @click="hide"
            >
              Cancel
            </b-button>
          </div>

        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {ref} from '@vue/composition-api'
import {required, alphaNum, email} from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import store from '@/store'
import {postRequest} from "@/libs/axios";

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    vSelect,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddMemberSidebarActive',
    event: 'update:is-add-member-sidebar-active',
  },
  props: {
    isAddMemberSidebarActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      required,
      alphaNum,
      email,
    }
  },
  setup(props, {emit}) {
    const blankUserData = {
      teamName: '',
      cardTitle: '',
      teamDescription: '',
      teamResponsibility: '',
      teamMember: null,
      teamMail: '',
    }

    const teamData = ref(JSON.parse(JSON.stringify(blankUserData)))
    const teamMember = ref([])
    const resetuserData = () => {
      teamData.value = JSON.parse(JSON.stringify(blankUserData))
    }

    const onSubmit = () => {
      postRequest("/teamGroup/addMember", teamData.value).then(() => {
        emit('refresh-data')
        emit('update:is-add-member-sidebar-active', false)
      })
    }
    const getTeamList = () => {
      axios.get('/sysUser/getMembers')
          .then(response => {
             teamMember.value = response.data.data.teamMembers
          })
          .catch(error => reject(error))
    }
    getTeamList()
    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetuserData)

    return {
      teamData,
      onSubmit,
      refFormObserver,
      getValidationState,
      resetForm,
      teamMember,
    }
  },
}
</script>

<style lang="scss">
@import 'src/@core/scss/vue/libs/vue-select.scss';

#add-team-member-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
