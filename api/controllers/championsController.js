class ChampionsController {

  static async getChampionNamesList(req, res, next) {
    const db = req.db;

    try {
      const [champsList] = await db.query(`SELECT champion_name FROM champions`);

      return res.json(champsList.map(champ => champ.champion_name));
    }
    catch (err) {
      throw err;
    }
  }

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

  static async updateChampionBaseStats(req, res, next) {
    const db = req.db;

    const name = req.query.name.toLowerCase();
    const statToUpdate = req.query.stat.toLowerCase();
    const statValue = req.query.value;

    try {
      const [result] = await db.query('UPDATE champions SET ?? = ? WHERE champion_name = ?', [statToUpdate, statValue, name])
      return res.status(200).json(result)
    }
    catch (err) {
      res.status(400).json({
        error: 'There was a problem processing the queried values'
      })
      throw err;
    }
  }

  static async getChampionPlayStatsByName(req, res, next) {
    const db = req.db;

    const name = req.params.name.toLowerCase();

    let currentUser;
    if (req.user) {
      currentUser = req.user.username;
    }
    else {
      currentUser = "SYSTEM";
    }

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
        )
        AND author = ?`,
        [name, name, currentUser]
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
        )
        AND author = ?`,
        [name, name, currentUser]
      );

      const [totalMatchesPlayed] = await db.query(
        `SELECT COUNT(*) AS count FROM matches WHERE author = ?`,
        [ currentUser ]
      );

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