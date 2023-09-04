const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
require("dotenv").config();
const ContactMessage = db.ContactMessage;

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
  request: async (req, res) => {
    if (req.session.userLogged.perfiles.name == "Admin") {
      try {
        const requesthabilitados = await ContactMessage.findAll({
          where: {
            is_answered: false,
          },
          include: [{ association: "contactmessage" }],
        });
        return res.render("main/requests", {
          requesthabilitados: requesthabilitados,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const requesthabilitados = await ContactMessage.findAll({
          where: {
            [Op.and]: [
              { is_answered: true },
              { user_id: req.session.userLogged.id },
            ],
          },
          include: [{ association: "contactmessage" }],
        });
        return res.render("main/requests", {
          requesthabilitados: requesthabilitados,
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  sendAnswer: async (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      try {
        const requesthabilitados = await ContactMessage.findAll({
          where: {
            is_answered: false,
          },
          include: [{ association: "contactmessage" }],
        });
        return res.render("main/requests", {
          requesthabilitados: requesthabilitados,
          errors: resultValidation.mapped(),
          idError: req.params.id,
        });
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const correo = "" + req.body.email;
      const respuesta = "" + req.body.answer;
      const config = {
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      };

      const data = {
        from: process.env.EMAIL_USER,
        to: correo,
        subject: "Response to request made to Impact X",
        text: respuesta,
      };

      const transporter = nodemailer.createTransport(config);

      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

      await transporter.sendMail(data, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info.response);
        }

        const requestActualizados = ContactMessage.update(
          {
            response: req.body.answer,
            is_answered: true,
          },
          { where: { id: req.params.id } }
        );
        return res.redirect("edit");
      });
    } catch (error) {
      console.log(error);
    }
  },
};
