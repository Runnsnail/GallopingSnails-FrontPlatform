import axios from '@axios'
import axiosIns from "@/libs/axios";

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        fetchSuitList(ctx, queryParams) {
            return new Promise((resolve, reject) => {
                axios
                    .get('/tTestsuiteUi/fetchSuitList', { params: queryParams })
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        updateoraddRobot(ctx, queryParams) {
            return new Promise((resolve, reject) => {
                axios
                    .post('/messageSend/saveMessage',  queryParams )
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },


        updateEnv(ctx, queryParams) {
            return new Promise((resolve, reject) => {
                axios
                    .post('/tTestsuiteUi/updateEnv',  queryParams )
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },


        deleteCase(ctx, caseId ) {
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

        showCaseLogs(ctx,caseId) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/stepUiLog/listByCaseId/${caseId}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

    },
}
