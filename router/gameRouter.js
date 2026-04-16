const { Router } = require("express");

const gameRouter = Router();

const gameController = require("../controllers/gameController");

gameRouter.get("/", gameController.getAllGames);

gameRouter.get("/create", gameController.createGameForm);
gameRouter.post("/create", gameController.createGame);

gameRouter.get("/:id", gameController.getGameById);
gameRouter.get("/:id/update", gameController.updateGameForm);
gameRouter.post("/:id/update", gameController.updateGame);

gameRouter.post("/:id/delete", gameController.deleteGame);

module.exports = gameRouter;
