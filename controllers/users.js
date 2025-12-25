const User = require("../models/user");

module.exports.signupGet = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signupPost = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", `welcome ${username}`);
            res.redirect("/listings");
        });
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.loginGet = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.loginPost = async (req, res) => {
    let { username } = req.body;
    req.flash("success", `welcome back ${username}, You are logged in!`);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are loged out now!");
        res.redirect("/listings");
    })
}