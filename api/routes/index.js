const bodyParse = require("body-parser");
const PessoasController = require("../controllers/PessoaController.js")

module.exports = app => {
    app.use(bodyParse.json());
    app.get('/', (req, res) => PessoasController.pegaTodasPessoas(req, res));
}   