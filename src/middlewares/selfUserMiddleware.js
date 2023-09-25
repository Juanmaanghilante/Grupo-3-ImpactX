module.exports = (req, res, next) => {
    console.log(req.params.id);
    if (!(req.session.userLogged.profile_id == 1) && (req.session.userLogged.id != req.params.id )) {
        
      return res.redirect("/user/profile");
    }
    next();
  };
  