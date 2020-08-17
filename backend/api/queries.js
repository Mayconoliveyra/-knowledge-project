module.exports = {
    /* SLQ RESPONSAVEL POR DESCOBRIR TODOS OS NOS FILHOS DE UM ARTIGO*/
    /* 
    criar um sql recursivo( ou seja ele vai executar varias vezes automaticamente)
    vou criar um nova tabela chamada subcategories que tem o atributo "Id"
    vou dizer que ela vai usar a tabela categories ( pra fazer essas repitiçoes )
    esse id=? e o id que peguei como params na minha tabela article.js que tambem o id pai do artigo
    vou fazer uma uniao
    subcategories vai receber todos id.catetories que tem como perentId = igual o id da categoria pai que foi passado na chamada 
    
    por final chamo a tabela subcategories que eu mesmo crei, nela vai ter todos id das categorias filhas da categorias que passei como paramentro
    */
    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) AS (
            SELECT id FROM categories WHERE id =?
            UNION ALL
            SELECT c.id FROM subcategories, categories c
                WHERE "parentId" = subcategories.id
        )
        SELECT id FROM subcategories
    `


}