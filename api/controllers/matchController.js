class MatchController {

  static async getChampionMatchesListByName(req, res, next) {
    const db = req.db;
    const name = req.params.name.toLowerCase();
    try {
      const [matchlist] = await db.query(
        `SELECT * FROM matches 
        WHERE ? IN (
          LOWER(blue_top), 
          LOWER(blue_jungle), 
          LOWER(blue_mid), 
          LOWER(blue_adc), 
          LOWER(blue_support),
          LOWER(red_top), 
          LOWER(red_jungle), 
          LOWER(red_mid), 
          LOWER(red_adc), 
          LOWER(red_support)
        )`,
        [name, name]
      );
      return res.json(matchlist);
    } catch (err) {
      throw err;
    }
  }

  static async getChampionWinningMatchesListByName(req, res, next) {
    const db = req.db;
    const name = req.params.name.toLowerCase();
    try {
      const [matchlist] = await db.query(
        `SELECT * FROM matches 
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
      return res.json(matchlist);
    } catch (err) {
      throw err;
    }
  }

  static async getChampionLosingMatchesListByName(req, res, next) {
    const db = req.db;
    const name = req.params.name.toLowerCase();
    try {
      const [matchlist] = await db.query(
        `SELECT * FROM matches 
        WHERE (
          ? IN (
            LOWER(blue_top), 
            LOWER(blue_jungle), 
            LOWER(blue_mid), 
            LOWER(blue_adc), 
            LOWER(blue_support)
          )
          AND result = 'Red'
        )
        OR (
          ? IN (
            LOWER(red_top), 
            LOWER(red_jungle), 
            LOWER(red_mid), 
            LOWER(red_adc), 
            LOWER(red_support)
          )
          AND result = 'Blue'
        )`,
        [name, name]
      );
      return res.json(matchlist);
    } catch (err) {
      throw err;
    }
  }

}

module.exports = MatchController;