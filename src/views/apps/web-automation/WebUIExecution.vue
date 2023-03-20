<template>
  <!-- Table Container Card -->
  <b-card
      no-body
  >

    <div class="m-2">

      <!-- Table Top -->
      <b-row>

        <!-- Search -->
        <b-col
            cols="12"
            md="6"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Search..."
            />
            <v-select
                v-model="statusFilter"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="statusOptions"
                class="invoice-filter-select"
                placeholder="Select Status"
            >
              <template #selected-option="{ label }">
                <span class="text-truncate overflow-hidden">
                  {{ label }}
                </span>
              </template>
            </v-select>
          </div>
        </b-col>
      </b-row>
    </div>

    <b-table
        ref="refInvoiceListTable"
        :items="fetchSuitList"
        responsive
        refresh
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
        class="position-relative"
    >

      <template #head(invoiceStatus)>
        <feather-icon
            icon="TrendingUpIcon"
            class="mx-auto"
        />
      </template>

      <!-- Column: Id -->
      <template #cell(id)="data">
        <div class="text-nowrap">
          <b-link
              class="font-weight-bold"
          >
            #{{ data.value }}
          </b-link>
        </div>
      </template>

      <!-- Column: Name -->
      <template #cell(name)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>


      <!-- Column: status -->
      <template #cell(status)="data">
        <template v-if="data.value === 'woking'">
          <b-badge
              pill
              variant="light-warning"
          >
            {{ data.value }}
          </b-badge>
        </template>
        <template v-else-if="data.value === 'ready'">
          <b-badge
              pill
              variant="light-primary"
          >
            {{ data.value }}
          </b-badge>
        </template>
        <template v-else-if="data.value === 'run'">
          <b-badge
              pill
              variant="light-success"
          >
            {{ data.value }}
          </b-badge>
        </template>
      </template>

      <!-- Column: EnvName -->
      <template #cell(envName)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: NotificationType -->
      <template #cell(notificationType)="data">
        <span class="text-nowrap" v-if="data.value === 1">
             微信通知
        </span>
        <span class="text-nowrap" v-if="data.value === 2">
             钉钉通知
        </span>
      </template>

      <!-- Column: Author -->
      <template #cell(author)="data">
        <b-media vertical-align="center">
          <template #aside>
            <b-avatar
                size="32"
                :src="require('@/assets/images/avatars/Abell.jpg')"
                :text="avatarText(data.item.author)"
                :variant="`light-primary`"
            />
          </template>
          <span class="font-weight-bold d-block text-nowrap">
            {{ data.item.author }}
          </span>
        </b-media>
      </template>

      <template #cell(Setting)="data">
        <div class="demo-inline-spacing">
        <b-button variant="relief-success" size="sm"  pill  @click="sendMessage(data)" v-b-modal.modal-work >
          运行
        </b-button>
        <b-button variant="relief-primary" size="sm"  pill   @click="sendMessage(data)"  v-b-modal.modal-env>
          环境设置
        </b-button>
        <b-button variant="relief-primary" size="sm"  pill   @click="sendMessage(data)"  v-b-modal.modal-notic>
          Robot-通知
        </b-button>
        </div>

      </template>

    </b-table>
    <!--    定时设置-->
    <b-modal
        id="modal-work"
        title="定时设置"
        ok-title="执行"
        cancel-variant="outline-secondary"
        @ok="executeScheduled(scheduledTask)"
    >
      <b-form>
        <b-form-group
            label="执行计划"
            label-for="action-name"
        >
          <b-form-input
              id="action-name"
              v-model="scheduledTask.taskName"
              :state="scheduledTask.taskName.length > 0"
              placeholder="请输入名称..."
          />
        </b-form-group>

        <b-form-group
            label="选择类型"
            label-for="vue-select"
        >
          <v-select
              id="vue-select"
              v-model="scheduledTask.type"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="taskType"
          />
        </b-form-group>

        <b-form-group   v-show="scheduledTask.type==='定时执行'">
        <b-form-datepicker
            id="datepicker-buttons"
            v-model="scheduledTask.date"
            menu-class="w-100"
            calendar-width="100%"
            today-button
            reset-button
            close-button
        />
        </b-form-group>

        <b-form-group   v-show="scheduledTask.type!=='立即执行'">
          <b-form-timepicker

              v-model="scheduledTask.timeTamp"
              show-seconds
              locale="en"
          />
        </b-form-group>
      </b-form>
    </b-modal>

    <!--    环境设置-->
    <b-modal
        id="modal-env"
        title="环境设置"
        ok-title="执行"
        cancel-variant="outline-secondary"
        @ok="addEnv(envSet)"
    >
      <b-form>
        <b-form-group
            label="选择环境"
            label-for="vue-select"
        >
          <v-select
              id="vue-select"
              v-model="envSet.name"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="envNames"
          />
        </b-form-group>
      </b-form>
    </b-modal>

