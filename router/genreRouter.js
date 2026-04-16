const { Router } = require("express");

const genreRouter = Router();

const genreController = require("../controllers/genreController");

genreRouter.get("/", genreController.getAllGenres);

genreRouter.get("/create", genreController.createGenreForm);
genreRouter.post("/create", genreController.createGenre);

genreRouter.get("/:id", genreController.getGenreById);
genreRouter.get("/:id/update", genreController.updateGenreForm);
genreRouter.post("/:id/update", genreController.updateGenre);

genreRouter.post("/:id/delete", genreController.deleteGenre);

module.exports = genreRouter;
 