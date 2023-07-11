const bodyParse = require("body-parser");
const pessoas = require("./pessoasRoutes");
const niveis = require("./niveisRoutes");
const turmas = require("./turmasRoutes");

module.exports = app => {
    app.use(bodyParse.json(),
        pessoas,
        niveis,
        turmas
    );
}   