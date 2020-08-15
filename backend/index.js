/* const express = require("express")
const app = express() */ /* essas 2 linhas e igual essa de baixo */
const app = require("express") ()
const consign = require("consign")
const db = require("./config/db")

app.db = db  /* onde faço minhas conexao com o banco app.db */

consign()    /* funcao do cors. (cama minhas requisição get, post...) */
    .then("./config/middlewares.js")
    .then("./api/validation.js")
    .then("./api")
    .then("./config/routes.js")
    .into(app)

app.listen(3000, ()=> {
    console.log("Backend executando...")
})
  
 