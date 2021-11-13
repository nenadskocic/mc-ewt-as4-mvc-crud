/*
    "StAuth10222: I Nenad Skocic, 000107650 certify that this material is my original work. No other person's work has been used 
    without due acknowledgement. I have not made my work available to anyone else."
*/
const express = require('express');
var router = express.Router();

// Displays the login page
router.get("/", async function(req, res)
{
    // if we had an error during form submit, display it, clear it from session
    req.TPL.login_error = req.session.login_error;
    req.session.login_error = "";

    // render the login page
    res.render("login", req.TPL);
});

/**
 *  Attempts to login a user.
 *  - The action for the form submit on the login page.
 */
router.post("/attemptlogin", async (req, res) =>
{
    // Error handling in async/await.
    try {
        // Sets username and password to the input provided on the login page.
        const username = req.body.username;
        const password = req.body.password;

        // Finds the exact username in the database if the input on the login form matches an existing username;
        const user = await db.all("SELECT * FROM Users WHERE username = '" + username + "'");
        
        let pass = "";
        let level = "";
    
        // Loop through the user array and pull the password and level values.
        for(i in user) {
            pass = user[i].password;
            level = user[i].level;
        }

        // Checks if password inputted from user matches in database for specific username and checks the level of access provided to that username.
        if(password == pass && level == "member") {
            // Set a session key username to login the user
            req.session.username = username;
            req.session.level = level;
            // Re-direct the logged-in user to the members page
            res.redirect("/members");
        } else if (password == pass && level == "editor") {
            req.session.username = username;   
            req.session.level = level;
            res.redirect("/editors");          
        } else {
            // If we have an error, reload the login page with an error
            req.session.login_error = "Invalid username and/or password!";
            res.redirect("/login");
        }
    } catch(error) {
        console.log(error);
    }
});

// Logout a user
// - Destroys the session key username that is used to determine if a user
// is logged in, re-directs them to the home page.
router.get("/logout", async function(req, res)
{
    // Destroy the session key level.
    delete(req.session.level);
    delete(req.session.username);
    res.redirect("/home");
});

module.exports = router;
