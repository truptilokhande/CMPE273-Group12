const QuestionModel = require("../models/question.model");

const addquestion = async (req, res) => {
  userToken = req.body.userToken;
  title = req.body.title;
  tags = req.body.tags;
  questionbody = req.body.questionbody;
  console.log(userToken, title, tags, questionbody);
  //item = {userTok:"2",title:title,tags:tags,questionbody:questionbody}
  QuestionModel.updateOne(
    { userToken: "2" },
    { $set: { title: title, tags: tags, questionbody: questionbody } },
    function (err, res) {
      if (err) throw err;
      else {
        console.log("1 document updated", res);
      }

      //   db.close();
    }
  );
};

module.exports = {
  addquestion,
};
