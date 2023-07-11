const bodyParse = require("body-parser");
const pessoas = require("./pessoasRoutes");

module.exports = app => {
    app.use(bodyParse.json());
    app.use(pessoas);
}   