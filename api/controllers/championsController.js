class ChampionsController {

  static async getChampionStatsByName(req, res, next) {
    // Get a champion by their name (case insensitive)

    const db = req.db;

    const name = req.params.name.toLowerCase();

    try {
      const [champStats] = await db.query('SELECT * FROM champions WHERE LOWER(champion_name) = ?', [name])
      return res.json(champStats[0]);
    }
    catch (err) {
      throw err;
    }
  }

  static async getChampionPlayStatsByName(req, res, next) {
    const db = req.db;

    const name = req.params.name.toLowerCase();

    try {
      const [numMatchesWon] = await db.query(
        `SELECT COUNT(*) AS count FROM matches 
        WHERE (
          ? IN (
            LOWER(blue_top), 
            LOWER(blue_jungle), 
            LOWER(blue_mid), 
            LOWER(blue_adc), 
            LOWER(blue_support)
          )
          AND result = 'Blue'
        )
        OR (
          ? IN (
            LOWER(red_top), 
            LOWER(red_jungle), 
            LOWER(red_mid), 
            LOWER(red_adc), 
            LOWER(red_support)
          )
          AND result = 'Red'
        )`,
        [name, name]
      );

      const [numMatchesPlayed] = await db.query(
        `SELECT COUNT(*) AS count FROM matches 
        WHERE (
          ? IN (
            LOWER(blue_top), 
            LOWER(blue_jungle), 
            LOWER(blue_mid), 
            LOWER(blue_adc), 
            LOWER(blue_support)
          )
        )
        OR (
          ? IN (
            LOWER(red_top), 
            LOWER(red_jungle), 
            LOWER(red_mid), 
            LOWER(red_adc), 
            LOWER(red_support)
          )
        )`,
        [name, name]
      );

      const [totalMatchesPlayed] = await db.query(`SELECT COUNT(*) AS count FROM matches`);

      const winrate = numMatchesWon[0].count / numMatchesPlayed[0].count;
      const playrate = numMatchesPlayed[0].count / totalMatchesPlayed[0].count;

      return res.json({ 
        champion: name,
        winrate: winrate,
        playrate: playrate,
        won: numMatchesWon[0].count,
        played: numMatchesPlayed[0].count
      });
    }
    catch (err) {
      throw err;
    }
  }
}

module.exports = ChampionsController;