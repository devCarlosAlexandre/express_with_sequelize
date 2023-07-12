const Services = require("./Services");
const dataBase = require("../models");

class PessoasServices extends Services {
    constructor() {
        super("Pessoas");
    };

    // passando where como parametro e já como objeto vazio
    async pegaRegistosAtivos(where = {}) {
        return dataBase[this.nomeModelo].findAll({ where: { ...where } })
    }

    async pegaTodosRegistros(where = {}) {
        return dataBase[this.nomeModelo].scope('todos').findAll({ where: { ...where } })
    }
}

module.exports = PessoasServices;