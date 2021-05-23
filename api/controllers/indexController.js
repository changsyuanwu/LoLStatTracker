class IndexController {

  static getStarter(req, res, next) {
    return res.render('starter', {});
  }

  static getHome(req, res, next) {
    return res.render('home', {});
  }

}
module.exports = IndexController;