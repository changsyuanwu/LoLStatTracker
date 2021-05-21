const Logger = require('./logger.js');

class ErrorHandler {
  static defaultDBUpdateError(req, res, err) {
    Logger.error(err);
    req.flash('error_msg', "defaultDBUpdateError");
    return res.redirect('back');
  }

  static defaultDBRetrieveError(req, res, err) {
    Logger.error(err);
    req.flash('error_msg', "defaultDBRetrieveError");
    return res.redirect('back');
  }

  static defaultDBDeleteError(req, res, err) {
    Logger.error(err);
    req.flash('error_msg', "defaultDBDeleteError");
    return res.send('failed');
  }

  static defaultValidationError(req, res, err) {
    Logger.error(err);
    req.flash('error_msg', "defaultValidationError");
    return res.redirect('back');
  }

  static customError(req, res, err, msg, redirect) {
    Logger.error(err);
    req.flash('error_msg', msg);
    return res.redirect(redirect);
  }
}

module.exports = ErrorHandler;