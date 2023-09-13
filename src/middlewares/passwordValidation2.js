const { validationResult } = require("express-validator");

function validateChangePassword(req, res, next) {
  const resultValidationPass = validationResult(req);
  if (resultValidationPass.errors.length > 0) {
    return res.render("users/changePassUser", {
      errors: resultValidationPass.mapped(),
    });
  }

  next();
}

module.exports = validateChangePassword;
