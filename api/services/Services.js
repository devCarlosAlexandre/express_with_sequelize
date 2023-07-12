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

    async atualizaUmRegistro(dadosAtualizados, id) {

    }

    async deletaUmRegistro(id) {

    }
}

module.exports = Services;