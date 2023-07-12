const dataBase = require("../models");

class Services {
    constructor(nomeModelo) {
        this.nomeModelo = nomeModelo;
    }

    async pegaTodosRegistros() {
        return dataBase[this.nomeModelo].findAll();
    }

    async pegaUmRegistro(id) {

    }

    async criaUmRegistro(dados) {

    }

    async atualizaUmRegistro(dadosAtualizados, id, transacao = {}) {
        return dataBase[this.nomeModelo].update(dadosAtualizados, { where: { id: id } }, transacao)
    }

    async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
        return dataBase[this.nomeModelo].update(dadosAtualizados, { where: { ...where } }, transacao)
    }

    async deletaUmRegistro(id) {

    }
}

module.exports = Services;