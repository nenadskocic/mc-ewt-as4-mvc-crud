/*
    "StAuth10222: I Nenad Skocic, 000107650 certify that this material is my original work. No other person's work has been used 
    without due acknowledgement. I have not made my work available to anyone else."
*/
const express = require('express');
var router = express.Router()

// Display the sign up page
router.get("/", async function(req, res)
{
    // Display messages, clear from session.
    req.TPL.signup_message = req.session.signup_message;
    req.session.signup_message = "";

    res.render("signup", req.TPL);
});

/**
 * Creates user acccount and sets it to "member" level. Does not check for similar usernames in the DB.
 */
router.post("/createaccount", async (req, res) => {
    try {
        // Sets the fields from user input.
        const username = req.body.username;
        const password = req.body.password;

        // Minimum of 1 character for password and username, inserts user's input, validation included.
        if((username.length >= 1) && (password.length >= 1)) {
            await db.run("INSERT INTO Users VALUES (?,?,?)", [username, password, 'member']);
            req.session.signup_message = "<p>User account created! <a href='/login'>Login</a> to access your new account.</p>"
            res.redirect("/signup");
        } else {
            req.session.signup_message = "Username/password cannot be blank!";
            res.redirect("/signup");       
        }
    } catch(error) {
        console.log(error);
    }
});

module.exports = router;
