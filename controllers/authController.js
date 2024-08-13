const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');

module.exports.registerUser = async function(req, res) {
    try {
        const { fullname, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            req.flash("error", "You already have an account, please login.");
            return res.redirect("/");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({ fullname, email, password: hashedPassword });
        const token = generateToken(user);
        res.cookie("token", token);
        res.send("User created successfully");
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
};

module.exports.loginUser = async function(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            req.flash("error", "Email or password is incorrect.");
            return res.redirect("/");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash("error", "Email or password is incorrect.");
            return res.redirect("/");
        }

        const token = generateToken(user);
        res.cookie("token", token);
        res.send("You can now login");
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
};

module.exports.logoutUser = function(req, res) {
    res.cookie("token", "");
    res.redirect("/");
};
