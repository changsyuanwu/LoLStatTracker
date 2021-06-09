class IndexController {

  static getIndex(req, res, next) {
    return res.send("I'm working");
  }

  static getTestQuery(req, res, next) {
    const db = req.db;

    db.query('SELECT 1 + 1 AS solution', (err, results, fields) => {
      if (err) throw err;
      return res.send('The solution is: ' + results[0].solution);
    });
  }

}
module.exports = IndexController;