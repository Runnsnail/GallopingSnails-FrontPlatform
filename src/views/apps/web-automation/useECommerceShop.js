import { ref } from '@vue/composition-api'
import store from '@/store'
import bus from "@/views/apps/web-automation/bus";

export const getCardName =() =>{
  const cardTitle = ref(null) ;
  bus.$on('teamCard', function(data){
    cardTitle.value= data
  })
  return cardTitle
}

export const useShopFiltersSortingAndPagination = () => {
  const filters = ref({
    q: '',
    ratings: null,
    page: 1,
    perPage: 9,
  })

  const filterOptions = {

    ratings: [
      { rating: 4, level: "Urgent" },
      { rating: 3, level: "Important" },
      { rating: 2, level: "Generally" },
      { rating: 1, level: "Slight" },
    ],
  }

  // Sorting
  const sortBy = ref({ text: 'Featured', value: 'Featured' })
  const sortByOptions = [
    { text: 'Featured', value: 'Featured' },
    { text: 'Lowest', value: 'Lowest' },
    { text: 'Highest', value: 'Highest' },
  ]

  return {
    // Filter
    filters,
    filterOptions,

    // Sort
    sortBy,
    sortByOptions,
  }
}

export const useShopUi = () => {
  const itemView = 'grid-view'
  const itemViewOptions = [
    { icon: 'GridIcon', value: 'grid-view' },
    { icon: 'ListIcon', value: 'list-view' },
  ]

  // Pagination count <= required by pagination component
  const totalProducts = ref(null)

  return {
    itemView,
    itemViewOptions,
    totalProducts,
  }
}

export const useShopRemoteData = () => {
  const products = ref([])
  const fetchProducts = (...args) => store.dispatch('web-automation/fetchProjects', ...args)

  return {
    products,
    fetchProducts,
  }
}
