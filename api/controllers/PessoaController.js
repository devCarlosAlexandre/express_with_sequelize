// const database = require("../models");
// const Sequelize = require("sequelize");
const { PessoasServices } = require("../services");
const pessoasServices = new PessoasServices();

class PessoaController {
    static async pegaTodasPessoasAtivas(req, res) {
        try {

            const pessoasAtivas = await pessoasServices.pegaTodosRegistros();
            return res.status(200).json(pessoasAtivas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTodasPessoas(req, res) {
        try {
            const todasPessoas = await database.Pessoas.scope('todos').findAll();
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
            return res.status(200).json({ message: "Pessoa deletada com sucesso" });

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params;
        try {
            await database.Pessoas.restore({
                where: {
                    id: Number(id)
                }
            });

            return res.status(200).json({ message: "Usuario restaurado com sucesso!" });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTodasMatriculas(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            const matriculas = await database.Matriculas.findAll({
                where: {
                    estudante_id: Number(estudanteId)
                }
            });
            return res.status(200).json(matriculas);
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

    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        const navasInfo = req.body;
        try {
            const pessoa = await database.Matriculas.update(navasInfo, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            if (pessoa == 1) {
                const matriculaAtualizada = await database.Matriculas.findOne({ where: { id: Number(matriculaId) } });
                return res.status(200).json(matriculaAtualizada);
            } else {
                return res.status(401).json({ message: "não encontrado!" });
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    static async deletarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            await database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId),
                }
            });
            return res.status(200).json({ message: `id ${matriculaId} deletado` });

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            await database.Matriculas.restore({
                where: {
                    id: Number(matriculaId),
                }
            });
            return res.status(200).json({ message: `id ${matriculaId} restaurado` });

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaMatriculas(req, res) {
        const { estudanteId } = req.params;
        try {
            const pessoa = await database.Pessoas.findOne({ where: { id: Number(estudanteId) } })
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaMatriculasTurma(req, res) {
        const { turmaId } = req.params;
        try {
            const todasMastriculas = await database.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                }
            });
            return res.status(200).json(todasMastriculas)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTurmasLotada(req, res) {
        const maxTurma = 2;
        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${maxTurma}`)
            })
            return res.status(200).json(turmasLotadas.count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async cancelaPessoa(req, res) {
        const { estudanteId } = req.params;
        try {
            database.sequelize.transaction(async transacao => {
                await database.Pessoas.update(
                    { ativo: false },
                    { where: { id: Number(estudanteId) } },
                    { transaction: transacao });

                await database.Matriculas.update(
                    { status: 'cancelado' },
                    { where: { estudante_id: Number(estudanteId) } },
                    { transaction: transacao });

                return res.status(200).json({ message: `Matricula referente estudante ${estudanteId} foram canceladas` });
            });

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = PessoaController;