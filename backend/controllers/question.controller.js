const Question = require("../models/questionModel");

const addquestion = async (req, res) => {
  userToken = req.body.userToken;
  title = req.body.title;
  tags = req.body.tags;
  questionbody = req.body.questionbody;
  console.log(userToken, title, tags, questionbody);
  Question.updateOne(
    { userToken: "2" },
    { $set: { title: title, tags: tags, questionbody: questionbody, isBookmarked: "false"} },
    function (err, result) {
      if (err){
        res.send({
          "response_code": 500,
          "response_message": "Backend error",
    
        })
      }
      else {
        res.send({
          "response_code": 200,
          "response_message": "Success",
          "data":result
        })
      }
    }
  );
};
const bookmarkquestion = async (req, res) => {
  isBookmarked = req.body.isBookmarked;
  title = req.body.title;
 
  Question.updateOne({title:title},{ $set:{isBookmarked:isBookmarked}}, function(err, result) {
    if (err) throw err;
    console.log("updated bookmark");
    res.send(
      {
        "response_code": 200,
        "response_message": "Success",
        "data":result
      });
   
  });
};

module.exports = {
  addquestion,
  bookmarkquestion,
};
