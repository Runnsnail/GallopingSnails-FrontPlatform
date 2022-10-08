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

    const actionOptions = [
        {text: 'id', value: 'id'},
        {text: 'name', value: 'name'},
        {text: 'className', value: 'className'},
        {text: 'tagName', value: 'tagName'},
        {text: 'linkText', value: 'linkText'},
        {text: 'partial link', value: 'partial link'},
        {text: 'Xpath', value: 'Xpath'},
        {text: 'cssSelector', value: 'cssSelector'},

    ]


    return {
        // Filter
        filter,
        pageOptions,
        totalRows,
        projectPages,
        productId,
        pageId,
        actionOptions,
        pageProject
    }
}
