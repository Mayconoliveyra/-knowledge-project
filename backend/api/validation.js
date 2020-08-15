module.exports = app => {
    function existsOrError(value, msg) {
        if (!value) throw msg /* se o valor for false: retorna mensagem de erro */
        if (Array.isArray(value) && value.length === 0) throw msg /* se for um array e tamanho 0: retorna mensagem erro */
        if (typeof value === "string" && !value.trim()) throw msg /* se o for uma string com apenas espaço vazio: retorna msg erro */
    }

    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }

    function equalsOrError(valueA, valueB, msg) {
        if (valueA !== valueB) throw msg
    }

    return { existsOrError, notExistsOrError, equalsOrError }
}