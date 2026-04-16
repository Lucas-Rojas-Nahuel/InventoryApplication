const pool = require("../db/pool");

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genre");
  return rows;
}

async function getGenreById(genreId) {
  const { rows } = await pool.query("SELECT * FROM genre WHERE id = $1", [
    genreId,
  ]);
  return rows[0];
}

async function getGenreWithGames(genreId) {
  const query = `
    SELECT 
      genre.id,
      genre.name,
      genre.description,
      game.id AS game_id,
      game.name AS game_name
    FROM genre
    LEFT JOIN game
    ON game.genre_id = genre.id
    WHERE genre.id = $1
  `;

  const { rows } = await pool.query(query, [genreId]);
  return rows;
}

async function postCreateGenre(genre) {
  const { name, description } = genre;

  const query = `
  INSERT INTO genre (name, description)
  VALUES ($1,$2)
  RETURNING *;
  `;

  const { rows } = await pool.query(query, [name, description]);
  return rows[0];
}

async function postUpdateGenre(genre) {
  const { id, name, description } = genre;
  const query = `
  UPDATE genre
  SET name= $1,
    description = $2
WHERE id = $3
RETURNING *;
  `;

  const { rows } = await pool.query(query, [name, description, id]);

  return rows[0];
}

async function deleteGenre(genreId) {
  await pool.query("DELETE FROM genre WHERE id = $1", [genreId]);
}

module.exports = {
  getAllGenres,
  getGenreById,
  getGenreWithGames,
  postCreateGenre,
  postUpdateGenre,
  deleteGenre,
};
