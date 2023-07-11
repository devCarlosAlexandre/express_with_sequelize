const dataBase = require("../models");

class NivelController {
    static async pegaTodosNiveis(req, res) {
        try {
            const todosNiveis = await dataBase.Niveis.findAll();
            return res.status(200).json(todosNiveis);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmNivel(req, res) {
        const { id } = req.params;
        try {
            const nivel = await dataBase.Niveis.findOne({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json(nivel);

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaNivel(req, res) {
        const infoNivel = req.body;
        const { id } = req.params;
        try {
            await dataBase.Niveis.update(infoNivel, {
                where: {
                    id: Number(id)
                }
            })
            const nivelAtualizado = await dataBase.Niveis.findOne({ where: { id: id } });

            return res.status(200).json(nivelAtualizado);

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaNivel(req, res) {
        const { id } = req.params;
        try {
            await dataBase.Niveis.destroy({
                where: {
                    id: Number(id)
                }
            })
            return res.status(204);

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = NivelController;