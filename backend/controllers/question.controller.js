const Question = require("../models/question.model");

const addquestion = async (req, res) => {
  const userToken = req.body.userToken;
  const title = req.body.title;
  const tags = req.body.tags;
  const questionbody = req.body.questionbody;
  
  const new_question = {userId:userToken,title: title, tags: tags, questionbody: questionbody, views:0,waitingForApproval:false,answers:[],comments:[],votes:0 }
  new Question(new_question).save()
  .then((result) => {
    res.status(200).send({ success: true, result: data});
   
  }).catch((err) => {
    res.status(500).send({message: "Backend error" });
  });

}

const editquestion = async (req, res) => {
  const questionId =req.body.questionId
  const title = req.body.title;
  const tags = req.body.tags;
  const questionbody = req.body.questionbody;
  Question.updateOne({_id:questionId},{ $set:{title: title, tags: tags, questionbody: questionbody}}, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });

}

const getquestion = async (req, res) => {
  const questionId =req.params.questionId
  const currtimestamp = new Date()
  const todaysdate = currtimestamp.toLocaleString("en-US", {timeZone:
    "America/Los_Angeles"}).slice(0,9);
  const datenow_arr = todaysdate.split("/")
  Question.updateOne({_id:questionId},{ $inc: { views:1 } }, function(err, result) {
    if (err) throw err;
    Question.findOne({_id:questionId}, function(err, resultafterviews) {
      if (err) throw err;
      const answerscount = resultafterviews.answers.length
      const createdAt = resultafterviews.createdAt.toLocaleString("en-US", {timeZone:
        "America/Los_Angeles"}).slice(0,9);
      const creationdate_arr = createdAt.split("/")
      const monthdiff = parseInt(datenow_arr[0]) - parseInt(creationdate_arr[0])
      const daysdiff = parseInt(datenow_arr[1]) - parseInt(creationdate_arr[1])
      const yeardiff = parseInt(datenow_arr[2]) - parseInt(creationdate_arr[2])
      data = {resultafterviews:resultafterviews,answerscount:answerscount,monthdiff:monthdiff,daysdiff:daysdiff,yeardiff:yeardiff}
      res.send({ success: true, result: data })
    })
  });
  

}

module.exports = {
  addquestion,
  editquestion,
  getquestion,
  
};