<!--    Robot通知-->
    <b-modal
        id="modal-notic"
        title="Robot通知"
        ok-title="保存"
        @ok="addRobot(robort)"
        cancel-variant="outline-secondary"
    >
      <b-form>
        <b-form-group
            label="选择类型"
            label-for="vue-select"
        >
          <v-select
              id="vue-select"
              v-model="robort.name"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="robotTypes"
          />
        </b-form-group>

        <b-form-group
            label="webHood"
            label-for="name"
        >
          <b-form-input
              id="name"
              v-model="robort.tokenId"
              placeholder="tokenId"
          />
        </b-form-group>
        <b-form-group
            v-show="robort.name==='钉钉'"
            label="sign"
            label-for="sign-code"
        >
          <b-form-input
              id="sign-code"
              v-model="robort.secret"
              placeholder="Zip Code"
          />
        </b-form-group>
      </b-form>
    </b-modal>

    <div class="mx-2 mb-2">
      <b-row>

        <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
        </b-col>
        <!-- Pagination -->
        <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >

          <b-pagination
              v-model="currentPage"
              :total-rows="totalInvoices"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
          >
            <template #prev-text>
              <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
              />
            </template>
          </b-pagination>

        </b-col>

      </b-row>
    </div>
  </b-card>
</template>

<script>
import {
  BModal,
  BForm,
  BFormGroup,
  BAlert,
  BAvatar,
  BBadge,
  BButton,
  BCard,
  BCol,
  BDropdown, BDropdownItem,
  BFormInput,BFormTimepicker,
  BLink, BInputGroup,
  BInputGroupAppend,
  BMedia, BPagination,
  BRow,BFormDatepicker,
  BTable, BTooltip
} from 'bootstrap-vue'
import vSelect from "vue-select";
import store from "@/store";
import webUiExectionStore from "@/views/apps/web-automation/webUiExectionStore";
import {onUnmounted, ref} from "@vue/composition-api";
import flatPickr from 'vue-flatpickr-component'
import {avatarText} from "@core/utils/filter";
import WebAddCase from "@/views/apps/web-automation/web-test-suit/WebAddCase";
import getUiExecuitionList from "@/views/apps/web-automation/webUiExecuitionList";
import {getNoParamRequest} from "@/libs/axios";
export default {
  components: {

    BModal,
    BForm,
    BFormGroup,
    BAlert,
    BLink,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    flatPickr,
    BTooltip,
    BFormTimepicker,
    BInputGroup,
    BInputGroupAppend,
    BFormDatepicker,

    vSelect,
    WebAddCase,
  },

  setup(){

    const UI_EXECTION_STORE_MODULE_NAME = 'web-exection'

    const isAddCaseSidebarActive = ref(false)

    const statusOptions = [
      'woking',
      'run',
      'ready',
    ]
    // Register module
    if (!store.hasModule(UI_EXECTION_STORE_MODULE_NAME)) store.registerModule(UI_EXECTION_STORE_MODULE_NAME, webUiExectionStore)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(UI_EXECTION_STORE_MODULE_NAME)) store.unregisterModule(UI_EXECTION_STORE_MODULE_NAME)
    })


    let itemData = ref({})


    const scheduledTask = ref({
      taskName:'',
      type:'',
      date:'',
      timeTamp:'',
    })
    const taskName = ref('')
    const envNames = ref([])
    const robort = ref({
      name:'',
      tokenId:'',
      secret:''
    })
    const robotTypes = ['钉钉','微信']
    const taskType = ['立即执行','定时执行','每天执行']

    const sendMessage = (param) => {
      itemData = param.item
    }

    const addRobot = (robort) =>{

      store.dispatch('web-exection/updateoraddRobot', {
        suiteId:itemData.id,
        tokenId:robort.tokenId,
        secret:robort.secret,
        type:robort.name==='钉钉'? 2:1,
      }).then(
          refetchData
      )
    }

    const addEnv = (param) =>{

      store.dispatch('web-exection/updateEnv', {
        id:itemData.id,
        envId:envSet.value.name.value,
      }).then(
          refetchData
      )
    }

    const executeScheduled = (scheduledTask) => {
      console.log(scheduledTask.type)
      console.log(scheduledTask)
    }


    const getEnvList = () => {
      getNoParamRequest('/EnvNameSetting/getEnvList')
          .then(response => {
            envNames.value = response.data.data
          })
          .catch(error => reject(error))
    }
    getEnvList()

    const {
      deleteCase,
      fetchSuitList,

      tableColumns,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,

      statusFilter,
      suitId,
      caseId,
      envSet,
      refetchData,

      resolveClientAvatarVariant,
    } = getUiExecuitionList()

    return {
      addRobot,
      addEnv,
      executeScheduled,
      deleteCase,
      fetchSuitList,
      tableColumns,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,


      statusFilter,
      suitId,
      caseId,
      taskName,
      statusOptions,
      envNames,
      envSet,
      robotTypes,
      robort,
      scheduledTask,
      taskType,

      refetchData,
      sendMessage,
      isAddCaseSidebarActive,


      avatarText,
      resolveClientAvatarVariant,
    }
  }
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>
