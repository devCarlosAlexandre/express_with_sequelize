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

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params;
        try {
            const umaPessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            });

            return res.status(200).json(umaPessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body;
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
            return res.status(201).json(novaPessoaCriada);

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizarPessoa(req, res) {
        const { id } = req.params;
        const pessoaEditada = req.body;
        try {
            const pessoa = await database.Pessoas.update(pessoaEditada, {
                where: {
                    id: Number(id)
                }
            });
            if (pessoa == 1) {
                const novaPessoa = await database.Pessoas.findOne({ where: { id: Number(id) } });
                return res.status(200).json(novaPessoa);
            } else {
                return res.status(401).json({ message: "não encontrado!" });
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletarPessoa(req, res) {
        const { id } = req.params;
        try {
            await database.Pessoas.destroy({
                where: {
                    id: Number(id)
                }
            });
            return res.status(204);

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            const umaMatricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });

            return res.status(200).json(umaMatricula);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params;
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
            return res.status(201).json(novaMatriculaCriada);

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = PessoaController;