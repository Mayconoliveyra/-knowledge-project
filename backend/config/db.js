const config = require("../knexfile.js")
const knex = require("knex") (config)

knex.migrate.latest([config]) /* exercuta meus sql, assim que o sistema for carregado */
module.exports = knex