'use strict'; // Enforce use of strict verion of JavaScript

/*  @Doc
    Module that exposes interfaces to other modules for interacting with JSON Document-based Databases
    for handling persistent storage and more.

    @Todo
    - Test out the new Promise based fs API
*/

const fs = require('fs');
const fsp = require('fs').promises;
const { print } = require('./utils');
// Constant relative path to the database directory
const database_directory = '../Database';

// Global in memory reference of the user DB. Users are basically kv pairs of userID and highscore
var settings;

// Read DB file "db" and return it to function caller
const read_db = (db) =>
    new Promise((resolve, reject) => {
        // Read the "DB" json file asynchronously
        fsp.readFile(`${database_directory}/${db}.json`)
            .then(JSON.parse)
            .then(resolve)
            .catch(reject);

        // Below is a simpler method without having an additional Promise wrapped over the readfile function
        // return await fsp.readFile(`${database_directory}/${db}.json`, 'utf8')
        //     .then(JSON.parse)

        // fs.readFile(`${database_directory}/${db}.json`, 'utf8', function (err, data) {
        //     // Let any errors bubble up
        //     if (err) throw err;
        //     // Resolve with the parsed JSON file
        //     try { resolve(JSON.parse(data)); }
        //     catch (err) { return reject(err); }
        // });
    });


// Write the DB data held in memory into the "db" DB file
const update_db = (db, data) => {
    // Write to the "DB" json file asynchronously
    // fs.writeFile(`./Databases/${db}.json`, JSON.stringify(data), (err) => {
    //     // Let any errors bubble up
    //     if (err) throw err;
    // });
    fsp.writeFile(`./Databases/${db}.json`, JSON.stringify(data))
        .catch(console.error);
}

// Self-invoking setup function that runs when this module is "required"
(function setup() {
    // Read all the data from the "DB" files into memory at setup
    read_db('settings')
        .then((data) => userDB = data);
})();


/*	Exported items:
	- Methods to read, update and reset user's highscore.
	- Method to read a copy of the in memory leaderboard

	Notes:
	- External modules have no direct access to the userDB or their scores, only those
	  produced by the methods, which prevent them from modifying the values stored in
	  the DB randomly.
	- The leaderboard is ony available as a copy of the leaderboard held in memory that
	  is true at time of request only, if leaderboard in memory is updated, the value
	  that external modules hold through the get_leaderboard method is not updated, thus
	  the requested value should only be used once, and should be requested and generated
	  over again everytime.
	- External modules have no direct access to the userDB memory structure to prevent
	  accidental access and modifications
*/
module.exports = {

};