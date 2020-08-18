import Vue from "vue"
import Vuex from "vuex" /* faz ligação de um elemento de uma pagina para outra */


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: true
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }

            console.log("toggleMenu = " + state.isMenuVisible)
        }
    }
})