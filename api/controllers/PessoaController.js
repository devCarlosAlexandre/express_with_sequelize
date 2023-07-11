const database = require("../models");

class PessoaController {
    static async pegaTodasPessoas(req, res) {
        try {
            const todasPessoas = await database.Pessoas.findAll();
            return res.status(200).json(todasPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController;