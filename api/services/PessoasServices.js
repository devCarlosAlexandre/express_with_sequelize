const Services = require("./Services");
const dataBase = require("../models");

class PessoasServices extends Services {
    constructor() {
        super("Pessoas");
        this.matriculas = new Services('Matriculas')
    };

    // passando where como parametro e já como objeto vazio
    async pegaRegistosAtivos(where = {}) {
        return dataBase[this.nomeModelo].findAll({ where: { ...where } })
    }

    async pegaTodosRegistros(where = {}) {
        return dataBase[this.nomeModelo].scope('todos').findAll({ where: { ...where } })
    }


    async cancelaPessoasEmatriculas(estudanteId) {
        return dataBase.sequelize.transaction(async transacao => {
            await super.atualizaUmRegistro({ ativo: false }, estudanteId, { transaction: transacao });
            await this.matriculas.atualizaRegistros({ status: "cancelado" }, { estudante_id: estudanteId }, { transaction: transacao })
        });
    }
}

module.exports = PessoasServices;