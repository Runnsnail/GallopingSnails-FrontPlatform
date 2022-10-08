<template>
  <div
      id="knowledge-base-article"
  >
    <b-row>

      <!-- edit -->
      <b-col
          lg="3"
          md="5"
          order="2"
          order-md="1"
      >
        <b-card>
          <h6 class="kb-title">
            <feather-icon
                icon="EditIcon"
                size="20"
                class="mr-50"
            />
            <b-link
                class="text-body"
                :to="{ name: 'apps-project-edit', params: {id: project.id } }"
            >
              Project Edit
            </b-link>
          </h6>
        </b-card>
      </b-col>
      <!--/ related question -->

      <b-col
          lg="9"
          md="7"
          order="1"
          order-md="2"
      >
        <b-card>

          <!-- Title -->
          <b-card-title class="mb-1">
            <feather-icon
                icon="SmartphoneIcon"
                size="21"
            />

            {{ project.name }}
          </b-card-title>
          <b-card-text class="item-company mb-0">
            <span>by</span>
            <b-link class="company-name">
              {{ project.author }}
            </b-link>
          </b-card-text>
          <div class="ecommerce-details-price d-flex flex-wrap mt-1">
            <ul class="unstyled-list list-inline pl-1 border-left">
              <li
                  v-for="star in 5"
                  :key="star"
                  class="ratings-list-item mr-25"
              >
                <feather-icon
                    icon="StarIcon"
                    size="18"
                    :class="[{'fill-current': star <= project.rating}, star <= project.rating ? 'text-warning' : 'text-muted']"
                />
              </li>
            </ul>
          </div>

          <!-- Content -->
          <!-- eslint-disable vue/no-v-html -->
          <div
              class="question-content"
              v-html="project.description"
          />
          <!-- eslint-enable -->
        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import {
  BRow, BCol, BCard, BListGroup, BListGroupItem, BCardText, BCardTitle, BLink,
} from 'bootstrap-vue'
import axios from "@/libs/axios";
import {useRouter} from "@core/utils/utils";
import axiosIns from "@/libs/axios";

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BCard,
    BListGroup,
    BCardText,
    BCardTitle,
    BListGroupItem,
  },
  data() {
    return {
      project: {},
    }
  },
  created() {
    // ! You have to update the below API call according to route parameter
    // * We are using fixed API call for all categories for demo purposes
    // this.$http.get('/kb/data/question').then(res => { this.project = res.data })

    // const { route } = useRouter()
    const productId = this.$route.params.slug
    axiosIns
        .get(`/ProjectMember/ProjectId/${productId}`)
        .then(response => {
          this.project = response.data.data
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.project = undefined
          }
        })
  },
}
</script>

<style lang="scss">
@import 'src/@core/scss/vue/pages/page-knowledge-base.scss';
</style>
