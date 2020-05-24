var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    name: String
}, {
    timestamps: true,
});
//mongoose.model(modelName, Schema, tableNameinDatabase)                
module.exports = mongoose.model('Task', taskSchema, 'Task');