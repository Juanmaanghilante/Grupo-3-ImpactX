module.exports = (req, res, next) => {
    
    if (!(req.session.userLogged.profile_id == 1)) {
        
      return res.redirect("/user/profile");
    }
    next();
  };
  