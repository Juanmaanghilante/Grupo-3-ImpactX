module.exports = (req, res, next) => {
    res.status(404).render('error404')
    next();
}