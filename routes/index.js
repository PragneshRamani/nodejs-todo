var express = require('express');
var router = express.Router();
                
var taskRoute = require('./taskRoute');
                
router.use('/task',taskRoute);
                
module.exports = router;