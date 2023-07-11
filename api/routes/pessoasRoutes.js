const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router.get("/pessoas", PessoaController.pegaTodasPessoas);
router.get("/pessoas/:id", PessoaController.pegaUmaPessoa);
router.post("/pessoas", PessoaController.criaPessoa);
router.put("/pessoas/:id", PessoaController.atualizarPessoa);
router.delete("/pessoas/:id", PessoaController.deletarPessoa);
router.get("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.pegaUmaMatricula);
router.post("/pessoas/:estudanteId/matricula", PessoaController.criaMatricula);

module.exports = router;