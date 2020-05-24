var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
                
// Connect to the db
var database = mongoose.connect("mongodb://localhost:27017/nodeJSDemo",{
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to the database");    
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
                
module.exports = database;