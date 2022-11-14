<template>
  <div class=" ecommerce-application">
  <div class="content-detached content-right">
    <div class="content-wrapper">
      <div class="content-body">
    <div style="height: inherit">
      <!-- ECommerce Header -->
      <section id="ecommerce-header">
        <div class="row">
          <div class="col-sm-12">
            <div class="ecommerce-header-items">
              <div class="result-toggler">
                <feather-icon
                    icon="MenuIcon"
                    class="d-block d-lg-none"
                    size="21"
                    @click="mqShallShowLeftSidebar = true"
                />
                <div class="search-results">
                  {{ totalProducts }} results found
                </div>
              </div>
              <div class="view-options d-flex">

                <!-- Sort Button -->
                <b-dropdown
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    :text="sortBy.text"
                    right
                    variant="outline-primary"
                >
                  <b-dropdown-item
                      v-for="sortOption in sortByOptions"
                      :key="sortOption.value"
                      @click="sortBy=sortOption"
                  >
                    {{ sortOption.text }}
                  </b-dropdown-item>
                </b-dropdown>

                <!-- Item View Radio Button Group  -->
                <b-form-radio-group
                    v-model="itemView"
                    class="ml-1 list item-view-radio-group"
                    buttons
                    size="sm"
                    button-variant="outline-primary"
                >
                  <b-form-radio
                      v-for="option in itemViewOptions"
                      :key="option.value"
                      :value="option.value"
                  >
                    <feather-icon
                        :icon="option.icon"
                        size="18"
                    />
                  </b-form-radio>
                </b-form-radio-group>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Overlay -->
      <div class="body-content-overlay"/>

      <!-- Searchbar -->
      <div class="ecommerce-searchbar mt-1">
        <b-row>
          <b-col cols="12">
            <b-input-group class="input-group-merge">
              <b-form-input
                  v-model="filters.q"
                  placeholder="Search Product"
                  class="search-product"
              />
              <b-input-group-append is-text>
                <feather-icon
                    icon="SearchIcon"
                    class="text-muted"
                />
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
      </div>

      <!-- Prodcuts -->
      <section :class="itemView">
        <b-card
            v-for="product in products"
            :key="product.id"
            class="ecommerce-card"
            no-body
        >
          <div class="item-img text-center">
            <b-link :to="{ name: 'apps-project-info', params: { slug: product.id } }">
              <b-img
                  :alt="`${product.name}-${product.id}`"
                  fluid
                  class="card-img-top"
                  size="sm"
                  :src="require('@/assets/images/pages/eCommerce/projectLogo.png')"
              />
            </b-link>
          </div>

          <!-- Product Details -->
          <b-card-body>
            <div class="item-wrapper">
              <div class="item-rating">
                <ul class="unstyled-list list-inline">
                  <li
                      v-for="star in 5"
                      :key="star"
                      class="ratings-list-item"
                      :class="{'ml-25': star-1}"
                  >
                    <feather-icon
                        icon="StarIcon"
                        size="16"
                        :class="[{'fill-current': star <= product.rating}, star <= product.rating ? 'text-warning' : 'text-muted']"
                    />
                  </li>
                </ul>
              </div>
              <div>
                <h6 class="item-price">
                  By: {{ product.author }}
                </h6>
              </div>
            </div>
            <h6 class="item-name">
              <b-link
                  class="text-body"
                  :to="{ name: 'apps-project-info', params: {slug: product.id } }"
              >
                {{ product.name }}
              </b-link>
              <b-card-text class="item-company">
                By
                <b-link class="ml-25">
                  {{ product.author }}
                </b-link>
              </b-card-text>
            </h6>
            <b-card-text class="item-description">
              {{ product.description }}
            </b-card-text>
          </b-card-body>

          <!-- Product Actions -->
          <div class="item-options text-center">
            <div class="item-wrapper">
              <div class="item-cost">
                <h4 class="item-price">
                  By: {{ product.author }}
                </h4>
              </div>
            </div>
            <b-button
                variant="light"
                tag="a"
                class="btn-wishlist"
                @click="toggleProductInWishlist(product)"
            >
              <feather-icon
                  icon="HeartIcon"
                  class="mr-50"
                  :class="{'text-danger': product.isInWishlist}"
              />
              <span>Wishlist</span>
            </b-button>
            <b-button
                variant="primary"
                tag="a"
                class="btn-cart"
                :to="{ name: 'test-case-management', params: {projectID: product.id } }"
            >
              <feather-icon
                  icon="ShoppingCartIcon"
                  class="mr-50"
              />
              <span>Add to Page</span>
            </b-button>
          </div>
        </b-card>
      </section>

      <!-- Pagination -->
      <section>
        <b-row>
          <b-col cols="12">
            <b-pagination
                v-model="filters.page"
                :total-rows="totalProducts"
                :per-page="filters.perPage"
                first-number
                align="center"
                last-number
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
      </section>


    </div>

  </div>

    </div>



  </div>
  <!-- Sidebar -->
  <project-left-filter
      :filters="filters"
      :filter-options="filterOptions"
      :mq-shall-show-left-sidebar.sync="mqShallShowLeftSidebar"
  />
  </div>
