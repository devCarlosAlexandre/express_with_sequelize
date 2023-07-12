const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");
const MatriculaController = require("../controllers/MatriculaController")

const router = Router();

router
    .get("/pessoas", PessoaController.pegaTodasPessoas)
    .get("/pessoas/ativas", PessoaController.pegaTodasPessoasAtivas)
    .get("/pessoas/:id", PessoaController.pegaUmaPessoa)
    .get("/pessoas/:estudanteId/matricula", PessoaController.pegaMatriculas)
    .get("/pessoas/:estudanteId/matricula/:matriculaId", MatriculaController.pegaUmaMatricula)
    .get("/pessoas/matricula/:turmaId/confirmadas", MatriculaController.pegaMatriculasTurma)
    .get("/pessoas/matricula/lotada", MatriculaController.pegaTurmasLotada)
    .post("/pessoas", PessoaController.criaPessoa)
    .post("/pessoas/:estudanteId/matricula", MatriculaController.criaMatricula)
    .post("/pessoas/:id/restaura", PessoaController.restauraPessoa)
    .post("/pessoas/:estudanteId/cancela", PessoaController.cancelaPessoa)
    .put("/pessoas/:id", PessoaController.atualizarPessoa)
    .put("/pessoas/:estudanteId/matricula/:matriculaId", MatriculaController.atualizaMatricula)
    .delete("/pessoas/:id", PessoaController.deletarPessoa)
    .delete("/pessoas/:estudanteId/matricula/:matriculaId", MatriculaController.deletarMatricula)

module.exports = router;