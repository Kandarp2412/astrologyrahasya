const mongoose = require('mongoose');

const date = new Date()
const local_date = date.toLocaleString()

const notesSchema = mongoose.Schema({
    id    : {type:mongoose.Schema.Types.ObjectId,ref:"users"},
    notes : {type:String},
    createdAt : {type:String}
})


module.exports = mongoose.model('notes',notesSchema);