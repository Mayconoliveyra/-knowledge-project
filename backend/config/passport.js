const { authSecret } = require("../.env")
const passport = require("passport")
const passportJwt = require("passport-jwt")
const { Strategy, ExtractJwt } = passportJwt


module.exports = app => {

    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }


    const strategy = new Strategy(params, (payload, done) => {
        app.db("users")
            .where({ id: payload.id })
            .first()
            .then(user => done(null, user ? { ...payload } : false)) /* payload só e gerado caso o usuario tenha feita a autenticação. payload tem todas informaçoes do usuario (email, senha, password, token...) */
            .catch(err => done(err, false))
    })


    passport.use(strategy)

    /* se a rota tiver marcada com esse metodo (authenticate), significa que vc so consegue acessa a ela, caso esteja autenticado "resumindo ter token valido" */
    return { authenticate: () => passport.authenticate("jwt", { session: false }) }

}


