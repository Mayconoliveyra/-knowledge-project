import axios from "axios"

/* se o token expirar a pagina volta para a pagina de login */
const success= res => res
const error = err => {
    if( 401 === err.response.status) {
        window.location ="/"
       
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)