const pool = require("../db/pool");

async function getAllGames() {
  const query = `
    SELECT 
      game.id,
      game.name,
      game.description,
      game.platform,
      game.release_year,
      game.image_url,
      genre.name AS genre
    FROM game
    LEFT JOIN genre
    ON game.genre_id = genre.id
    ORDER BY game.id;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

async function getGameId(gameId) {
  const query = `
    SELECT 
      game.*,
      genre.name AS genre
    FROM game
    LEFT JOIN genre
    ON game.genre_id = genre.id
    WHERE game.id = $1
  `;
  const { rows } = await pool.query(query, [gameId]);
  return rows[0];
}

async function getGamesByGenre(genreId) {
  const { rows } = await pool.query("SELECT * FROM game WHERE genre_id = $1", [
    genreId,
  ]);

  return rows;
}

async function postCreateGame(game) {
  const { name, description, platform, release_year, genre_id, image_url } =
    game;

  const query = `
    INSERT INTO game (name, description, platform, release_year, genre_id, image_url)
    VALUES ($1, $2,$3,$4,$5,$6)
    RETURNING *;
    `;

  const { rows } = await pool.query(query, [
    name,
    description,
    platform,
    release_year,
    genre_id,
    image_url,
  ]);

  return rows[0];
}

async function postUpdateGame(game) {
  const { id, name, description, platform, release_year, genre_id, image_url } =
    game;

  const query = `
    UPDATE game 
    SET name = $1,
        description = $2,
        platform = $3,
        release_year = $4,
        genre_id = $5,
        image_url = $6
    WHERE id = $7
    RETURNING *;
    `;

  const { rows } = await pool.query(query, [
    name,
    description,
    platform,
    release_year,
    genre_id,
    image_url,
    id,
  ]);

  return rows[0];
}

async function deleteGame(gameId) {
  await pool.query("DELETE FROM game WHERE id = $1", [gameId]);
}

module.exports = {
  getAllGames,
  getGameId,
  getGamesByGenre,
  postCreateGame,
  postUpdateGame,
  deleteGame,
};
