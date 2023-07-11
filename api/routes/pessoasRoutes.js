const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router
    .get("/pessoas", PessoaController.pegaTodasPessoasAtivas)
    .get("/pessoas/todos", PessoaController.pegaTodasPessoas)
    .get("/pessoas/:id", PessoaController.pegaUmaPessoa)
    .post("/pessoas", PessoaController.criaPessoa)
    .put("/pessoas/:id", PessoaController.atualizarPessoa)
    .delete("/pessoas/:id", PessoaController.deletarPessoa)
    .get("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.pegaUmaMatricula)
    .get("/pessoas/:estudanteId/matricula/", PessoaController.pegaTodasMatriculas)
    .put("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.atualizaMatricula)
    .delete("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.deletarMatricula)
    .post("/pessoas/:estudanteId/matricula", PessoaController.criaMatricula)
    .post("/pessoas/:id/restaura", PessoaController.restauraPessoa)

module.exports = router;