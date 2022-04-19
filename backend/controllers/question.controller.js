const Question = require("../models/question.model");

const getQuestions = async (req, res) => {
  try {
    // fetching the questions
    const result = await Question.find({});
    // if no results fetched
    if (!result) {
      res.status(400).send({
        data: {},
        message: "error fetching the questions",
      });
    }
    // send questions when results are fetched
    res.status(200).send({
      data: result,
      message: "fetched questions",
    });
  } catch (err) {
    console.log(err);
    // any errors in fetching the questions
    res.status(400).send({
      data: {},
      message: "error fetching the questions",
    });
  }
};

const addquestion = async (req, res) => {
  const { userId, title, tags, questionbody } = req.body;

  try {
    const newQuestion = new Question({
      userId,
      title,
      tags,
      questionbody,
    });
    // check if it has image
    const result = await newQuestion.save();
    if (!result) {
      res.status(400).send({
        message: "error posting question",
      });
    }
    res.status(200).send({
      data: result,
      message: "posted question successfully",
    });
  } catch (err) {
    res.status(400).send({
      message: "error posting question",
    });
  }
};

const editquestion = async (req, res) => {
  questionId = req.body.questionId;
  title = req.body.title;
  tags = req.body.tags;
  questionbody = req.body.questionbody;
  Question.updateOne(
    { _id: questionId },
    { $set: { title: title, tags: tags, questionbody: questionbody } },
    function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
    }
  );
};

const getquestion = async (req, res) => {
  questionId = req.params.questionId;
  const currtimestamp = new Date();
  const todaysdate = currtimestamp
    .toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    .slice(0, 9);
  const datenow_arr = todaysdate.split("/");
  console.log(datenow_arr);
  Question.updateOne(
    { _id: questionId },
    { $inc: { views: 1 } },
    function (err, result) {
      if (err) throw err;
      console.log("1 document updated");
      Question.findOne({ _id: questionId }, function (err, resultafterviews) {
        if (err) throw err;
        const answerscount = resultafterviews.answers.length;
        const createdAt = resultafterviews.createdAt
          .toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
          .slice(0, 9);
        const creationdate_arr = createdAt.split("/");
        console.log(creationdate_arr);
        console.log(todaysdate, createdAt);

        const monthdiff =
          parseInt(datenow_arr[0]) - parseInt(creationdate_arr[0]);
        const daysdiff =
          parseInt(datenow_arr[1]) - parseInt(creationdate_arr[1]);
        const yeardiff =
          parseInt(datenow_arr[2]) - parseInt(creationdate_arr[2]);
        console.log(monthdiff, daysdiff, yeardiff);
        res.send({
          resultafterviews: resultafterviews,
          answerscount: answerscount,
          monthdiff: monthdiff,
          daysdiff: daysdiff,
          yeardiff: yeardiff,
        });
      });
    }
  );
};

module.exports = {
  addquestion,
  editquestion,
  getquestion,
  getQuestions,
};

/*
1. Tag badges
whenever user asks the question, we nedd to check if user has that tag already present 
if present we need to increment the count for that tag
if not we need to add as new tag for the user

2. user upvotes the answer/question, upvotes count should be increased
3. downvotes the answer/question, downvote count should be increased

4. when user signs in increase count

1. number of questions asked
2. number of answers answered
3. reputation score
4. upVoteCount
5. downVoteCount
6. notableQuestion
7. famousQuestion
8. commentBadge
*/
