import "font-awesome/css/font-awesome.css"
import Vue from 'vue'

import App from './App'

import "./config/bootstrap"
import "./config/msgs"
import store from "./config/store"
import router from "./config/router"

Vue.config.productionTip = false

// TEMPORARIO!   /* passando um elemento de autenticação */
require("axios").defaults.headers.common["Authorization"] = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Im1heWNvbiIsImVtYWlsIjoibWF5Y29uYnJpdG8xOTk4QGhvdG1haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU5Nzc3MjkyOSwiZXhwIjoxNTk4MDMyMTI5fQ.xlzmYJ9s0vsL2c-YeCFcUrcBfdfo14ND3zzclaOkjWM"


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')