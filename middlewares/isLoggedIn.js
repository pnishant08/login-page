const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        req.flash("error", "Please log in to access this page.");
        return res.redirect("/");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        req.flash("error", "Please log in to access this page.");
        res.redirect("/");
    }
};
