/*
    "StAuth10222: I Nenad Skocic, 000107650 certify that this material is my original work. No other person's work has been used 
    without due acknowledgement. I have not made my work available to anyone else."
*/
const express = require('express');
var router = express.Router()
const ArticlesModel = require('../models/articlesModel.js')

// Display the articles page
router.get("/", async function(req, res)
{
    // Retrieve all of the articles using the model method, display the page
    const results = await ArticlesModel.getAllArticles();
    req.TPL.articles = results;
    res.render("articles", req.TPL);
});

module.exports = router;