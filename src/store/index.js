import { createStore } from 'vuex'
import swal from 'sweetalert2'
import { api } from '../service/api'
import router from '../router/index'

export default createStore({
  state() {
    return {
      accessToken: null,
      refreshToken: null,
      validToken: JSON.parse(localStorage.getItem('auth')),
      refreshed: false,
      list: [],
      allSelected: false,
      totalCounts: 0,
      totalPages: 0,
      currentPage: 1,
      sortAsc: false,
      sortParam: ("title")
    }
  },
  mutations: {
    TOGGLE_SELECT_ALL(state) {
      state.allSelected = !state.allSelected
      state.list.forEach(element => {
        element.selected = state.allSelected
      })
    },
    CHANGE_MIN_PRICE(state, minPrice) {
      state.list.forEach(element => {
        if (!element.selected) {
          return
        }
        element.min_price = minPrice
      })
    },
    CHANGE_MAX_PRICE(state, maxPrice) {
      state.list.forEach(element => {
        if (!element.selected) {
          return
        }
        element.max_price = maxPrice
      })
    },
    CHANGE_PAGE(state, page) {
      state.currentPage = state.currentPage + page
    },
    SET_PAGE(state, page) {
      state.currentPage = page
    },
    SORT_TO_DEFAULT(state) {
      state.sortAsc = false
      state.sortParam = "title"
    },
    SORT_LIST(state, sortParam) {
      if (state.sortParam == sortParam) {
        state.sortAsc = !state.sortAsc
        state.list.reverse()
        return
      } else {
        state.sortParam = sortParam
        state.sortAsc = true

        switch (sortParam) {
          case 'remote_id':
            return state.list.sort((item1, item2) => {
              return Number(item1.remote_id) - Number(item2.remote_id)
            })
          case 'brand_name':
            return state.list.sort((item1, item2) => {
              return item1.brand_name > item2.brand_name ? 1 : -1
            })
          case 'title':
            return state.list.sort((item1, item2) => {
              return item1.title > item2.title ? 1 : -1
            })
          case 'quantity':
            return state.list.sort((item1, item2) => {
              return Number(item1.quantity) - Number(item2.quantity)
            })
          case 'price':
            return state.list.sort((item1, item2) => {
              return item1.price > item2.price ? 1 : -1
            })
          case 'min_price':
            return state.list.sort((item1, item2) => {
              return Number(item1.min_price) - Number(item2.min_price)
            })
          case 'max_price':
            return state.list.sort((item1, item2) => {
              return Number(item1.max_price) - Number(item2.max_price)
            })
        }
      }
    },
    LOGOUT(state) {
      state.accessToken = null
      state.refreshToken = null
      localStorage.removeItem('auth')
      router.push({ name: 'login' })
    }
  },
  actions: {
    async login(context, userdata) {
      swal.showLoading()
      const response = await api.login(userdata.email, userdata.password)
      if (response.error || response.errorMessage) {
        swal.fire({
          icon: "error",
          text: response.errorMessage ?? response.error.message
        })
        return
      }
      if (response.data) {
        context.state.accessToken = response.data.access
        context.state.refreshToken = response.data.refresh
        context.state.validToken = { access: response.data.access, refresh: response.data.refresh }
        const userData = { access: response.data.refresh }
        localStorage.setItem('auth', JSON.stringify(userData))
        router.push({ name: 'home' })
        swal.close()
      }
    },
    async refreshToken({ state, commit }) {
      if (state.refreshed) {

        await swal.fire({
          icon: 'info',
          title: 'Пожалуйста перезайдите в систему',
          showCancelButton: false,
        });

        commit('LOGOUT')
        return;
      }
      swal.showLoading()
      const response = await api.refreshToken(state.validToken.refresh ?? state.validToken.access)
      if (response.error || response.errorMessage) {
        if (!state.refreshed && response.error?.response?.data?.code === "token_not_valid") {
          await swal.fire({
            icon: 'info',
            title: 'Пожалуйста перезайдите в систему',
            showCancelButton: false,
          });

          commit('LOGOUT')
          return;
        }
        swal.fire({
          icon: "error",
          text: response.errorMessage ?? response.error.message
        })
        return
      }
      if (response.data) {
        swal.close()
        state.accessToken = response.data.access
        state.validToken = { access: response.data.access }
        const userData = { access: response.data.access }
        state.refreshed = true
        localStorage.setItem('auth', JSON.stringify(userData))
      }
    },
    async getList({ state, dispatch, commit }) {
      swal.showLoading()
      let offset = 0
      if (state.currentPage > 1) {
        offset = (state.currentPage - 1) * 10
      }
      const response = await api.getList(state.validToken.access, offset)
      if (response.error || response.errorMessage) {
        if (!state.refreshed && response.error?.response?.data?.code === "token_not_valid") {
          await dispatch('refreshToken')
        }
        if (state.refreshed) {
          await dispatch('getList')
        }
      }
      if (response.data) {
        state.list = response.data.results.sort((item1, item2) => {
          return item1.title > item2.title ? -1 : 1
        })
        state.totalCounts = response.data.count
        const p = state.totalCounts / 10
        state.totalPages = Math.round(p)
        commit('SORT_TO_DEFAULT')
        swal.close()
      }
    }
  }
})
