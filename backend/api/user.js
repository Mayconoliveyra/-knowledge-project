const bcrypt = require("bcrypt-nodejs") /* bibioteca de criptografia */

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    /* FUNÇÃO DE CRIPTOGRAFAR SENHA  */
    const encryptPassword = password => { /* função para criptografar a senha */
        const salt = bcrypt.genSaltSync(10) /* criar o sal da senha ( criar uma chave para a criptografia ) */
        return bcrypt.hashSync(password, salt) /* retorna a senha criptografada */
    }


    /* VALIDAÇÃO DAS INFORMAÇOES */
    const save = async (req, res) => {  /*  async necessario para poder usar o banco */
        const user = { ...req.body } /* espalhando meu arquivo recebido em pedaços, ja que vem em formato unico .json */

        
        if (req.params.id) { /* verifica se na requisição veio o id setado */
            user.id = req.params.id /* se tiver setado user.id recebe o id */
        }

        try {
            existsOrError(user.name, "Nome não informado")
            existsOrError(user.email, "E-mail não informado")
            existsOrError(user.password, "Senha não informada")
            equalsOrError(user.password, user.confirmPassword, "Senhas não conferem")

            const userFromDB = await app.db("users").where({ email: user.email }).first()
            if (!user.id) { /* so chama esse if, caso o id nao esteja setado, isso vai verificar se ja tem usuário cadastrado com o mesmo email */
                notExistsOrError(userFromDB, "Usuário já cadastrado") /* se nao ouver erro aqui, significa que o email do usuario nao foi cadastrado ainda */
            }
        } catch (msg) {
            return res.status(400).send(msg) /* caso de algum erro cai aqui. erro 400 ( erro do lado do client, ou seja ele informo alguma coisa errrada) */
        }


        /* CRIPTOGRAFANDO A SENHA */
        user.password = encryptPassword(user.password) /* criptografo a senha do usuario com a funcao que eu criei logo a cima */
        delete user.confirmPassword  /* deleto a senha de confirmação já que nao vou salvar ela no banco */


        /* ALTERANDO O BANCO (inserindo um novo usuario ou alterando) */
        if (user.id) { /* se o id ta setado significa que o usuario ja e cadastrado, entao vou fazer um alteração */
            app.db("users")
                .update(user)
                .where({ id: user.id })
                .then(() => res.status(204).send()) /* se não ouver nenhum erro retorna status 204 = success */
                .catch(err => res.status(500).send(err)) /* caso algum erro retorna erro 500 = erro do lado do servidor */

        } else { /* else = se o id nao ta setado então e um novo usuario */
            app.db("users")
                .insert(user)
                .then(() => res.status(204).send()) /* status 204 = success */
                .catch(err => res.status(500).send(err)) /* status 500 = erro lado servidor */
        }

    }

    /* FAZENDO SELECT NO BANCO  */
    const get = (req, res) => {
        app.db("users")
            .select("id", "name", "email", "admin")
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db("users")
            .select("id", "name", "email", "admin")
            .where({ id: req.params.id })
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById }
}