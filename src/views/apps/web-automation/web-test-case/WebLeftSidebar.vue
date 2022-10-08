<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content email-app-sidebar">
        <div class="email-app-menu">
          <!-- Searchbar -->
          <div class="form-group-compose text-center compose-btn">
            <b-form-group>
              <b-input-group size="sm">
                <b-form-input
                    id="filterInput"
                    v-model="filter.q"
                    type="search"
                    placeholder="Type to Search"
                />
                <b-input-group-append>
                  <b-button
                      :disabled="!filter.q"
                      @click="filter.q = ''"
                  >
                    Clear
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </div>



          <vue-perfect-scrollbar
              :settings="perfectScrollbarSettings"
              class="sidebar-menu-list scroll-area"
          >
            <div class="form-group-compose text-center compose-btn " style="padding-top: 0px;padding-bottom: 0px;">
              <!-- page length -->
              <b-form-group
                  class="text-nowrap mb-md-0 mr-1 "
              >
                <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    v-b-modal.project-page
                    variant="outline-success"
                >
                  ADD NEW PAGE
                </b-button>

              </b-form-group>

            </div>

              <!-- modal PageProject-->
              <b-modal
                  id="project-page"
                  cancel-variant="outline-secondary"
                  ok-title="Add"
                  ok-variant="success"
                  cancel-title="Close"
                  centered
                  title="Add Page"
                  @ok="addNewPage"
              >
                <b-form>
                  <b-form-group>
                    <input v-model="pageProject.projectId=projectCurrent "hidden/>
                    <input v-model="pageProject.isEnable=1 " hidden/>
                    <label for="pageName">PageName:</label>
                    <b-form-input
                        id="pageName"
                        v-model="pageProject.pageName"
                        type="text"
                        placeholder="Email Address"
                    />
                  </b-form-group>
                  <b-form-group>
                    <label for="remark">Remark:</label>
                    <b-form-input
                        id="remark"
                        v-model="pageProject.remark"
                        type="text"
                        placeholder="Password"
                    />
                  </b-form-group>
                </b-form>
              </b-modal>
            <!-- Labels -->
            <h6 class="section-label mt-1 mb-1 px-2">
              Project page
            </h6>

            <b-list-group class="list-group-labels">
              <b-list-group-item
                  v-for="page in projectPages"
                  :key="page.id"
                  @click="$emit('fetch-project-element-id', page.id);$emit('close-left-sidebar')"
              >
                <span
                    class="bullet bullet-sm mr-1"
                    :class="`bullet-success`"
                />
                <span>{{ page.pageName }}</span>
              </b-list-group-item>
            </b-list-group>
            <b-card-body class="d-flex justify-content-between flex-wrap pt-0">
              <b-form-group
                  class="text-nowrap mb-md-0 mr-1 "
              >
                <b-form-select
                    id="perPageSelect"
                    v-model="filter.perPage"
                    size="sm"
                    inline
                    :options="pageOptions"
                />
              </b-form-group>
              <!-- pagination -->
              <div>
                <b-pagination
                    v-model="filter.page"
                    :total-rows="totalRows"
                    :per-page="filter.perPage"
                    :align="selected"
                    size="sm"
                    first-number
                    last-number
                >
                </b-pagination>
              </div>
            </b-card-body>
          </vue-perfect-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {
  BModal,
  VBModal,
  BForm,
  BButton,
  BListGroup,
  BListGroupItem,
  BBadge,
  BTable,
  BAvatar,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput, BInputGroupAppend, BCardBody,
} from 'bootstrap-vue'
import {useWebFiltersPages} from './webFillterPage';
import Ripple from 'vue-ripple-directive';
import BCardCode from "@core/components/b-card-code/BCardCode";
import {ref, watch} from "@vue/composition-api";
import store from '@/store'

export default {
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    projectsId: {
      type: Number,
      required: true,
    },
  },
  components: {

    // BSV
    BButton,
    BListGroup,
    BListGroupItem,
    BBadge,
    BCardCode,
    BTable,
    BAvatar,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BCardBody,
    BModal,
    BForm,

    // 3rd Party
    VuePerfectScrollbar,
  },

  setup(props) {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
    }
    const projectCurrent = props.projectsId

  const addNewPage=(param) =>{
    store.dispatch('web-test-case/addProjectPage', param).then(() => {
      fetchPageProject()
        }
    )
    }
    const {filter, pageOptions, projectPages, totalRows,pageProject} = useWebFiltersPages()
    const fetchPageProject = () => {
      store.dispatch('web-automation/fetchPageProject', {
        q: filter.value.q,
        id: filter.value.id,
        page: filter.value.page,
        perPage: filter.value.perPage,
        projectId: props.projectsId,
      }).then(response => {
            projectPages.value = response.data.data.records
            totalRows.value = response.data.data.total
          }
      )
    }

    fetchPageProject()

    const touchEvent = (param) => {
      this.$emit('fetch-project-element-id', param)
      this.$emit('close-left-sidebar')
    }

    watch(filter, () => {
      fetchPageProject()
    }, {
      deep: true,
    })

    return {
      // UI
      perfectScrollbarSettings,
      fetchPageProject,
      filter,
      touchEvent,
      pageOptions,
      projectPages,
      totalRows,
      projectCurrent,
      addNewPage,
      pageProject,
      selected: 'default',
    }
  },
}
</script>

<style>

</style>
