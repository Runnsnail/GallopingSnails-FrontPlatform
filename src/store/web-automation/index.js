import axios from '@axios'

export default {
    namespaced: true,
    state: {
        cartItemsCount: (() => {
            const userData = JSON.parse(localStorage.getItem('userData'))
            return userData && userData.extras ? userData.extras.eCommerceCartItemsCount : 0
        })(),
    },
    getters: {},
    mutations: {
        UPDATE_TEAM_GROUP_COUNT(state, count) {
            state.cartItemsCount = count
        },
    },
    actions: {

        fetchGroupTeams() {
            return new Promise((resolve, reject) => {
                axios
                    .get('/teamGroup/getTeams')
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
        },

    },
}
