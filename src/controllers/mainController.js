const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

const { validationResult } = require("express-validator");
const rutaBase = path.resolve("./src/database/requests.json");
const requests = JSON.parse(fs.readFileSync(rutaBase));


    // Configuración del transportador de correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "impactxgrupo3@gmail.com",
        pass: "ImpactXGrupo3",
      },
    });

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
  sendAnswer: (req, res) => {
    console.log(req.body);
    // Detalles del correo electrónico
    const mailOptions = {
      from: "impactxgrupo3@gmail.com",
      to: "richard.mazo.15.11@gmail.com",//req.body.email,
      subject: "Resolución dudas - Impact X",
      text: req.body.mensaje,
    };

    console.log(mailOptions);

    // Envío del correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      console.log("Holaa");
      if (error) {
        console.log(error);
        res.send("Error al enviar el correo electrónico");
      } else {
        console.log("Correo electrónico enviado: " + info.response);
        res.send("Correo electrónico enviado correctamente");
      }
    });

    const request = requests.find(
      (request) => request.id == req.params.id && request.gestionado == false
    );

    request.gestionado = true;
    request.respuesta = req.body.mensaje;

    fs.writeFileSync(
      path.resolve(__dirname, "../database/requests.json"),
      JSON.stringify(requests, null, 2)
    );
    return res.redirect("edit");
  },
};
