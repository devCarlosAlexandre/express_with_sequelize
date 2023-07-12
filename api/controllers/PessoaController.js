const { PessoasServices } = require("../services");
const pessoasServices = new PessoasServices();

class PessoaController {
    static async pegaTodasPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await pessoasServices.pegaRegistosAtivos();
            return res.status(200).json(pessoasAtivas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTodasPessoas(req, res) {
        try {
            const todasPessoas = await pessoasServices.pegaTodosRegistros();
            return res.status(200).json(todasPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params;
        try {
            const umaPessoa = await pessoasServices.pegaUmRegistro({ id });
            return res.status(200).json(umaPessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaMatriculas(req, res) {
        const { estudanteId } = req.params
        try {
            const matriculas = await pessoasServices.pegaMatriculasPorEstudante({ id: Number(estudanteId) })
            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body;
        try {
            const novaPessoaCriada = await pessoasServices.criaUmRegistro(novaPessoa);
            return res.status(201).json(novaPessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizarPessoa(req, res) {
        const { id } = req.params;
        const pessoaEditada = req.body;
        try {
            const pessoa = await pessoasServices.atualizaUmRegistro(pessoaEditada, Number(id));
            if (pessoa == 1) {
                const novaPessoa = await pessoasServices.pegaRegistosAtivos({ where: { id: Number(id) } });
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
            await pessoasServices.deletaUmRegistro(Number(id));
            return res.status(200).json({ message: "Pessoa deletada com sucesso" });

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params;
        try {
            await pessoasServices.restauraRegistro(Number(id));

            return res.status(200).json({ message: "Usuario restaurado com sucesso!" });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async cancelaPessoa(req, res) {
        const { estudanteId } = req.params;
        try {
            await pessoasServices.cancelaPessoasEmatriculas(Number(estudanteId))
            return res.status(200).json({ message: `Matricula referente estudante ${estudanteId} foram canceladas` });

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


}
module.exports = PessoaController;