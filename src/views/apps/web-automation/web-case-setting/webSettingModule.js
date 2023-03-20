import axios from "@/libs/axios";
import axiosIns from "@/libs/axios";

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {

        fetchPageNamesList() {
            return new Promise((resolve, reject) => {
                axios
                    .get('/tProjectPage/listByPageId')
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },


        fetchElementsList(ctx,payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/PageElement/listByPageId/${payload}`, )
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        saveStepInformation(ctx,payload) {
            return new Promise((resolve, reject) => {
                axiosIns
                    .post(`/StepUiNew/saveStepInformation`,payload)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

    },}
