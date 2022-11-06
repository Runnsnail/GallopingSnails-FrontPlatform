import {ref} from "@vue/composition-api";
import bus from "@/views/apps/web-automation/bus";



export const useWebFiltersSuits = () => {
    const filter = ref({
        q: '',
        page: 1,
        perPage: 5,
    })
    const treeIcon = {icon: 'SendIcon'}
    const newTree = {}
    const treeData = ref([])
    const pageOptions = [5, 10, 15]
    const totalRows = ref(null)



    return {
        // Filter
        filter,
        pageOptions,
        totalRows,
        treeData,
        newTree,
        treeIcon,
    }
}
