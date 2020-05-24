var express = require('express');
var router = express.Router();
var taskService = require('../services/taskService');

router.post('/',[
    taskService.validateRequest,
    taskService.create
]);

router.get('/',[
    taskService.findAll
]);

router.get('/search/name',[
    taskService.validateRequest,
    taskService.findTaskByName
]);

router.delete('/',[
    taskService.validateTaskId,
    taskService.findTaskById,
    taskService.deleteTask
]);

router.put('/',[
    taskService.validateTaskId,
    taskService.validateRequest,
    taskService.findTaskById,
    taskService.updateTask
]);
                
module.exports = router;