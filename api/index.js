const express = require("express");
const bodyParse = require("body-parser");

const app = express();

app.use(bodyParse.json())

const port = 3000;

app.get(
    "/teste", (req, res) => res
        .status(200)
        .send({ mensagem: "Bem vindo ao mundo da API node express e sequelize" })
);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

module.exports = app;