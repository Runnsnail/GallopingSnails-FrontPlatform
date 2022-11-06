<template>
  <!-- Table Container Card -->
  <b-card
      no-body
  >

    <div class="m-2">

      <!-- Table Top -->
      <b-row>

        <!-- Per Page -->
        <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <b-button
              variant="primary"
              @click="isAddCaseSidebarActive = true"
          >
            Add TestCase
          </b-button>
          <div>
            <web-add-case
                :is-add-case-sidebar-active.sync="isAddCaseSidebarActive"
                :suit-id="suitId"
                :case-id="caseId"
            />


          </div>
        </b-col>

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
        :items="fetchCasesList"
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
          <b-dropdown
              variant="link"
              toggle-class="p-0"
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
            <b-dropdown-item>
              <feather-icon
                  icon="TrashIcon"
              />
              <span class="align-middle ml-50" @click="deleteCase(data.item.id)">Remove</span>
            </b-dropdown-item>
            <b-dropdown-item>
              <feather-icon
                  icon="EyeIcon"
              />
              <span class="align-middle ml-50" @click="$router.push({ name: 'web-case-edit', params: { id: data.item.caseId }})">Show</span>
            </b-dropdown-item>
          </b-dropdown>
        <b-link
            @click="handleCaseClick(data.value)"
            class="font-weight-bold"
        >
          #{{ data.value }}
        </b-link>
        </div>
      </template>

      <!-- Column: caseName -->
      <template #cell(name)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: case Status -->
      <template #cell(status)="data">
        <b-avatar
            :id="`invoice-row-${data.item.id}`"
            size="32"
            :variant="`light-${resolveInvoiceStatusVariantAndIcon(data.item.status).variant}`"
        >
          <feather-icon
              :icon="resolveInvoiceStatusVariantAndIcon(data.item.status).icon"
          />
        </b-avatar>
        <b-tooltip
            :target="`invoice-row-${data.item.id}`"
            placement="top"
        >
          <p class="mb-0">
            {{ data.item.status }}
          </p>
          <p class="mb-0">
            TeamName: {{ data.item.teamName }}
          </p>
          <p class="mb-0">
            ProjectName: {{ data.item.projectName }}
          </p>
          <p class="mb-0">
            Env: {{ data.item.envName }}
          </p>
        </b-tooltip>
      </template>

      <!-- Column: TeamName -->
      <template #cell(teamName)="data">
        <template v-if="data.value === 0">
          <b-badge
              pill
              variant="light-warn"
          >
            暂定
          </b-badge>
        </template>
        <template v-else>
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

      <!-- Column: ProjectName -->
      <template #cell(projectName)="data">
        <span class="text-nowrap">
          {{ data.value }}
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
                :variant="`light-${resolveClientAvatarVariant(data.item.status)}`"
            />
          </template>
          <span class="font-weight-bold d-block text-nowrap">
            {{ data.item.author }}
          </span>
        </b-media>
      </template>


    </b-table>
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
  BAlert,
  BAvatar,
  BBadge,
  BButton,
  BCard,
  BCol,
  BDropdown, BDropdownItem,
  BFormInput,
  BLink,
  BMedia, BPagination,
  BRow,
  BTable, BTooltip
} from 'bootstrap-vue'
import vSelect from "vue-select";
import store from "@/store";
import webDebugCaseStore from "@/views/apps/web-automation/web-test-suit/webDebugCaseStore";
import {onUnmounted, ref} from "@vue/composition-api";
import {avatarText} from "@core/utils/filter";
import getSuitCaseList from "@/views/apps/web-automation/web-test-suit/webDebugCaseList";
import WebAddCase from "@/views/apps/web-automation/web-test-suit/WebAddCase";
export default {
  components: {
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
    BTooltip,

    vSelect,
    WebAddCase,
  },

  setup(){

    const INVOICE_APP_STORE_MODULE_NAME = 'web-case'

    const isAddCaseSidebarActive = ref(false)

    const statusOptions = [
      'draft',
      'used',
      'deprecated',
    ]
    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, webDebugCaseStore)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    })

    const handleCaseClick = caseData => {
      caseId.value = caseData
      isAddCaseSidebarActive.value = true
    }

    const {
      deleteCase,
      fetchCasesList,
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
      refetchData,

      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    } = getSuitCaseList()

    return {
      deleteCase,
      fetchCasesList,
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
      statusOptions,

      refetchData,
      handleCaseClick,
      isAddCaseSidebarActive,


      avatarText,
      resolveInvoiceStatusVariantAndIcon,
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
