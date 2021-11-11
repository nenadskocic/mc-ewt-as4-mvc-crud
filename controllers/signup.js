const express = require('express');
var router = express.Router()

// Display the sign up page
router.get("/", async function(req, res)
{
    req.TPL.signup_message = req.session.signup_message;
    req.session.signup_message = "";
    res.render("signup", req.TPL);
});

module.exports = router;
