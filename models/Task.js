const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true, 'Title is required'],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamp:true

});
module.exports = mongoose.model('Task', taskSchema);