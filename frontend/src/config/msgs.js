import Vue from "vue"
import Toasted from "vue-toasted"


Vue.use(Toasted, {
    iconPack: "fontawesome",
    duration: 3000
})


Vue.teasted.register(
    "defaultSuccess",
    payload => !payload.msg ? "Operação realizada com sucesso!" : payload.msg,
    { type: "success", icon: "check" }
)

Vue.teasted.register(
    "defaultError",
    payload => !payload.msg ? "Oops... Erro inesperado." : payload.msg,
    { type: "erro", icon: "times" }
)