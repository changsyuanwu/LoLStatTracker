class IndexController {

  static getIndex(req, res, next) {
    return res.send("I'm working");
  }

}
module.exports = IndexController;