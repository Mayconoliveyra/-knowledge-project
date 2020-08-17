/* const express = require("express")
const app = express() */ /* essas 2 linhas e igual essa de baixo */
const app = require("express")()
const consign = require("consign")
const db = require("./config/db")
const mongoose = require("mongoose")

require("./config/mongodb")


app.db = db  /* onde faço minhas conexao com o banco app.db */
app.mongoose = mongoose

consign()    /* funcao do cors. (cama minhas requisição get, post...) */
    .include("./config/passport.js")
    .then("./config/middlewares.js")
    .then("./api/validation.js")
    .then("./api")
    .then("./config/routes.js")
    .into(app)

app.listen(3000, () => {
    console.log("Backend executando...")
})

