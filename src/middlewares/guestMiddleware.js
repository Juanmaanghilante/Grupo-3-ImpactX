module.exports = (req,res,next) => {
  if(req.session.userLogged) {
    // redirigirlo a profile en un futuro cuando esté hecha la vista
    return res.redirect('/user/profile')
  }


  next()
}