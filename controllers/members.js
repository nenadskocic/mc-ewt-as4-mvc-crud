const express = require('express');
var router = express.Router();
const ArticlesModel = require('../models/articles.js');

// Display the members page
router.get("/", function(req, res)
{
  res.render("members", req.TPL);
});

// Create an article if the form has been submitted
router.post("/create", async function(req, res)
{

  // Create the article using the model method, pass req.body as a parameter
  // since it contains the title and content data... the author is hardcoded
  // to "bob" for now, this should be whichever user is logged-in
  await ArticlesModel.createArticle(req.body,"bob");

  req.TPL.message = "Article successfully created!";
  res.render("members", req.TPL);

});

module.exports = router;
