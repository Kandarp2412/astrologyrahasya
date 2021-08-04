const mongoose = require('mongoose');


const notesSchema = mongoose.Schema({
    id    : {type:mongoose.Schema.Types.ObjectId,ref:"users"},
    notes : {type:String},
})


module.exports = mongoose.model('notes',notesSchema);