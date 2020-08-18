import Vue from "vue"

export const baseApiUrl = "http://localhost:3000"   /* porta que ta rodando meu backend */


export function showError(e) {
    if (e && e.response && e.response.data) {
        Vue.teasted.global.defaultError({ msg: e.response.data })
    } else if (typeof e === "string") {
        Vue.teasted.global.defaultError({ msg: e })
    } else {
        Vue.teasted.global.defaultError()
    }
}


export default { baseApiUrl, showError }