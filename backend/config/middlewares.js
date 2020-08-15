const bodyParser = require("body-parser") /* serve para receber os dados requeridos */
const cors = require("cors") /* serve para fazer as dependencias do projeto (import/ require) */


module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors()) 
}
