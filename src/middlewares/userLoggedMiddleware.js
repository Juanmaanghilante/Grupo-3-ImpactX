const path = require("path");
const fs = require("fs");

const datos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/user.json')));

module.exports = (req, res, next) => {
  // usando locals y este middleware como md de aplicación podemos usar la variable isLogged en todas nuestras vistas
  res.locals.isLogged = false;

  const userFromCookie = datos.find(row => row.user == req.cookies.userEmail);

  if(userFromCookie){
    req.session.userLogged = userFromCookie;
  }

  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }
  next();
};
