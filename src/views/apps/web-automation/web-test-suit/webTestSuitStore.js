import axios from '@axios'
import axiosIns from "@/libs/axios";

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        fetchTestSuits(ctx, payload) {
            return new Promise((resolve, reject) => {
                axiosIns
                    .get('/tTestsuiteUi/listTree', { params: payload })
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        deleteSuits(ctx, ProjectId ) {
            return new Promise((resolve, reject) => {
                axiosIns
                    .delete(`/tTestsuiteUi/remove/${ProjectId}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },


        addSuits(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/tTestsuiteUi/add`, payload)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },


        updateSuiteTree(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post('/tTestsuiteUi/updateSuiteTree',  {treeList:payload})
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },


        editSuits(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post('/tTestsuiteUi/edit',  payload)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        addCaseStep(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/StepUiNew/addCaseStep`,payload)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        saveCaseSteps(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/StepUiNew/saveCaseSteps`,payload)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        fetchStepById(ctx, stepId) {
            return new Promise((resolve, reject) => {
                axiosIns
                    .get(`/StepUiNew/fetchStepById/${stepId}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        fetchCaseSteps(ctx, caseId) {
            return new Promise((resolve, reject) => {
                axiosIns
                    .get(`/StepUiNew/fetchCaseSteps/${caseId}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        fetchCaseVariables(ctx, caseId) {
            return new Promise((resolve, reject) => {
                axiosIns
                    .get(`/CaseVariable/fetchCaseVariables/${caseId}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        debuggerStepsCase(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/SeleniumGrid/setUpNode`,payload)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        fetchSeleniumNode(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/SeleniumNode/fetchById/${payload}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        removeCaseVariables(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/CaseVariable/remove/${payload}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        saveCaseVariables(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post('/CaseVariable/save', {params: payload})
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        deleteStep(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(`/StepUiNew/deleteStep/${payload}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

    },
}
