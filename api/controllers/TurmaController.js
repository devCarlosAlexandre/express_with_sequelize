const database = require("../models");

class TurmaController {
    static async pegarTodasTurmas(req, res) {
        try {
            const todasTurmas = await database.Turmas.findAll();
            return res.status(200).json(todasTurmas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static async pegaUmaTurma(req, res) {
        const { id } = req.params;
        try {
            const turma = await database.Turmas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(turma);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static async criarTurma(req, res) {
        const novaTurma = req.body;
        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma);
            return res.status(201).json(novaTurmaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaTurma(req, res) {
        const { id } = req.params;
        const infoAtualizarTurma = req.body;

        try {
            await database.Turmas.update(infoAtualizarTurma, { where: { id: Number(id) } });
            let turmaAtualizada = await database.Turmas.findOne({ where: { id: Number(id) } });
            return res.status(200).json(turmaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaTurma(req, res) {
        const { id } = req.params;
        try {
            await database.Turmas.destroy({ where: { id: Number(id) } });
            return res.status(204);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraTurma(req, res) {
        const { id } = req.params;
        try {
            await database.Turmas.restore({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json({ message: "Usuario restaurado com sucesso!" });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}


module.exports = TurmaController;