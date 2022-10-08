import axios from '@axios'
import axiosIns from "@/libs/axios";

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
    UPDATE_CART_ITEMS_COUNT(state, count) {
      state.cartItemsCount = count
    },
  },
  actions: {
    fetchProjects(ctx, payload) {
      return new Promise((resolve, reject) => {
        axiosIns
          .get('/ProjectMember/ProjectsMemberList', { params: payload })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchProject(ctx, { ProjectId }) {
      return new Promise((resolve, reject) => {
        axiosIns
          .get(`/ProjectMember/ProjectId/${ProjectId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchWishlistProjects() {
      return new Promise((resolve, reject) => {
        axiosIns
          .get('/apps/ecommerce/wishlist')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCartProjects() {
      return new Promise((resolve, reject) => {
        axiosIns
          .get('/apps/ecommerce/cart')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    fetchPageProject(ctx, payload) {
      return new Promise((resolve, reject) => {
        axiosIns
            .get('/tProjectPage/listPage', { params: payload })
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },

    // ------------------------------------------------
    // Project Actions
    // ------------------------------------------------
    addProjectInWishlist(ctx, { projectId }) {
      return new Promise((resolve, reject) => {
        axiosIns
          .post('/apps/ecommerce/wishlist', { projectId })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeProjectFromWishlist(ctx, { projectId }) {
      return new Promise((resolve, reject) => {
        axiosIns
          .delete(`/apps/ecommerce/wishlist/${projectId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    addProjectInCart(ctx, { projectId }) {
      return new Promise((resolve, reject) => {
        axiosIns
          .post('/apps/ecommerce/cart', { projectId })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeProjectFromCart(ctx, { projectId }) {
      return new Promise((resolve, reject) => {
        axiosIns
          .delete(`/apps/ecommerce/cart/${projectId}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
