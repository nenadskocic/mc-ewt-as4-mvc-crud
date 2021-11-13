/*
    "StAuth10222: I Nenad Skocic, 000107650 certify that this material is my original work. No other person's work has been used 
    without due acknowledgement. I have not made my work available to anyone else."
*/
var sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function startup()
{
  db = await sqlite.open({
    filename: 'database.db',
    driver: sqlite3.Database
  });
}

startup();

// Return all of the articles
async function getAllArticles()
{
  const results = db.all("SELECT rowid, * FROM Articles");
  return results;
}

// Create a new article given a title, content and username
async function createArticle(article, username)
{ 
  await db.run("INSERT INTO Articles VALUES (?,?,?)",
               [article.title, username, article.content]);
}

async function deleteArticle(id) {
    await db.run("DELETE FROM Articles WHERE rowid=?", id);
}

module.exports = { getAllArticles, createArticle, deleteArticle};
