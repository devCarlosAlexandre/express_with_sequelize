const Sequelize = require("sequelize");
const { MatriculasServices } = require("../services");
const matriculasServices = new MatriculasServices();

class MatriculaController {
    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            const umaMatricula = await matriculasServices.pegaUmRegistro({ id: matriculaId, estudante_id: estudanteId });
            return res.status(200).json(umaMatricula);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params;
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
        try {
            const novaMatriculaCriada = await matriculasServices.criaUmRegistro(novaMatricula);
            return res.status(201).json(novaMatriculaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        const navasInfo = req.body;
        try {
            const pessoa = await matriculasServices.atualizaRegistros(navasInfo, { id: Number(matriculaId), estudante_id: Number(estudanteId) });
            return res.status(200).json({ mensagem: `id ${pessoa} atualizado` })
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletarMatricula(req, res) {
        const { matriculaId } = req.params;
        try {
            await matriculasServices.deletaUmRegistro(Number(matriculaId));
            return res.status(200).json({ message: `id ${matriculaId} deletado` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraMatricula(req, res) {
        const { matriculaId } = req.params;
        try {
            await matriculasServices.restauraRegistro(Number(matriculaId));
            return res.status(200).json({ message: `id ${matriculaId} restaurado` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTurmasLotada(req, res) {
        const maxTurma = 2;
        try {
            const turmasLotadas = await matriculasServices
                .encontraEContaRegistro({ status: 'confirmado' },
                    {
                        attributes: ['turma_id'],
                        group: ['turma_id'],
                        having: Sequelize.literal(`count(turma_id) >= ${maxTurma}`)
                    })
            return res.status(200).json(turmasLotadas.count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaMatriculasTurma(req, res) {
        const { turmaId } = req.params;
        try {
            const todasMastriculas = await matriculasServices
                .encontraEContaRegistro({ turma_id: Number(turmaId), status: 'confirmado' }, { limit: 20, order: [['estudante_id', 'DESC']] });
            return res.status(200).json(todasMastriculas)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }



    static async pegaTodasMatriculas(req, res) {
        const { estudanteId } = req.params;
        try {
            const matriculas = await matriculasServices.pegaTodosRegistros({
                where: {
                    estudante_id: Number(estudanteId)
                }
            });
            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = MatriculaController;