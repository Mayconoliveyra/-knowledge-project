module.exports = app => {
    const { existsOrError } = app.api.validation


    const save = (req, res) => {
        const article = { ...req.body }
        if (req.params.id) article.id = req.params.id

        try {
            existsOrError(article.name, "Nome não informado.")
            existsOrError(article.description, "Descrição não informada.")
            existsOrError(article.categoryId, "Categoria não informada.")
            existsOrError(article.userId, "Autor não informado.")
            existsOrError(article.content, "Conteúdo não informado")

        } catch (msg) {
            res.status(400).send(msg)
        }

        if (article.id) {
            app.db("articles")
                .update(article)
                .where({ id: article.id })
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db("articles")
                .insert(article)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }


    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db("articles")
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, "O artigo não foi encontrado.")
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    /* PAGINAÇÃO */
    const limit = 10 // usado para paginaão

    const get = async (req, res) => {
        const page = req.query.page || 1   /* verifica em qual pagina eu estou, caso seja o primeiro acesso ele vai ta null, então por padrao vou seta 1 = pagina 1 */

        const result = await app.db("articles").count("id").first() /* conta quantos arquivos eu tenho, e terna o primeiro */
        const count = parseInt(result.count)  /* transformo resultado em numero inteiro */

        app.db("articles")
            .select("id", "name", "description")
            .limit(limit).offset(page * limit - limit)  /* vai verifica a quantidade de registro que sera retornado( nesse caso 10 já que limit ta setado =10.). (page * limit -10 vai verificar em qual pagina eu to (ex: estou na pagina 1, então: ("page=1" * "limit=10" - "10") = paginação = 1 )) */
            .then(articles => res.json({ data: articles, count, limit })) /* me retornara um objeto json, usado para fazer a paginação, ja que vai ter meus atributos criado a cima: articles, count, limit */
            .catch(err => res.status(500).send(err))
    }


    const getById = (req, res) => {
        app.db("articles")
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString() /* transforma o valor de content em string (no meu banco ele e um binario)  */
                return res.json(article)
            })
            .catch(err => res.status(500).send(err))
    }


    return { save, remove, get, getById }

}