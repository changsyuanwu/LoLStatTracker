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

  static getAnzeTestQuery(req, res, next) {
    const db = req.db;

    db.query('SELECT * FROM test WHERE text = \"this is a string from the db\"', (err, results, fields) => {
      if (err) throw err;
      console.log(results);
      return res.send('Test output: ' + results[0]);
    });
  }

}
module.exports = IndexController;