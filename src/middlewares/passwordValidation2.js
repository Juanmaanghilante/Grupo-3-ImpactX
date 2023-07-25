const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const usuarioCambiarPass = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/passwords.json")));


function validateChangePassword(req, res, next) {
    
    const resultValidationPass = validationResult(req);

    if (resultValidationPass.errors.length > 0) {
        return res.render("users/passwordChange", { errors: resultValidationPass.mapped()});
    }

    next();
}

module.exports = validateChangePassword;