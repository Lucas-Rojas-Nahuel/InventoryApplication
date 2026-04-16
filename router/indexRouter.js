const { Router } = require("express");
const gameRouter = require("./gameRouter");
const genreRouter = require("./genreRouter");

const indexRouter = Router();

indexRouter.use("/genres", genreRouter);
indexRouter.use("/games", gameRouter);
indexRouter.get("/", (req, res) => res.render("index"));

module.exports = indexRouter;
