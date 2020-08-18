import Vue from "vue"
import Vuex from "vuex" /* faz ligação de um elemento de uma pagina para outra */


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: true,
        user: {
            name: "Usuário Mock",
            email: "mayconbrito1998@hotmail.com"
        }
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }

        }
    }
})