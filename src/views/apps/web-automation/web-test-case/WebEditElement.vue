export const codeBasic = `
<template>
  <div>
    <div>
      <b-form
          ref="form"
          :style="{height: trHeight}"
          class="repeater-form"
          @submit.prevent="repeatAgain"
      >
        <!-- Row Loop -->
        <b-row
            v-for="(pageElement, index) in pageElements"
            :id="pageElement.id"
            :key="index"
            ref="row"
            class="mx-2 my-sm-1"
        >

          <!-- Element action -->
          <b-col md="2">
            <b-form-group
                label="Element action"
                label-for="element-action"
            >
              <b-form-input
                  id="element-action"
                  v-model="pageElement.elementName"
                  type="text"
                  placeholder="The drop-down menu"
              />
            </b-form-group>
          </b-col>

          <!-- Positioning way -->
          <b-col md="2">
            <b-form-group
                label="Positioning way"
                label-for="positioning-way"
            >
              <b-dropdown
                  id="positioning-way"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  :text="pageElement.byType"
                  right
                  variant="outline-primary"
              >
                <b-dropdown-item
                    v-for="actionOption in actionOptions"
                    :key="actionOption.value"
                    @click="pageElement.byType=actionOption.value"
                >
                  {{ actionOption.text }}
                </b-dropdown-item>
              </b-dropdown>
<!--              <b-form-input-->
<!--                  id="positioning-way"-->
<!--                  v-model="pageElement.byType"-->
<!--                  type="text"-->
<!--                  placeholder="xpath or css or id..."-->
<!--              />-->
            </b-form-group>
          </b-col>

          <!-- Positioning -->
          <b-col md="4">
            <b-form-group
                label="Positioning"
                label-for="positioning"
            >
              <b-form-input
                  id="positioning"
                  v-model="pageElement.byValue"
                  type="text"
                  placeholder="...class"
              />
            </b-form-group>
          </b-col>

          <!-- Profession -->
          <b-col md="2">
            <b-form-group
                label="Describe"
                label-for="describe"
            >
              <b-form-input
                  id="describe"
                  v-model="pageElement.remark"
                  type="text"
                  placeholder="..."
              />
              <b-form-input
                  id="describe"
                  v-model="pageElement.pageId =pageID"
                  type="text"
                  placeholder="..."
                  hidden
              />
            </b-form-group>
          </b-col>


          <!-- Enable -->
          <b-col md="1">
            <b-form-group
                label="Enable"
                label-for="enable"
            >
              <b-form-checkbox

                  v-model="pageElement.isEnable = Enable ? 1 : 0"
                  @click="Enable = !Enable"
                  class="custom-control-success"
                  name="check-button"
                  switch
              >
          <span class="switch-icon-left">
            <feather-icon icon="BellIcon"/>
          </span>
                <span class="switch-icon-right">
            <feather-icon icon="BellOffIcon"/>
          </span>
              </b-form-checkbox>
            </b-form-group>
          </b-col>


          <!-- Dropdown -->
          <b-col md="1">
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
            <b-dropdown-item @click="saveElement(pageElement)" >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Save</span>
            </b-dropdown-item>
            <b-dropdown-item @click="removeItem(index,pageElement.id)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
            <b-dropdown-item @click="duplicateElement(pageElement)">
              <feather-icon icon="CopyIcon" />
              <span class="align-middle ml-50">Duplicate</span>
            </b-dropdown-item>
          </b-dropdown>
          </b-col>
          <b-col cols="12">
            <hr>
          </b-col>
        </b-row>

      </b-form>
    </div>
  </div>
</template>

<script>
import {
  BForm, BFormGroup, BFormInput, BRow, BCol, BButton, BCardText, BFormCheckbox, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import {heightTransition} from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import BCardCode from "@core/components/b-card-code";
import store from "@/store";
import {useWebFiltersPages} from "@/views/apps/web-automation/web-test-case/webFillterPage";
export default {
  components: {
    BForm,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BDropdown,
    BDropdownItem,
    BCardCode,
    BCardText,
    BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  props: {
    pageElements: {
      type: Array,
      required: true,
    },
    pageID: {
      type: Number,
      required: true,
}
  },
  mixins: [heightTransition],
  data() {
    return {
      nextTodoId: 2,
      Enable: true,
    }
  },
  mounted() {
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },

  setup(){
    const {actionOptions} = useWebFiltersPages()

    return {actionOptions}
},
  methods: {

    repeatAgain() {
      this.pageElements.push({
        id: this.nextTodoId += this.nextTodoId,
        elementName: '',
        byType: '',
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem(index,param) {
      this.pageElements.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
      store.dispatch('web-test-case/removeItemElement', param).then(() => {
            this.$bvToast.toast('removeItemElement: remove successfully', {
              title: `👋 removeItemElement  success`,
              variant: 'success',
              solid: false,
              toaster: 'b-toaster-bottom-right',
            })

          }, e => {
            this.$bvToast.toast('Note: remove failed', {
              title: `Variant  fail`,
              variant: 'danger',
              solid: false,
              toaster: 'b-toaster-bottom-right',
            })
          }
      )
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
      this.$forceUpdate()
    },



    saveElement(param) {
      store.dispatch('web-test-case/saveElement', param).then(() => {
            this.$bvToast.toast('Congratulations: Join successfully', {
              title: `Variant  success`,
              variant: 'success',
              solid: false,
              toaster: 'b-toaster-bottom-right',
            })
          }, e => {
            this.$bvToast.toast('Note: Join failed', {
              title: `Variant  fail`,
              variant: 'danger',
              solid: false,
              toaster: 'b-toaster-bottom-right',
            })
          }
      )
    },
    duplicateElement(param) {
      store.dispatch('web-test-case/duplicateElement', param.id).then(() => {
            this.$emit('fetch-project-element-id', param.pageId)
        this.$bvToast.toast('duplicateElement: Join successfully', {
          title: `duplicateElement  success`,
          variant: 'success',
          solid: false,
          toaster: 'b-toaster-bottom-right',
        })

      }, e => {
        this.$bvToast.toast('Note: Join failed', {
          title: `Variant  fail`,
          variant: 'danger',
          solid: false,
          toaster: 'b-toaster-bottom-right',
        })
      }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.repeater-form {
  overflow: hidden;
  transition: .35s height;
}
</style>
`

export const codeInfo = 'default'
