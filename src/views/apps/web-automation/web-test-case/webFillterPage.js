import {ref} from "@vue/composition-api";

export const useWebFiltersPages = () => {
    const filter = ref({
        q: '',
        id: '',
        page: 1,
        perPage: 5,
        projectId: 1,
    })
    const productId = ref(2)

    const pageId = ref(4)
    const pageProject = ref({
        id: '',
        projectId: '',
        pageName: '',
        isEnable: '',
        remark: '',
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: '',
    })
    const projectPages = ref([])
    const pageOptions = [3, 5, 10]
    const totalRows = ref(null)

    const bodyTextVariant = 'semi-dark'

    const actionOptions = [
        {text: 'id', value: 'SelectorType.ID'},
        {text: 'name', value: 'SelectorType.NAME'},
        {text: 'className', value: 'SelectorType.CLASSNAME'},
        {text: 'tagName', value: 'SelectorType.TAG'},
        {text: 'linkText', value: 'SelectorType.LINK'},
        {text: 'partial link', value: 'SelectorType.PARTIALLINKTEXT'},
        {text: 'Xpath', value: 'SelectorType.XPATH'},
        {text: 'cssSelector', value: 'SelectorType.CSS'},

    ]

    const stepInfo = ref({
        id: '',
        name: '',
        actionType: '',
        action: '',
        testcaseId: '',
        counts: '',
        waite: '',
        pageId: '',
        elementId: '',
        type: '',
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: '',
        sort: '',
        icon: '',
        variant: '',
        remark: '',
        optionData: '',
        page: {
            text: '',
            value: ''
        },
        element: {
            text: '',
            value: ''
        },
        enable: ''
    })

    return {
        // Filter
        filter,
        stepInfo,
        pageOptions,
        totalRows,
        projectPages,
        productId,
        pageId,
        actionOptions,
        pageProject,
        bodyTextVariant,
    }
}
