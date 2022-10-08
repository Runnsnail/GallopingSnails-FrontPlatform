import axios from '@axios'

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        fetchElements(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get('/PageElement/listPageElement', {params: payload})
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },
        fetchElementsById(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/PageElement/listByElementId/${payload}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },
        addProjectPage(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/tProjectPage/add`,{params: payload})
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },
        removeItemElement(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/PageElement/remove/${payload}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },
        duplicateElement(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/PageElement/copyElemenById/${payload}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        saveElement(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post('/PageElement/edit', {params: payload})
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        movePageElements(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post('/PageElement/batchMoveElements', {params: payload})
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

        savePageElements(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post('/PageElement/batchSaveElements', {params: payload})
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

    },
}
