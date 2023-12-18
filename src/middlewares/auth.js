export const requireAuth = (req, res, next) => {
    console.log(req.session)
    if (req.session.user && req.session.user.loggedIn) {
        res.locals.user = req.session.user;
        next()
    }
    else {
        res.status(401).json({ msg: "No estas autorizado" });
    }
}