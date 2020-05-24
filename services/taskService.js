var express = require('express');
var Boom = require('boom');
var _ = require('lodash');
var taskModel = require('../models/taskModel');

exports.validateRequest = (req,res,next) => {
    var params =  _.merge(req.body, req.query)
    var taskName = params.name;
    var err;
         
    if(taskName === '' || taskName === undefined){
        return res.send(Boom.notFound('Task Name Required').output.payload);
    }
    return next();
};

exports.create = (req, res,next) => {
    // Validate request
    var taskName = req.body.name;
                
    // Create a Task
    const task = new taskModel({
        name: taskName  
    });
                
    // Save Task in the database
    task.save()
        .then(data => {
            console.log('data',data);
            res.send(data);
        }).catch(err => {
            return res.send(Boom.notImplemented('Create Task Failed').output.payload);
        });
};

exports.findAll = (req, res,next) => {
    taskModel.find({})
        .then(tasks => {
            return res.json(tasks);
        }).catch(err => {
            console.log('error',err);
            return res.send(Boom.notImplemented('Get Task Failed').output.payload);
    });
};

exports.findTaskByName = (req, res,next) => {
    var taskName = req.query.name;
    taskModel.find({name:{$regex: ".*" + taskName + ".*"}})
        .then(tasks => {
            return res.json(tasks);
        }).catch(err => {
            return res.send(Boom.notFound('Task Not Exists with this Name').output.payload);
    });
};

exports.validateTaskId = (req,res,next) => {
    var params =  _.merge(req.body, req.query)
    var taskId = params.id;
                
    if(taskId === '' || taskId === undefined){
        return res.send(Boom.notFound('Task Id Required').output.payload);
    }
    
    return next();
};

//Find task by id
exports.findTaskById = (req, res,next) => {
    var params =  _.merge(req.body, req.query)
    var taskId = params.id;
    // var taskId = req.query.id;
    taskModel.find({_id:taskId})
        .then(tasks => {
            req.taskData = tasks;
            return next();
        }).catch(err => {
            return res.send(Boom.notFound('Task Not Exists with this id').output.payload);
    });
};

exports.deleteTask = (req, res,next) => {
    var taskId = req.query.id;
                
    if(_.isEmpty(req.taskData)){
        return res.send(Boom.conflict('Task Not Exists').output.payload);
    }
                
    // Delete Task from the database
    taskModel.deleteOne({_id : taskId})
        .then(data => {
            res.json({OK : 'Task Deleted Successfully'});
        }).catch(err => {
            return res.send(Boom.notImplemented('Delete Task Failed').output.payload);
    });
};

exports.updateTask = (req, res,next) => {
    var params = _.merge(req.body, req.query);
    var taskId = params.id;
    var taskName = params.name;
                
    if(_.isEmpty(req.taskData)){
        return res.send(Boom.conflict('Task Not Exists').output.payload);
    }
                
    // Update Task name in the database
    taskModel.updateOne({_id : taskId}, {name : taskName})
        .then(data => {
            res.json({OK : 'Task Updated Successfully'});
        }).catch(err => {
            return res.send(Boom.notImplemented('Update Task Failed').output.payload);
    });
};