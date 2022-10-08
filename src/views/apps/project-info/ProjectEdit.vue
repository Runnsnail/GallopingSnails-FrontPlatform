<template>
  <b-card
      v-if="Object.keys(project).length"
      class="blog-edit-wrapper"
  >
    <!-- media -->
    <b-media
        no-body
        vertical-align="center"
    >
      <b-media-aside class="mr-75">
        <b-avatar
            size="50"
            :src="project.avatar"
        />
      </b-media-aside>
      <b-media-body>
        <h3 class="font-weight-bolder">
          <label
              for="rating-inline "
              class="mr-lg-2"
          >Author: {{ project.author }}</label>
        </h3>
        <h3 class="font-weight-bolder">
          <label
              for="rating-inline"
              class="mr-lg-2 "
          >Project level:</label>
          <b-form-rating
              v-model="project.rating"
              show-value
              inline
              no-border
              variant="warning"
              class="d-block"
          />
        </h3>
      </b-media-body>

      <b-col md="3">
        <div>

        </div>
        <template #code>
          {{ codeShowValue }}
        </template>
      </b-col>
    </b-media>
    <!--/ media -->

    <!-- form -->
    <b-form class="mt-2">
      <b-row>
        <b-col md="6">
          <b-form-group
              label="Title"
              label-for="blog-edit-title"
              class="mb-2"
          >
            <b-form-input
                id="blog-edit-title"
                v-model="project.name"
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
            <b-form-group >
              <b-form-radio-group
                  v-model="project.id"
                  :options="options"
                  class="demo-inline-spacing"
                  name="radio-inline"
              />
            </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
              label="CardTitle"
              label-for="project-edit-cardtitle"
              class="mb-2"
          >
            <b-form-input
                id="project-edit-cardtitle"
                v-model="project.cardTitle"
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
              label="Levels"
              label-for="blog-edit-category"
              class="mb-2"
          >
            <v-select
                id="blog-edit-category"
                v-model="project.level"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="levelOption"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group
              label="Content"
              label-for="blog-content"
              class="mb-2"
          >
            <quill-editor
                id="blog-content"
                v-model="project.description"
                :options="snowOption"
            />
          </b-form-group>
        </b-col>
        <b-col
            cols="12"
            class="mt-50"
        >
          <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-1"
              @click="saveProject()"
          >
            Save Changes
          </b-button>
          <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="outline-secondary"
          >
            Cancel
          </b-button>
        </b-col>
      </b-row>
    </b-form>
    <!--/ form -->
  </b-card>
</template>

<script>
import {
  BCard,
  BMedia,
  BAvatar,
  BCardText,
  BMediaAside,
  BMediaBody,
  BForm,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BImg,
  BFormFile,
  BLink,
  BFormRadio,
  BButton,
  BFormRating, BFormRadioGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import {quillEditor} from 'vue-quill-editor'
import Ripple from 'vue-ripple-directive'
import {useInputImageRenderer} from '@core/comp-functions/forms/form-utils'
import {ref} from '@vue/composition-api'
import axiosIns from "@/libs/axios";
import {codeShowValue} from "@/views/forms/form-element/form-rating/code";
import BCardCode from "@core/components/b-card-code";

export default {
  components: {
    BCard,
    BMedia,
    BAvatar,
    BFormRadio,
    BFormRadioGroup,
    BCardCode,
    BFormRating,
    BCardText,
    BMediaAside,
    BMediaBody,
    BForm,
    BLink,
    BImg,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BFormFile,
    vSelect,
    quillEditor,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      project: {},
      snowOption: {
        theme: 'snow',
      },
      codeShowValue,
      levelOption: ['Lowest', 'Highest'],
      options:[{text:'EDIT PROJECT',value:this.$route.params.id},{text:'ADD PROJECT',value:'null'}]
    }
  },
  created() {
    const projectId = this.$route.params.id
    axiosIns
        .get(`/ProjectMember/ProjectId/${projectId}`)
        .then(response => {
          this.project = response.data.data
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.project = undefined
          }
        })
  },
  setup() {
    const refInputEl = ref(null)
    const refPreviewEl = ref(null)

    const {inputImageRenderer} = useInputImageRenderer(refInputEl, base64 => {
      refPreviewEl.value.src = base64
    })

    return {
      refInputEl,
      refPreviewEl,
      inputImageRenderer,
    }
  },

  methods: {

    saveProject() {
      const data = ref({

          id: this.project.id,
          name: this.project.name,
          author: this.project.author,
          image: this.project.image,
          rating: this.project.rating,
          description: this.project.description,
          cardTitle: this.project.cardTitle,
          level: this.project.level,

      })
      axiosIns.post("/ProjectMember/saveProject", data.value).then(() => {
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
@import 'src/@core/scss/vue/libs/vue-select.scss';
@import 'src/@core/scss/vue/libs/quill.scss';
@import 'src/@core/scss/vue/pages/page-blog.scss';
</style>
