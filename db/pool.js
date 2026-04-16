const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "postgres",
  database: "game_inventory",
  password: "robasero4321",
  port: 5432,
});
