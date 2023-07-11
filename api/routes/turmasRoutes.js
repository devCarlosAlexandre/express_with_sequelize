const { Router } = require('express');
const TurmaController = require('../controllers/TurmaController');

const router = Router();
router
    .get('/turmas', TurmaController.pegarTodasTurmas)
    .get('/turmas/:id', TurmaController.pegaUmaTurma)
    .post('/turmas', TurmaController.criarTurma)
    .put('/turmas/:id', TurmaController.atualizaTurma)
    .delete('/turmas/:id', TurmaController.deletaTurma)
    .post("/turmas/:id/restaura", TurmaController.restauraTurma)

module.exports = router;