class IndexController {

  static getIndex(req, res, next) {
    return res.send("I'm working");
  }

  static getTestQuery(req, res, next) {
    const db = req.db;

    // err will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    db.query('SELECT * FROM test', (err, results, fields) => {
      if (err) throw err;
      //testset
      return res.json(results);
    });
  }

}
module.exports = IndexController;