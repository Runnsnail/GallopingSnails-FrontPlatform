import axios from '@axios'
import axiosIns from "@/libs/axios";

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        fetchCasesList(ctx, queryParams) {
            return new Promise((resolve, reject) => {
                axios
                    .get('/TestcaseUiNew/listCasesPage', { params: queryParams })
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },
        deleteCase(ctx, caseId ) {
            console.log(caseId)
            return new Promise((resolve, reject) => {
                axiosIns
                    .delete(`/TestcaseUiNew/deleteCase/${caseId}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },
        fetchClients() {
            return new Promise((resolve, reject) => {
                axios
                    .get('/apps/invoice/clients')
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

    },
}
