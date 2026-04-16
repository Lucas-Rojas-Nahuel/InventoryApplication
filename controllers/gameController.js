const gameModel = require("../models/gameModel");
const genreModel = require("../models/genreModel");

async function getAllGames(req, res) {
  try {
    const games = await gameModel.getAllGames();
    console.log(games);
    res.render("games/gameList", {
      title: "Lista de Juegos",
      games: games,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los juegos");
  }
}

async function getGameById(req, res) {
  try {
    const game = await gameModel.getGameId(req.params.id);
    res.render("games/gameDetail", {
      title: game.name,
      game: game,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el juego");
  }
}

async function createGameForm(req, res) {
  const genres = await genreModel.getAllGenres();
  res.render("games/gameForm", {
    title: "Crear Juego",
    game: null,
    genres: genres,
  });
}

async function createGame(req, res) {
  try {
    await gameModel.postCreateGame(req.body);
    res.redirect("/games");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el juego");
  }
}

async function updateGameForm(req, res) {
  try {
    const game = await gameModel.getGameId(req.params.id);
    const genres = await genreModel.getAllGenres();
    res.render("games/gameForm", {
      title: "Editar Juego",
      game: game,
      genres: genres,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar el juego");
  }
}

async function updateGame(req, res) {
  try {
    const game = { ...req.body, id: req.params.id };

    await gameModel.postUpdateGame(game);
    res.redirect(`/games/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el juego");
  }
}

async function deleteGame(req, res) {
  try {
    await gameModel.deleteGame(req.params.id);

    res.redirect("/games");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el juego");
  }
}

module.exports = {
  getAllGames,
  getGameById,
  createGameForm,
  createGame,
  updateGameForm,
  updateGame,
  deleteGame,
};
