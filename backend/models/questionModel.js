const mongoose = require('mongoose');
const Schema = mongoose.Schema;
console.log("questionmodel")
var questionSchema = new Schema({
   title:{type: String, required: true},
   tags:{type: String, required: true},
   questionbody:{type: String, required: true},
   userToken:{type: String, required: true}



},
{
    versionKey: false
});

const QuestionModel = mongoose.model('question',questionSchema);
module.exports = QuestionModel;
