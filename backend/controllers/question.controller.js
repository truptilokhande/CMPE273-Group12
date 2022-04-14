const Question = require("../models/question.model");

const addquestion = async (req, res) => {
  userToken = req.body.userToken;
  title = req.body.title;
  tags = req.body.tags;
  questionbody = req.body.questionbody;
  
  console.log(userToken, title, tags, questionbody);
  const new_question = {userId:userToken,title: title, tags: tags, questionbody: questionbody, views:0,waitingForApproval:false,answers:[],comments:[],votes:0 }
  console.log(new_question)
  new Question(new_question).save()
  .then((result) => {
    res.send({
      "response_code": 200,
      "response_message": "Success",
      "data":result
    })
  }).catch((err) => {
    res.send({
      "response_code": 500,
      "response_message": "Backend error",
      "data":err
    })
    
  });

}

const editquestion = async (req, res) => {
  questionId =req.body.questionId
  title = req.body.title;
  tags = req.body.tags;
  questionbody = req.body.questionbody;
  Question.updateOne({_id:questionId},{ $set:{title: title, tags: tags, questionbody: questionbody}}, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });

}

const getquestion = async (req, res) => {
  questionId =req.params.questionId
  const currtimestamp = new Date()
  const todaysdate = currtimestamp.toLocaleString("en-US", {timeZone:
    "America/Los_Angeles"}).slice(0,9);
  const datenow_arr = todaysdate.split("/")
  console.log(datenow_arr)
  Question.updateOne({_id:questionId},{ $inc: { views:1 } }, function(err, result) {
    if (err) throw err;
    console.log("1 document updated");
    Question.findOne({_id:questionId}, function(err, resultafterviews) {
      if (err) throw err;
      const answerscount = resultafterviews.answers.length
      const createdAt = resultafterviews.createdAt.toLocaleString("en-US", {timeZone:
        "America/Los_Angeles"}).slice(0,9);
      const creationdate_arr = createdAt.split("/")
      console.log(creationdate_arr)
      console.log(todaysdate,createdAt)
      
      
      const monthdiff = parseInt(datenow_arr[0]) - parseInt(creationdate_arr[0])
      const daysdiff = parseInt(datenow_arr[1]) - parseInt(creationdate_arr[1])
      const yeardiff = parseInt(datenow_arr[2]) - parseInt(creationdate_arr[2])
      console.log(monthdiff,daysdiff,yeardiff)
      res.send({resultafterviews:resultafterviews,answerscount:answerscount,monthdiff:monthdiff,daysdiff:daysdiff,yeardiff:yeardiff})
    })
  });
  

}

module.exports = {
  addquestion,
  editquestion,
  getquestion,
  
};
