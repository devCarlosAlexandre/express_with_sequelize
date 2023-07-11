const { Router } = require("express");
const NivelController = require("../controllers/NivelController");

const router = Router();

router
    .get("/niveis", NivelController.pegaTodosNiveis)
    .get("/niveis/:id", NivelController.pegaUmNivel)
    .post("/niveis", NivelController.criaNivel)
    .put("/niveis/:id", NivelController.atualizaNivel)
    .delete("niveis/:id", NivelController.deletaNivel)
    .post("/niveis/:id/restaura", NivelController.restauraNiveis)

module.exports = router;