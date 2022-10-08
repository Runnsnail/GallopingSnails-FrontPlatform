<template>
  <!-- Need to add height inherit because Vue 2 don't support multiple root ele -->
  <div style="height: inherit">
    <div
        class="body-content-overlay"
        :class="{'show': mqShallShowLeftSidebar}"
        @click="mqShallShowLeftSidebar = false"
    />

    <!-- PageElemnts List -->
    <div class="email-app-list">

      <!-- App Searchbar Header -->
      <div class="app-fixed-search d-flex align-items-center">

        <!-- Toggler -->
        <div class="sidebar-toggle d-block d-lg-none ml-1">
          <feather-icon
              icon="MenuIcon"
              size="21"
              class="cursor-pointer"
              @click="mqShallShowLeftSidebar = true"
          />
        </div>

        <!-- Searchbar -->
        <div class="d-flex align-content-center justify-content-between w-100">
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon
                  icon="SearchIcon"
                  class="text-muted"
              />
            </b-input-group-prepend>
            <b-form-input
                v-model="searchQuery"
                placeholder="Search element"
            />
          </b-input-group>
        </div>
      </div>

      <!-- App Action Bar -->
      <div class="app-action">
        <div
            class="align-items-center d-flex"
        >
          <!-- Element Save Delete Add -->
          <feather-icon
              icon="FolderIcon"
              size="17"
              class="cursor-pointer ml-1"
              @click="savePageElements(pageElements)"
          />

          <feather-icon
              icon="TagIcon"
              size="17"
              class="cursor-pointer ml-1"
              @click="addRowAction"
          />

          <feather-icon
              icon="TrashIcon"
              size="17"
              class="cursor-pointer ml-1"
              @click="movePageElements(pageElements)"
          />

        </div>
      </div>

      <!-- Element List -->
      <vue-perfect-scrollbar
          :settings="perfectScrollbarSettings"
          class="email-user-list scroll-area"
      >
        <web-edit-element
            v-if="DestroyIncomeStatistics"
            :pageElements="pageElements"
            :pageID="pageId"
            ref="WebEditElement"
            @fetch-project-element-id="fetchElementsById"
        />
        <div
            class="no-results"
            :class="{'show': !pageElements.length}"
        >
          <h5>No Items Found</h5>
        </div>
      </vue-perfect-scrollbar>
    </div>


    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <web-left-sidebar
          :projects-id="projectId"
          :class="{'show': mqShallShowLeftSidebar}"
          @close-left-sidebar="mqShallShowLeftSidebar = false"
          @fetch-project-element-id="fetchElementsById"
      />
    </portal>

  </div>
</template>

<script>
import store from '@/store'
import {
  computed,
  ref, watch,
  // ref, watch, computed, onUnmounted,
} from '@vue/composition-api'
import {
  BFormInput, BInputGroup, BInputGroupPrepend, BDropdown, BDropdownItem,
  BFormCheckbox, BMedia, BMediaAside, BMediaBody, BAvatar,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {filterTags, formatDateToMonthShort} from '@core/utils/filter'
import {useResponsiveAppLeftSidebarVisibility} from '@core/comp-functions/ui/app'
import WebLeftSidebar from './WebLeftSidebar.vue'
import webStoreModule from './webStoreModule'
import WebEditElement from "@/views/apps/web-automation/web-test-case/WebEditElement";
import {useWebFiltersPages} from "@/views/apps/web-automation/web-test-case/webFillterPage";
import {useRouter} from "@core/utils/utils";

export default {
  components: {
    WebEditElement,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BDropdown,
    BDropdownItem,
    BFormCheckbox,
    BMedia,
    BMediaAside,
    BMediaBody,
    BAvatar,

    // 3rd Party
    VuePerfectScrollbar,

    // App SFC
    webStoreModule,
    WebLeftSidebar,

  },


  setup() {

    // watch(routeParams, () => {
    //   // eslint-disable-next-line no-use-before-define
    //   fetchEmails()
    // })
    const DestroyIncomeStatistics = ref(false)

    // Elements & ElementsMeta
    const pageElements = ref([])
    // const paramPage = JSON.parse(JSON.stringify(pageElements))
    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    const pageElementData = ref({})
    const {filter, productId, pageId} = useWebFiltersPages()
    const {route} = useRouter()
    let projectId = route.value.params.projectID
    if (typeof (projectId) == "undefined") {
      projectId = productId.value
    }
    const fetchElementsById = (param) => {
      pageId.value = param
      store.dispatch('web-test-case/fetchElementsById', param).then(response => {
            pageElements.value = response.data.data
          }
      )
    }

    // Search Query

    const searchQuery = ref()
    // eslint-disable-next-line no-use-before-define
    watch(searchQuery, () => fetchElements(), {
      deep: true,
    })
    watch(pageElements, () => DestroyIncomeStatistics.value = true, {
      deep: true,
    })

    const fetchElements = () => {
      store.dispatch('web-test-case/fetchElements', {
        q: searchQuery.value,
        page: 1,
        perPage: 5,
        pageId: pageId.value,
      })
          .then(response => {
            pageElementData.value = response.data.data
            pageElements.value = response.data.data.records
          })
    }

    fetchElements()


    // ------------------------------------------------
    // Elements Actions
    // ------------------------------------------------


    const movePageElements = (params) => {

      store.dispatch('web-test-case/movePageElements', params)
          .then(() => {
            fetchElements()
          })
    }

    const savePageElements = (params) => {
      store.dispatch('web-test-case/savePageElements', params).then(() => {
        this.$bvToast.toast('Save: savePageElements successfully', {
          title: `savePageElements  success`,
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

    // Left Sidebar Responsiveness
    const {mqShallShowLeftSidebar} = useResponsiveAppLeftSidebarVisibility()

    return {
      // UI
      perfectScrollbarSettings,
      fetchElementsById,

      // Elements & ElementsMeta
      pageElements,
      pageElementData,
      filter,
      projectId,
      pageId,

      // Elements Actions

      movePageElements,
      savePageElements,


      // Search Query
      searchQuery,
      DestroyIncomeStatistics,

      // UI Filters
      filterTags,
      formatDateToMonthShort,


      // Left Sidebar Responsiveness
      mqShallShowLeftSidebar,
    }
  },

  methods: {
    addRowAction() {
      this.$refs.WebEditElement.repeatAgain();
    },
  }
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
@import "src/@core/scss/base/pages/app-element.scss";
</style>
