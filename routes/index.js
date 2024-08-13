const express = require('express');
const router = express.Router();

router.get("/", function(req, res) {
    let error = req.flash("error");
    res.render("index", { error });
});

router.get("/shop", require('../middlewares/isLoggedIn'), function(req, res) {
    res.render("shop");
});

module.exports = router;
