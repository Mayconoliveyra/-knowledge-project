module.exports = app => {
    const Stat = app.mongoose.model("Stat", {
        users: Number,
        categories: Number,
        articles: Number,
        createdAt: Date 
    })


    const get = (req, res) => {
        Stat.findOne({}, {}, { sort: { "createdAt": -1 } }) /* ({}= não vou filtar nada, {} = não vou selecionar nenhum atributo, {}= vou pegar de forma sort= ordenada a altima statistica armazenada no banco) */
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    categories: 0,
                    articles: 0
                }

                res.json(stat || defaultStat) /* se o banco tiver vazio me retorne os valres default  */
            })

    }


    return { Stat, get }
}