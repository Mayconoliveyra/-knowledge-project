const schedule = require("node-schedule")


module.exports = app => {
    schedule.scheduleJob("*/1 * * * *", async function () { /*  vai rodar de 1 em 1 minutos */
        const usersCount = await app.db("users").count("id").first()
        const categoriesCount = await app.db("categories").count("id").first()
        const articlesCount = await app.db("articles").count("id").first()


        const { Stat } = app.api.stat /* importo o modelo */


        const lastStat = await Stat.findOne({}, {}, { sort: { "createdAt": -1 } }) /* vou fazer uma consulta no mongo e retorna o ultimo registro criado atras da data de criação */


        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        })

        /* lastStat= ultima estatistica setada  ||= ou    stat= estado atual   lastStat= ultimo Estado */
        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles


        if (changeUsers || changeCategories || changeArticles) {
            stat.save().then(() => console.log("[Stats] Estatíticas atualizadas!"))
        }




    })




}