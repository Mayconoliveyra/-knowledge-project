const { authSecret } = require("../.env")
const jwt = require("jwt-simple")
const bcrypt = require("bcrypt-nodejs")


module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send("Informe usuário e senha!")
        }

        const user = await app.db("users")
            .where({ email: req.body.email })
            .first()

        if (!user) return res.status(400).send("Usuário não encontrado!")

        const isMatch = bcrypt.compareSync(req.body.password, user.password) /* verifica se a senha informada é igual a senha que esta salva criptografada no banco */
        if (!isMatch) return res.status(401).send("Email/Senha inválidos!") /* erro 401 = erro de validação */

        const now = Math.floor(Date.now() / 1000) /* pego a hora atual em numeros */

        const payload = { /* informaçoes que tbm serão usadas na hora de gerar o token */
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,   /* iat = abriviatura de: emitido em (basicamente recebe a hora que foi emitido, porem em formato numerico) */
            exp: now + 60 * 5 /* token expira em 5 minuto */
           /*  exp: now + (60 * 60 * 24 * 3) */ /* data de expiração=  60 * 60 * 24 * 3 = 3 dias / segundos * minutos * horas * dias  */

        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret) /* cria o token */
        })

    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret) /* decodifica o token */
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) {
            // problema com o token
        }

        res.send(false)
    }


    return { validateToken, signin }
}