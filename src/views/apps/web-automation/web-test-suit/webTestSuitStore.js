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
                    .post(`/tTestsuiteUi/add`,{params: payload})
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        editSuits(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post('/tTestsuiteUi/edit', {params: payload})
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

    },
}
