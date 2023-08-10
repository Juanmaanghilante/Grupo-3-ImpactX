const db = require("../database/models");
const nodemailer = require("nodemailer");
require("dotenv").config();
const ContactMessage = db.ContactMessage;
const { validationResult } = require("express-validator");

module.exports = {
  index: (req, res) => {
    return res.render("index");
  },
  createContactenos: async (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("index", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    try {
      const nuevaSolicitud = await ContactMessage.create({
        user_id: req.session.userLogged.id,
        message: req.body.mensaje,
        response: null,
        is_answered: false,
      });
      const mensajeCreado =
        "Request created correctly, soon we will be answering you via email";
      return res.render("index", { creado: mensajeCreado });
    } catch (error) {
      console.log(error);
    }
  },
};
