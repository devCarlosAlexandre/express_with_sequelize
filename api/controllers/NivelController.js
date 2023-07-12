const { NiveisServices } = require("../services");
const niveisServices = new NiveisServices();

class NivelController {
    static async pegaTodosNiveis(req, res) {
        try {
            const todosNiveis = await niveisServices.pegaTodosRegistros();
            return res.status(200).json(todosNiveis);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmNivel(req, res) {
        const { id } = req.params;
        try {
            const nivel = await niveisServices.pegaUmRegistro({ id });
            return res.status(200).json(nivel);

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaNivel(req, res) {
        const novoNivel = req.body;
        try {
            const novoNivelCriado = await niveisServices.criaUmRegistro(novoNivel);
            return res.status(201).json(novoNivelCriado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaNivel(req, res) {
        const infoNivel = req.body;
        const { id } = req.params;
        try {
            await niveisServices.atualizaUmRegistro(infoNivel, Number(id));
            const nivelAtualizado = await niveisServices.pegaUmRegistro({ id });

            return res.status(200).json(nivelAtualizado);

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaNivel(req, res) {
        const { id } = req.params;
        try {
            await niveisServices.deletaUmRegistro(Number(id));
            return res.status(204);

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraNiveis(req, res) {
        const { id } = req.params;
        try {
            await niveisServices.restauraRegistro(Number(id));
            return res.status(200).json({ message: "Usuario restaurado com sucesso!" });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = NivelController;