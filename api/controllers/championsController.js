class ChampionsController {

  static getChampionByName(req, res, next) {
    // Get a champion by their name (case insensitive)

    const db = req.db;

    const name = req.params.name;

    db.query('SELECT * FROM champions WHERE LOWER(champion_name) = ?', [name], (err, results, fields) => {
      if (err) throw err;
      return res.json(results);
    });
  }

}

module.exports = ChampionsController;