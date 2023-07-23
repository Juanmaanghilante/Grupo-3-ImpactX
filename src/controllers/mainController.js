const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

const { validationResult } = require("express-validator");
const rutaBase = path.resolve("./src/database/requests.json");
const requests = JSON.parse(fs.readFileSync(rutaBase));

const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "richard.mazo.15.11@gmail.com",
    pass: "richipaisa1597*"
  }
}

// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "richard.mazo.97@hotmail.com",
    pass: "richipaisa1597*",
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
    // Detalles del correo electrónico
    const mailOptions = {
      from: "richard.mazo.15.11@gmail.com",
      to: "impactxgrupo3@gmail.com", 
      subject: "Resolución dudas - Impact X",
      text: req.body.mensaje,
    };

    const data = {
      "from": "richard.mazo.15.11@gmail.com",
      "to": "impactxgrupo3@gmail.com",
      "subject": "Thank you, recipient, for subscribing!",
      "text": "Dear Recipient, thank you for subcribing. Sincerely, Sender"
    }

    transporter.verify(function(error, success) {
      if (error) {
            console.log(error);
      } else {
            console.log('Server is ready to take our messages');
      }
    });

    const transporter = nodemailer.createTransport(config);
    transporter.sendMail(data, (err, info) => {
      if(err){
        console.log("hola");
        console.log(err);
      }else{
        console.log("hola");
        console.log(info.response);
      }
    })

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
