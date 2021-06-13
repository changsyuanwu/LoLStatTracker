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

  static async postNewMatch(req, res, next) {
    const db = req.db;
    /*
    // enforce database requirements
    if (req.body.blue_top || req.body.blue_jungle || req.body.blue_mid || 
        req.body.blue_adc || req.body.blue_support || req.body.red_top || 
        req.body.red_jungle || req.body.red_mid || req.body.red_adc ||
        req.body.red_support || req.body.result) {
      return res.status(400).json({
        error: "Missing mandatory field"
      });
    }
    if (req.body.result != 'Blue' && req.body.result != 'Red') {
      return res.status(400).json({
        error: "Result must be one of 'Blue' or 'Red'"
      });
    }
    const championsToCheck = [req.body.blue_top, req.body.blue_jungle,
      req.body.blue_mid, req.body.blue_adc, req.body.blue_support,
      req.body.red_top, req.body.red_jungle, req.body.red_mid, req.body.red_adc,
      req.body.red_support];
    let [foundChampion];
    for (const championName in championsToCheck) {
      foundChampion = await db.query(`SELECT COUNT(*) FROM champions 
        WHERE champion_name = LOWER(?)`, [championName]);
      if (foundChampion[0] == 0) {
        return res.status(400).json({
          error: championName + " is not a valid champion name"
        });
      }
    }

    try {
      await db.query(`INSERT INTO matches (
        blue_top, blue_jungle, blue_mid, blue_adc, blue_support, red_top, 
        red_jungle, red_mid, red_adc, red_support, result)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [req.body.blue_top, req.body.blue_jungle,
         req.body.blue_mid, req.body.blue_adc, req.body.blue_support,
         req.body.red_top, req.body.red_jungle, req.body.red_mid, 
         req.body.red_adc, req.body.red_support, req.body.result]);
    } catch (err) {
      throw err;
    }
    */
    try {
      await db.query(
        `INSERT INTO matches (
          blue_top, blue_jungle, blue_mid, blue_adc, blue_support, red_top, 
          red_jungle, red_mid, red_adc, red_support, result)
        VALUES (
          'Lee Sin', 'Rumble', 'Sett', 'Varus', 'Lulu', 'Viego', 'Xin Zhao',
          'Lucian', 'Ezreal', 'Leona', 'Red')`);
      console.log("Entry created successfully.");
    } catch (err) {
      throw err;
    }
  }


}

module.exports = MatchesController;
