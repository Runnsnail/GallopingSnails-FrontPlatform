import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import bus from "@/views/apps/web-automation/bus";

export const getDebugerCase =() =>{

    const stepList = ref([])

    const showFlag = ref( true);

    const newCardID = ref(null)

    const caseId = ref()

    const showStep = ref(true)
    bus.$on('showStepIn', ()=>{
        showStep.value= !showStep.value
    })
    bus.$on('getNewCardId', (data)=>{
        newCardID.value= data.value
    })

    const browserByOptions = [
        { text: 'Chrome', value: 'Chrome' },
        { text: 'Firefix', value: 'Firefix' },
        { text: 'Edge', value: 'Edge' },
    ]

    const status = [
        { label: 'Draft', value: 'draft' },
        { label: 'Used', value: 'used' },
        { label: 'Deprecated', value: 'deprecated' },
    ]

    const envOptions = ref([])

    const teamNames = ref([])

    const projectNames = ref([])


    const browserBy = ref({ text: '本地调试', value: '本地调试' })

    return {
        browserByOptions,
        browserBy,
        stepList,
        showStep,
        showFlag,
        newCardID,
        caseId,
        envOptions,
        teamNames,
        projectNames,
        status,
    }
}



export const getStepInfo = () => {
    const stepInfo = ref({});

    return stepInfo

}

export default function getSuitCaseList() {
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
        { key: 'status', sortable: true },
        { key: 'name', sortable: true },
        { key: 'envName', sortable: true },
        { key: 'teamName', sortable: true },
        { key: 'author', sortable: true },
        { key: 'projectName', sortable: true },
    ]
    const perPage = ref(7)
    const totalInvoices = ref(0)
    const currentPage = ref(1)
    const searchQuery = ref('')
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)
    const statusFilter = ref(null)

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

    const fetchCasesList = (ctx, callback) => {
        store
            .dispatch('web-case/fetchCasesList', {
                q: searchQuery.value,
                perPage: perPage.value,
                page: currentPage.value,
                sortBy: sortBy.value,
                sortDesc: isSortDirDesc.value,
                status: statusFilter.value,
                suitId: suitId.value
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
                        title: "Error fetching Cases' list",
                        icon: 'AlertTriangleIcon',
                        variant: 'danger',
                    },
                })
            })
    }

    // *===============================================---*
    // *--------- UI ---------------------------------------*
    // *===============================================---*

    const resolveInvoiceStatusVariantAndIcon = status => {
        if (status === 'draft') return { variant: 'warning', icon: 'PieChartIcon' }
        if (status === 'used') return { variant: 'success', icon: 'CheckCircleIcon' }
        if (status === 'deprecated') return { variant: 'secondary', icon: 'AlertCircleIcon' }
        return { variant: 'secondary', icon: 'XIcon' }
    }

    const resolveClientAvatarVariant = status => {
        if (status === 'deprecated') return 'secondary'
        if (status === 'draft') return 'warning'
        if (status === 'used') return 'success'
        return 'primary'
    }

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

        resolveInvoiceStatusVariantAndIcon,
        resolveClientAvatarVariant,

        refetchData,

    }
}


