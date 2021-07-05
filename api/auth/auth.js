module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.user && req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({
      error: "unauthorized, please log in"
    });
  }
};