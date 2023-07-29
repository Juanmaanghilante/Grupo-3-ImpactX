const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

const { validationResult } = require("express-validator");
const rutaBase = path.resolve("./src/database/requests.json");
const requests = JSON.parse(fs.readFileSync(rutaBase));

module.exports = {
  index: (req, res) => {
    return res.render("index");
  },
  createContactenos: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      console.log(resultValidation);
      return res.render("index", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    const nuevaSolicitud = {
      id: requests.length + 1,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.correo,
      mensaje: req.body.mensaje,
      respuesta: "",
      gestionado: false,
    };

    requests.push(nuevaSolicitud);

    fs.writeFileSync(
      path.resolve(rutaBase),
      JSON.stringify(requests, null, 2),
      "utf-8"
    );
    return res.send(
      "Solicitud procesada, te estaremos dando respuesta en breve..."
    );
  },
  request: (req, res) => {
    const requesthabilitados = requests.filter(
      (row) => row.gestionado == false
    );
    return res.render("main/requests", {
      requesthabilitados: requesthabilitados,
    });
  },
  sendAnswer: async (req, res) => {
    try {
      //correo  = "richard.mazo.97@hotmail.com";
      //console.log(typeof correo)
      console.log(typeof req.body.mensaje);
      const correo = "" + req.body.email;
      const respuesta = "" + req.body.answer;
      const config = {
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
          user: "impactxgrupo3@hotmail.com",
          pass: "Grupo3XImpact",
        },
      };

      const data = {
        from: "impactxgrupo3@hotmail.com",
        to: correo,
        subject: "Respuesta a inquietud realizada a Impact X",
        text: respuesta,
      };

      const transporter = nodemailer.createTransport(config);

      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          console.log("hola malo");
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
        const request = requests.find(
          (request) =>
            request.id == req.params.id && request.gestionado == false
        );

        request.gestionado = true;
        request.respuesta = req.body.mensaje;

        fs.writeFileSync(
          path.resolve(__dirname, "../database/requests.json"),
          JSON.stringify(requests, null, 2)
        );
        return res.redirect("edit");
      });
    } catch (error) {
      console.log(error);
    }
  },
};
