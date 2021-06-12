const { NotFound } = require("http-errors");

class MatchController {

  static async getMatches(req, res, next) {
    const db = req.db;
    try {
      const [matchlist] = await db.query(`SELECT * FROM matches`);
      return res.json(matchlist);
    } catch (err) {
      throw err;
    }
  }

  static async getChampionMatchesListFilters(req, res, next) {
    const db = req.db;
    if (!req.query.name) {
      return res.status(400).json({
        error: "Champion name was not provided."
      });
    }
    const name = req.query.name.toLowerCase();

    let position;
    if (req.query.position) {
      position = req.query.position.toLowerCase();
    } else {
      position = 'all';
    }
    
    let outcome;
    if (req.query.outcome) {
      outcome = req.query.outcome.toLowerCase();
    } else {
      outcome = 'all';
    }
    
    try {
      const [matchlist] = await db.query(
        `SELECT * FROM matches 
          WHERE (
            ? IN (
          ${position === 'all' ? `LOWER(blue_top), LOWER(blue_jungle), LOWER(blue_mid), LOWER(blue_adc), LOWER(blue_support)` : ``}
          ${position === 'top' ? `LOWER(blue_top)` : ``}
          ${position === 'jungle' ? `LOWER(blue_jungle)` : ``}
          ${position === 'mid' ? `LOWER(blue_mid)` : ``}
          ${position === 'adc' ? `LOWER(blue_adc)` : ``}
          ${position === 'support' ? `LOWER(blue_support)` : ``}
            ) AND result = ${outcome === 'all' || outcome === 'win' ? `'Blue'` : `'Red'`}
          )
          OR (
            ? IN (
              ${position === 'all' ? `LOWER(red_top), LOWER(red_jungle), LOWER(red_mid), LOWER(red_adc), LOWER(red_support)` : ``}
              ${position === 'top' ? `LOWER(red_top)` : ``}
              ${position === 'jungle' ? `LOWER(red_jungle)` : ``}
              ${position === 'mid' ? `LOWER(red_mid)` : ``}
              ${position === 'adc' ? `LOWER(red_adc)` : ``}
              ${position === 'support' ? `LOWER(red_support)` : ``}
            )
            AND result = ${outcome === 'all' || outcome === 'win' ? `'Red'` : `'Blue'`}
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