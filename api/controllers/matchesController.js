const { NotFound } = require("http-errors");

class MatchesController {

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
      if (position != 'all' && position != 'top' && position != 'jungle' 
          && position != 'mid' && position != 'adc' && position != 'support') {
        return res.status(400).json({
          error: "Invalid position"
        });
      }
    } else {
      position = 'all';
    }
    
    let outcome;
    if (req.query.outcome) {
      outcome = req.query.outcome.toLowerCase();
      if (outcome != 'all' && outcome != 'win' && outcome != 'loss') {
        return res.status(400).json({
          error: "Invalid outcome"
        });
      }
    } else {
      outcome = 'all';
    }
    
    try {
      let sqlQuery = `SELECT * FROM matches WHERE (
        ? IN (
          ${position === 'all' ? `LOWER(blue_top), LOWER(blue_jungle), LOWER(blue_mid), LOWER(blue_adc), LOWER(blue_support)` : ``}
          ${position === 'top' ? `LOWER(blue_top)` : ``}
          ${position === 'jungle' ? `LOWER(blue_jungle)` : ``}
          ${position === 'mid' ? `LOWER(blue_mid)` : ``}
          ${position === 'adc' ? `LOWER(blue_adc)` : ``}
          ${position === 'support' ? `LOWER(blue_support)` : ``}
        )`;
      if (outcome != 'all') {
        sqlQuery += `AND result = ${outcome === 'win' ? `'Blue'` : `'Red'`}`;
      }
      sqlQuery += `) OR (
        ? IN (
          ${position === 'all' ? `LOWER(red_top), LOWER(red_jungle), LOWER(red_mid), LOWER(red_adc), LOWER(red_support)` : ``}
          ${position === 'top' ? `LOWER(red_top)` : ``}
          ${position === 'jungle' ? `LOWER(red_jungle)` : ``}
          ${position === 'mid' ? `LOWER(red_mid)` : ``}
          ${position === 'adc' ? `LOWER(red_adc)` : ``}
          ${position === 'support' ? `LOWER(red_support)` : ``}
        )`;
      if (outcome != 'all') {
        sqlQuery += `AND result = ${outcome === 'win' ? `'Red'` : `'Blue'`}`;
      }
      sqlQuery += `)`;
      
      const [matchlist] = await db.query(sqlQuery, [name, name]);
      return res.json(matchlist);
    } catch (err) {
      throw err;
    }
  }

}

module.exports = MatchesController;
