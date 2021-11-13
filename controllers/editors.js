/*
    "StAuth10222: I Nenad Skocic, 000107650 certify that this material is my original work. No other person's work has been used 
    without due acknowledgement. I have not made my work available to anyone else."
*/
const express = require('express');
var router = express.Router()
const UsersModel = require('../models/usersModel.js');
const ArticlesModel = require('../models/articlesModel.js');

// Display the editors page
router.get("/", async function(req, res) {
     // Retrieve all of the users & articles using the model method, display the page
    const usersData = await UsersModel.getAllUsers();
    const articlesData = await ArticlesModel.getAllArticles();
    req.TPL.users = usersData;
    req.TPL.articles = articlesData;
    res.render("editors", req.TPL);
});

// Action for the deletion of user from the Users table AND the respective article created by the user.
router.get("/delete/users/:id", async function(req, res, next) {
    try {
        // Calls both the user and article deletion from the models.
        await ArticlesModel.deleteArticle(req.params.id);
        await UsersModel.deleteUsers(req.params.id);

        // Gets both the user and article data.
        const usersData = await UsersModel.getAllUsers();
        const articlesData = await ArticlesModel.getAllArticles();

        // Set both data sets in template, refreshes after form action.
        req.TPL.users = usersData;
        req.TPL.articles = articlesData;
        res.render("editors", req.TPL);

    } catch(error) {}
});

/**
 *  Action for the deletion of user from the Articles table.
 *  Deletes only the articles, not users and gets both the user and article data and re-renders it.
 */
router.get("/delete/articles/:id", async function(req, res, next) {
    try {
        await ArticlesModel.deleteArticle(req.params.id);
        const articlesData = await ArticlesModel.getAllArticles();
        req.TPL.articles = articlesData;
        const usersData = await UsersModel.getAllUsers();
        req.TPL.users = usersData;
        res.render("editors", req.TPL);

    } catch(error) {}
});

module.exports = router;
