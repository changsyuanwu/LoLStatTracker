const { NotFound } = require("http-errors");

class MatchesController {

  static async getMatches(req, res, next) {
    const db = req.db;
    let currentUser = req.user;
    if (currentUser) { 
      currentUser = req.user.username;
     } else {
       currentUser = 'SYSTEM';
     }
    try {
      console.log("Current user: " + currentUser);
      const [matchlist] = await db.query(
        `SELECT * FROM matches WHERE author = ?`, [currentUser]);
      return res.json(matchlist);
    } catch (err) {
      throw err;
    }
  }

  static async getChampionMatchesListFilters(req, res, next) {
    const db = req.db;
    let currentUser = req.user;
    if (currentUser) { 
      currentUser = req.user.username;
     } else {
       currentUser = 'SYSTEM';
     }

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
      let sqlQuery = `SELECT * FROM matches WHERE ((
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
      sqlQuery += `) AND author = ?`;
      if (req.query.patch) {
        sqlQuery += ` AND patch = ?`;
      }
      sqlQuery += `)`;
      
      let paramArray = [name, name, currentUser];
      if (req.query.patch) {
        paramArray.push(req.query.patch);
      }
      const [matchlist] = await db.query(sqlQuery, paramArray);
      return res.json(matchlist);
    } catch (err) {
      throw err;
    }
  }

  static async postNewMatch(req, res, next) {
    const db = req.db;
    let currentUser = req.user;

    // enforce database requirements
    if (!(req.body.blue_top || req.body.blue_jungle || req.body.blue_mid || 
          req.body.blue_adc || req.body.blue_support || req.body.red_top || 
          req.body.red_jungle || req.body.red_mid || req.body.red_adc ||
          req.body.red_support || req.body.result || req.body.patch)) {
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
    for (const championName in championsToCheck) {
      let [foundChampion] = await db.query(`SELECT COUNT(*) FROM champions 
        WHERE champion_name = LOWER(?)`, [championName]);
      if (foundChampion[0].count == 0) {
        return res.status(400).json({
          error: championName + " is not a valid champion name"
        });
      }
    }

    try {
      const [result] = await db.query(`INSERT INTO matches (
        blue_top, blue_jungle, blue_mid, blue_adc, blue_support, red_top, 
        red_jungle, red_mid, red_adc, red_support, result, patch, author)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [req.body.blue_top, req.body.blue_jungle,
         req.body.blue_mid, req.body.blue_adc, req.body.blue_support,
         req.body.red_top, req.body.red_jungle, req.body.red_mid, 
         req.body.red_adc, req.body.red_support, req.body.result,
         req.body.patch, currentUser.username]);
      return res.json(result);
    } catch (err) {
      throw err;
    }
  }

  static async updateMatch(req, res, next) {
    const db = req.db;
    let currentUser = req.user;

    // enforce database requirements
    if (!(req.body.blue_top || req.body.blue_jungle || req.body.blue_mid || 
        req.body.blue_adc || req.body.blue_support || req.body.red_top || 
        req.body.red_jungle || req.body.red_mid || req.body.red_adc ||
        req.body.red_support || req.body.result)) {
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
    for (const championName in championsToCheck) {
      let [foundChampion] = await db.query(`SELECT COUNT(*) FROM champions 
        WHERE champion_name = LOWER(?)`, [championName]);
      if (foundChampion[0].count == 0) {
        return res.status(400).json({
          error: championName + " is not a valid champion name"
        });
      }
    }
    let [foundMatch] = await db.query(`SELECT COUNT(*) FROM matches 
      WHERE match_id = ?`, [req.params.matchID]);
    if (foundMatch[0].count == 0) {
      return res.status(400).json({
        error: "match ID " + req.params.matchID + " does not exist"
      });
    }
    
    // check if currentUser is the author of the match
    let [correctAuthor] = await db.query(`SELECT author FROM matches 
      WHERE match_id = ?`, [req.params.matchID]);
    if (correctAuthor[0] != currentUser.username) {
      return res.status(401).json({
        error: "match ID " + req.params.matchID + " does not belong to user " 
               + currentUser.username
      });
    }

    try {
      await db.query(`UPDATE matches SET 
        blue_top = ?, blue_jungle = ?, blue_mid = ?, blue_adc = ?, 
        blue_support = ?, red_top = ?, red_jungle = ?, red_mid = ?, red_adc = ?,
        red_support = ?, result = ?, patch = ? WHERE match_id = ?`,
        [req.body.blue_top, req.body.blue_jungle,
         req.body.blue_mid, req.body.blue_adc, req.body.blue_support,
         req.body.red_top, req.body.red_jungle, req.body.red_mid, 
         req.body.red_adc, req.body.red_support, req.body.result,
         req.body.patch, req.params.matchID]);
    } catch (err) {
      throw err;
    }
  }

  static async deleteMatch(req, res, next) {
    const db = req.db;
    let currentUser = req.user;
    console.log(currentUser.username);
    let [foundMatch] = await db.query(`SELECT COUNT(*) FROM matches 
      WHERE match_id = ?`, [req.params.matchID]);
    if (foundMatch[0].count == 0) {
      return res.status(400).json({
        error: "match ID " + req.params.matchID + " does not exist"
      });
    }
  
    // check if currentUser is the author of the match
    let [correctAuthor] = await db.query(`SELECT author FROM matches 
      WHERE match_id = ?`, [req.params.matchID]);
    if (correctAuthor[0] != currentUser.username) {
      return res.status(401).json({
        error: "match ID " + req.params.matchID + " does not belong to user " 
               + currentUser.username
      });
    }

    try {
      await db.query(`DELETE FROM matches WHERE match_id = ?`,
        [req.params.matchID]);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = MatchesController;
