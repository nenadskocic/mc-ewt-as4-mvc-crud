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

// Return all of the users.
async function getAllUsers()
{
  const results = await db.all("SELECT rowid, * FROM Users");
  return results;
}

async function deleteUsers(id) {
    try {
        const stmtU = "SELECT username FROM Users WHERE rowid=?";
        const userData = await db.all(stmtU, id);
        const delUser = userData[0].username;
        await db.run("DELETE FROM Users WHERE rowid=?", id);
    
        const articleData = await db.all("SELECT rowid, * FROM Articles");
    
        if(articleData.length > 0) {
            for(i = 0; i < articleData.length; i++) {
                if(articleData[i].username == delUser) {
                    await db.run("DELETE FROM Articles WHERE username = '" + delUser + "'");
                }
            } 
        }
    } catch(error) {
        console.log(error);
    }

}

module.exports = { getAllUsers, deleteUsers };