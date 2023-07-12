const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router
    .get("/pessoas", PessoaController.pegaTodasPessoasAtivas)
    .get("/pessoas/todos", PessoaController.pegaTodasPessoas)
    .get("/pessoas/:id", PessoaController.pegaUmaPessoa)
    .get("/pessoas/:estudanteId/matricula", PessoaController.pegaMatriculas)
    .get("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.pegaUmaMatricula)
    .get("/pessoas/matricula/:turmaId/confirmadas", PessoaController.pegaMatriculasTurma)
    .post("/pessoas", PessoaController.criaPessoa)
    .post("/pessoas/:estudanteId/matricula", PessoaController.criaMatricula)
    .post("/pessoas/:id/restaura", PessoaController.restauraPessoa)
    .put("/pessoas/:id", PessoaController.atualizarPessoa)
    .put("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.atualizaMatricula)
    .delete("/pessoas/:id", PessoaController.deletarPessoa)
    .delete("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.deletarMatricula)

module.exports = router;