import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        quotes: {},
        loaded: false,
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        getQuotes: state => {
            return state.quotes
        },
        loaded: state => {
            return state.loaded
        },
    }
})
