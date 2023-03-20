import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import bus from "@/views/apps/web-automation/bus";



export default function getUiExecuitionList() {
    // Use toast
    const toast = useToast()



    const refInvoiceListTable = ref(null)

    const  suitId = ref(14) ;

    const caseId = ref(0);
    bus.$on('eventSuitId', (data) =>{
        suitId.value= data
    })
    // Table Handlers
    const tableColumns = [
        { key: 'id', label: '#', sortable: true },
        { key: 'notificationType', sortable: true },
        { key: 'name', sortable: true },
        { key: 'envName', sortable: true },
        { key: 'status', sortable: true },
        { key: 'author', sortable: true },
        { key: 'Setting', sortable: true },
    ]
    const perPage = ref(10)
    const totalInvoices = ref(0)
    const currentPage = ref(1)
    const searchQuery = ref('')
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)
    const statusFilter = ref(null)
    const envSet = ref({})
    const dataMeta = computed(() => {
        const localItemsCount = refInvoiceListTable.value ? refInvoiceListTable.value.localItems.length : 0
        return {
            from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
            to: perPage.value * (currentPage.value - 1) + localItemsCount,
            of: totalInvoices.value,
        }
    })

    const refetchData = () => {
        refInvoiceListTable.value.refresh()
    }

    watch([currentPage, perPage, searchQuery, statusFilter,suitId], () => {
        refetchData()
    })

    const deleteCase = (caseId) => {
        store.dispatch('web-case/deleteCase',caseId).then(() => {
            toast({
                component: ToastificationContent,
                props: {
                    title: "Remove Case Success",
                    icon: 'AlertTriangleIcon',
                    variant: 'success',
                },
            })
        })
    }

    const fetchSuitList = (ctx, callback) => {
        store
            .dispatch('web-exection/fetchSuitList', {
                q: searchQuery.value,
                perPage: perPage.value,
                page: currentPage.value,
                sortBy: sortBy.value,
                sortDesc: isSortDirDesc.value,
                status: statusFilter.value,
            })
            .then(response => {
                const { records, total } = response.data.data
                callback(records)
                totalInvoices.value = total
            })
            .catch(() => {
                toast({
                    component: ToastificationContent,
                    props: {
                        title: "Error fetching UiExection' list",
                        icon: 'AlertTriangleIcon',
                        variant: 'danger',
                    },
                })
            })
    }

    // *===============================================---*
    // *--------- UI ---------------------------------------*
    // *===============================================---*


    const resolveClientAvatarVariant = status => {
        if (status === 1) return '微信'
        if (status === 2) return '钉钉'
        return '未配置'
    }

    return {
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

        resolveClientAvatarVariant,
        envSet,
        refetchData,

    }
}


