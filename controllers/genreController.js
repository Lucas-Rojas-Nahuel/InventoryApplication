const genreModel = require("../models/genreModel");
const gameModel = require("../models/gameModel");

async function getAllGenres(req, res) {
  try {
    const genres = await genreModel.getAllGenres();

    res.render("genres/genreList", {
      title: "Lista de Géneros",
      genres: genres,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los Géneros");
  }
}

async function getGenreById(req, res) {
  try {
    const genre = await genreModel.getGenreById(req.params.id);
    const games = await gameModel.getGamesByGenre(req.params.id);

    if (!genre) {
      return res.status(404).render("404");
    }
    res.render("genres/genreDetail", {
      title: genre.name,
      genre: genre,
      games: games,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el Género");
  }
}

async function createGenreForm(req, res) {
  res.render("genres/genreForm", {
    title: "Crear Género",
    genre: null,
  });
}

async function createGenre(req, res) {
  try {
    await genreModel.postCreateGenre(req.body);
    res.redirect("/genres");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el género");
  }
}

async function updateGenreForm(req, res) {
  try {
    const genre = await genreModel.getGenreById(req.params.id);
    res.render("genres/genreForm", {
      title: "Editar género",
      genre: genre,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar el género");
  }
}

async function updateGenre(req, res) {
  try {
    const genre = {
      ...req.body,
      id: req.params.id,
    };

    await genreModel.postUpdateGenre(genre);
    res.redirect(`/genres/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el género");
  }
}

async function deleteGenre(req, res) {
  try {
    await genreModel.deleteGenre(req.params.id);
    res.redirect("/genres");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al eliminar el Género");
  }
}

module.exports = {
  getAllGenres,
  getGenreById,
  createGenreForm,
  createGenre,
  updateGenreForm,
  updateGenre,
  deleteGenre,
};
