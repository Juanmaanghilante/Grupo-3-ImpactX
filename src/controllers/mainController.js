const path = require("path");
const fs = require("fs");

const { validationResult } = require("express-validator");
const rutaBase = path.resolve("./src/database/requests.json");
const requests = JSON.parse(fs.readFileSync(rutaBase));

module.exports = {
  index: (req, res) => {
    return res.render('index')
  },
  createContactenos: (req, res) => {
    const resultValidation = validationResult(req);
    
    if(resultValidation.errors.length>0){
      console.log(resultValidation);
      return res.render("index", {
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    }
    const nuevaSolicitud = {
      "id": requests.length + 1,
      "nombre": req.body.nombre,
      "apellido": req.body.apellido,
      "email": req.body.correo,
      "mensaje": req.body.mensaje,
      "respuesta": "",
      "gestionado": false
    };

    requests.push(nuevaSolicitud)

    fs.writeFileSync(path.resolve(rutaBase), JSON.stringify(requests, null, 2), 'utf-8');
    return res.send("Solicitud procesada, te estaremos dando respuesta en breve..."); 
  },
  request: (req, res) => {
    const requesthabilitados = requests.filter(row => row.gestionado == false)
    return res.render('main/requests', { requesthabilitados: requesthabilitados});  
  }
}