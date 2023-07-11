module.exports = (req, res, next) => {
  // usando locals y este middleware como md de aplicación podemos usar la variable isLogged en todas nuestras vistas
  res.locals.isLogged = false;
  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }
  next();
};