</template>

<script>
import {
  BDropdown,
  BDropdownItem,
  BFormRadioGroup,
  BFormRadio,
  BRow,
  BCol,
  BInputGroup,
  BInputGroupAppend,
  BFormInput,
  BCard,
  BCardBody,
  BLink,
  BImg,
  BCardText,
  BButton,
  BPagination,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import {watch} from '@vue/composition-api'
import {useResponsiveAppLeftSidebarVisibility} from '@core/comp-functions/ui/app'
import {
  useShopFiltersSortingAndPagination,
  useShopUi,
  useShopRemoteData,
  getCardName,
} from './useECommerceShop'
import {useEcommerceUi} from '@/views/apps/e-commerce/useEcommerce'
import ProjectLeftFilter from "@/views/apps/web-automation/ProjectLeftFilter"
import bus from "@/views/apps/web-automation/bus";

export default {
  directives: {
    Ripple,
  },
  components: {

    // BSV
    BDropdown,
    BDropdownItem,
    BFormRadioGroup,
    BFormRadio,
    BRow,
    BCol,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BCard,
    BCardBody,
    BLink,
    BImg,
    BCardText,
    BButton,
    BPagination,

    // SFC
    ProjectLeftFilter,
  },
  setup() {
    const {
      filters, filterOptions, sortBy, sortByOptions,
    } = useShopFiltersSortingAndPagination()

    const cardTitle = getCardName()


    const {handleCartActionClick, toggleProductInWishlist} = useEcommerceUi()

    const {
      itemView, itemViewOptions, totalProducts,
    } = useShopUi()

    const {products, fetchProducts} = useShopRemoteData()

    const {mqShallShowLeftSidebar} = useResponsiveAppLeftSidebarVisibility()

    // Wrapper Function for `fetchProducts` which can be triggered initially and upon changes of filters
    const fetchShopProducts = () => {
      fetchProducts({
        q: filters.value.q,
        cardTitle: cardTitle.value,
        sortBy: sortBy.value.value,
        page: filters.value.page,
        perPage: filters.value.perPage,
      })
          .then(response => {
            products.value = response.data.data.records
            totalProducts.value = response.data.data.total
          })
    }

    fetchShopProducts()

    watch([filters, sortBy,cardTitle], () => {
      fetchShopProducts()
    }, {
      deep: true,
    })

    return {
      // useShopFiltersSortingAndPagination
      filters,
      filterOptions,
      sortBy,
      sortByOptions,

      // useShopUi
      itemView,
      itemViewOptions,
      totalProducts,
      toggleProductInWishlist,
      handleCartActionClick,

      // useShopRemoteData
      products,

      // mqShallShowLeftSidebar
      mqShallShowLeftSidebar,
    }
  },
}
</script>

<style lang="scss">
@import "src/@core/scss/base/pages/app-ecommerce.scss";
</style>

<style lang="scss" scoped>
.item-view-radio-group ::v-deep {
  .btn {
    display: flex;
    align-items: center;
  }
}
</style>
