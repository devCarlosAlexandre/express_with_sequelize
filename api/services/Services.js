const dataBase = require("../models");

class Services {
    constructor(nomeModelo) {
        this.nomeModelo = nomeModelo;
    }

    async pegaTodosRegistros(where = {}) {
        return dataBase[this.nomeModelo].findAll({ where: { ...where } });
    }

    async pegaUmRegistro(where = {}) {
        return dataBase[this.nomeModelo].findOne({ where: { ...where } });
    }

    async criaUmRegistro(dados) {
        return dataBase[this.nomeModelo].create(dados);
    }

    async atualizaUmRegistro(dadosAtualizados, id, transacao = {}) {
        return dataBase[this.nomeModelo].update(dadosAtualizados, { where: { id: id } }, transacao)
    }

    async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
        return dataBase[this.nomeModelo].update(dadosAtualizados, { where: { ...where } }, transacao)
    }

    async deletaUmRegistro(id) {
        return dataBase[this.nomeModelo].destroy({ where: { id: id } });
    }

    async restauraRegistro(id) {
        return dataBase[this.nomeModelo].restore({ where: { id: id } });
    }

    async pegaRegistroApagado(id) {
        return dataBase[this.nomeModelo].findOne({ paranoid: true, where: { id: id } });
    }

    async encontraEContaRegistro(where = {}, agregadores) {
        return dataBase[this.nomeModelo].findAndCountAll({ where: { ...where }, ...agregadores });
    }
}

module.exports = Services;