const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/knowledge_stats", { useNewUrlParser: true })
    .catch(e => {
        const msg = "ERRO! Não foi possível conectar com o MongoDB!"
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m') /* colocar uma cor no backgroud da mensagem e dps reseta "\x1b[0m"= serve para tirar a cor novamente */
    })