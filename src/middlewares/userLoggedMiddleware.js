const db = require("../database/models");
const User = db.User;

module.exports = async (req, res, next) => {
  try {
    res.locals.isLogged = false;
    console.log("hola");
    console.log(req.session.userLogged);
    //const userFromCookie = datos.find(row => row.user == req.cookies.userEmail);
    const userFromCookie = await User.findOne({
      where: {
        user_name: req.cookies.userEmail ? req.cookies.userEmail : req.session.userLogged.user_name,
      },
      include: [{ association: "perfiles" }],
    });
    if (userFromCookie) {
      req.session.userLogged = userFromCookie;
    }

    if (req.session.userLogged) {
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged;
    }
    next();
  } catch (error) {
    next();
  }
};
