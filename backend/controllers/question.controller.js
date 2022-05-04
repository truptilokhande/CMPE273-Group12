const Question = require("../models/question.model");
const Answers = require("../models/answer.model");
const Users = require("../models/user.model");
const mongoose = require("mongoose");
const mysqlConf = require("../database/sqlconnection").mysqlpool;
const redisClient = require("../database/redisconnection");

const getQuestions = async (req, res) => {
  try {
    // fetching the questions
    // calculate answers count and send questions when results are fetched
    const valueFromRedis = await redisClient.get("questions");
    if (valueFromRedis) {
      console.log("getting values from cache");
      res.status(200).send({
        data: JSON.parse(valueFromRedis),
        message: "fetched questions",
      });
      return;
    }
    const answerAgg = [
      {
        $lookup: {
          from: "answers",
          localField: "_id",
          foreignField: "questionId",
          as: "qId",
        },
      },
      {
        $group: {
          _id: "$questionId",
          answerCount: {
            $sum: 1,
          },
        },
      },
    ];
    const questionsAgg = [
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
    ];
    const result = await Question.aggregate(questionsAgg);
    const answercount = await Answers.aggregate(answerAgg);

    // if no results fetched
    if (!result || !answercount) {
      res.status(400).send({
        data: {},
        message: "error fetching the questions",
      });
    }

    redisClient.set("questions", JSON.stringify({ questions: result, answercount }), {
      EX: 10,
    });
    const value = await redisClient.get("key");

    res.status(200).send({
      data: { questions: result, answercount },
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
    // check if it has image before saving.
    const checkQuestionBodyHasImage = questionbody.match(/<img/);

    const newQuestion = new Question({
      userId,
      title,
      tags,
      questionbody,
      waitingForApproval: !!checkQuestionBodyHasImage,
    });
    const result = await newQuestion.save();

    // add tags to the user profile and update score for the tag.
    const user = await Users.findOne({ _id: userId });
    const userTags = user?.tags; // [{tagId,tagName,tagCount}]

    console.log("-------------------user tags 1------------------------");
    tags.map(async (tag) => {
      // check if tag is already present in user profile userTags.
      console.log("-------------------user tags------------------------");
      console.log(tag);
      const indexValue = userTags.find((x) => x?.tagName === tag.name);
      // i.e if tag is already present
      if (indexValue) {
        await Users.updateOne(
          {
            _id: userId,
            "tags.tagId": tag.id,
          },
          {
            $inc: {
              "tags.$.tagCount": 1,
            },
          }
        );
      }
      // if tag is not present
      else {
        const newTag = {
          tagId: tag?.id,
          tagName: tag?.name,
        };
        userTags.push(newTag);
        await Users.findByIdAndUpdate({ _id: userId }, { tags: userTags });
      }
    });

    !result && res.status(400).send({ message: "error posting question" });
    result &&
      res
        .status(200)
        .send({ data: result, message: "posted question successfully" });
  } catch (err) {
    res.status(400).send({
      message: "error posting question",
    });
  }
};

const getquestion = async (req, res) => {
  const questionId = req.params.questionId;

  // increment the count and get questiondetails
  const question = await Question.findOneAndUpdate(
    { _id: questionId },
    { $inc: { views: 1 } },
    { new: true, upsert: true, timestamps: false }
  );

  // get user details
  const userDetails = await Users.findOne({ _id: question?.userId });

  // get answers along with details of user who answered the question
  const answerAgg = [
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $match: {
        questionId: mongoose.Types.ObjectId(questionId),
      },
    },
  ];
  const answers = await Answers.aggregate(answerAgg);

  question && res.status(200).send({ question, userDetails, answers });
  !question && res.status(400).send("error getting question");
};

const editquestion = async (req, res) => {
  const questionId = req.body.questionId;
  const title = req.body.title;
  const tags = req.body.tags;
  const questionbody = req.body.questionbody;

  try {
    const result = await Question.findOneAndUpdate(
      { _id: questionId },
      { title, tags, questionbody },
      { new: true }
    );
    res.status(200).send({ success: true, data: result });
  } catch (err) {
    res.status(400).send({ success: false, message: "Can't update" });
  }
};

const voteQuestion = async (req, res) => {
  const { upvote } = req.query;
  const questionId = req.body.questionId;
  const userId = req.body.userId;
  const title = req.body.title;
  let result;
  // update user upvote count
  try {
    if (upvote === "1") {
      await Users.findOneAndUpdate(
        { _id: userId },
        { $inc: { upVoteCount: 1 } }
      );
      await Users.findOneAndUpdate(
        { _id: userId },
        { $inc: { reputation: 10 } }
      );
      result = await Question.findOneAndUpdate(
        { _id: questionId },
        { $inc: { votes: 1 } },
        { new: true }
      );
    } else if (upvote === "0") {
      await Users.findOneAndUpdate(
        { _id: userId },
        { $inc: { downVoteCount: 1 } }
      );
      await Users.findOneAndUpdate(
        { _id: userId },
        { $dec: { reputation: 10 } }
      );
      result = await Question.findOneAndUpdate(
        { _id: questionId },
        { $inc: { votes: -1 } },
        { new: true }
      );
    } else if (upvote === "2") {
      await Users.findOneAndUpdate(
        { _id: userId },
        { $inc: { downVoteCount: 1 } }
      );
      await Users.findOneAndUpdate(
        { _id: userId },
        { $inc: { reputation: -10 } }
      );
      result = await Question.findOneAndUpdate(
        { _id: questionId },
        { $inc: { votes: -2 } },
        { new: true }
      );
    } else {
      await Users.findOneAndUpdate(
        { _id: userId },
        { $inc: { upVoteCount: 1 } }
      );
      await Users.findOneAndUpdate(
        { _id: userId },
        { $inc: { reputation: 10 } }
      );
      result = await Question.findOneAndUpdate(
        { _id: questionId },
        { $inc: { votes: 2 } },
        { new: true }
      );
    }

    if (upvote === "0" || upvote === "2") {
      const query = `INSERT INTO stackoverflow_schema.logs (logId, what, bywhom, content, created) VALUES ('${userId}','downvote question','${userId}','${title}','${new Date(
        Date.now()
      ).toISOString()}')`;
      mysqlConf.getConnection(async (err, connection) => {
        try {
          await connection.query(query);
          res.status(200).send({
            success: true,
            message: "Updated successfully",
            vote: result?.votes,
          });
        } catch (err) {
          console.log(err);
        }
        connection.release();
      });
    } else {
      const query = `INSERT INTO stackoverflow_schema.logs (logId, what, bywhom, content, created) VALUES ('${userId}','upvote question','${userId}','${title}','${new Date(
        Date.now()
      ).toISOString()}')`;
      mysqlConf.getConnection(async (err, connection) => {
        try {
          await connection.query(query);
          res.status(200).send({
            success: true,
            message: "Updated successfully",
            vote: result?.votes,
          });
        } catch (err) {
          console.log(err);
        }
        connection.release();
      });
    }
  } catch (err) {
    res.status(400).send({ success: false, message: "Can't update" });
  }
};

const bookmarkQuestion = async (req, res) => {
  const questionId = req.body.questionId;
  const userId = req.body.userId;
  try {
    const user = await Users.findOne({ _id: userId });
    const bookmarks = user?.bookmarks || [];
    if (bookmarks.includes(questionId)) {
      const index = bookmarks.indexOf(questionId);
      if (index !== -1) {
        bookmarks.splice(index, 1);
      }
    } else {
      bookmarks.push(questionId);
    }

    const result = await Users.findOneAndUpdate(
      { _id: userId },
      { bookmarks },
      { new: true }
    );
    result && res.status(200).send({ success: true, result });
    !result &&
      res
        .status(400)
        .send({ success: false, message: "Error while bookmarking" });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, message: "Error while bookmarking" });
  }
};

const searchQuestionsByUserId = async (req, res) => {
  const searchkey = req.params.searchkey;
  const searchQuestionAgg = [
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $match: {
        "user.name": searchkey,
      },
    },
  ];
  const users = await Question.aggregate(searchQuestionAgg);

  users && res.status(200).send({ success: true, data: users });
  !users &&
    res.status(200).send({ success: false, message: "failed to search users" });
};

const searchQuestionsByText = async (req, res) => {
  const searchkey = req.params.searchkey;
  const searchQuestionAgg = [
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $match: {
        $or: [
          {
            title: {
              $regex: new RegExp(searchkey, "i"),
            },
          },
          {
            questionBody: {
              $regex: new RegExp(searchkey, "i"),
            },
          },
        ],
      },
    },
  ];
  const users = await Question.aggregate(searchQuestionAgg);

  users && res.status(200).send({ success: true, data: users });
  !users &&
    res.status(200).send({ success: false, message: "failed to search users" });
};

const addComment = async (req, res) => {
  try {
    const { questionId, userId, userName, commentBody } = req.body;
    const question = await Question.findOne({ _id: questionId });
    const comments = question?.comments;
    comments.push({
      userId,
      userName,
      commentBody,
    });

    const result = await Question.findOneAndUpdate(
      { _id: questionId },
      { comments },
      { new: true }
    );

    const query = `INSERT INTO stackoverflow_schema.logs (logId, what, bywhom, content, created) VALUES ('${questionId}','comment','${userId}','${commentBody}','${new Date(
      Date.now()
    ).toISOString()}')`;
    mysqlConf.getConnection(async (err, connection) => {
      try {
        await connection.query(query);
        result &&
          res.status(200).send({ success: true, comments: result?.comments });
        !result &&
          res.status(400).send({ success: false, message: err.message });
      } catch (err) {
        console.log(err);
      }
      connection.release();
    });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

const getPendingQuestions = async (req, res) => {
  const filter = { waitingForApproval: true };
  Question.find(filter, function (err, result) {
    if (err) {
      res.status(400).send({ success: false, message: err.message });
    } else {
      console.log(result);
      res.status(200).send({ success: true, data: result });
    }
  });
};

const aproove = async (req, res) => {
  const _id = req.params.id;
  try {
    const question = await Question.findOne({ _id, waitingForApproval: true });
    console.log(question, "question");
    question.waitingForApproval = false;
    result = await question.save();
    res.status(200).send({ success: true, data: result });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

const reject = async (req, res) => {
  console.log("in pending questions");
  const id = req.params.id;
  const filter = { _id: id };
  Question.deleteOne(filter, function (err, result) {
    if (err) {
      res.status(400).send({ success: false, message: err.message });
    } else {
      console.log(result);
      res.status(200).send({ success: true, data: result });
    }
  });
};

const getHistories = async (req, res) => {
  const logID = req.params.id;
  const query = `SELECT * FROM stackoverflow_schema.logs WHERE logId='${logID}';`;
  mysqlConf.getConnection((err, connection) => {
    connection.query(query, async (err, result) => {
      if (err) {
        res.status(400).send("error fetching products");
        return;
      }
      await Promise.all(
        result.map(async (log) => {
          const result = await Users.findOne(
            {
              _id: mongoose.Types.ObjectId(log.bywhom),
            },
            { name: 1, _id: 1 }
          );
          console.log(result);
          log.user = result;
        })
      );
      res.status(200).send(result);
    });
    connection.release();
  });
};

module.exports = {
  addquestion,
  editquestion,
  getquestion,
  getQuestions,
  voteQuestion,
  bookmarkQuestion,
  searchQuestionsByUserId,
  searchQuestionsByText,
  addComment,
  getPendingQuestions,
  aproove,
  reject,
  getHistories,
};

/*
1. Tag badges
whenever user asks the question, we nedd to check if user has that tag already present 
if present we need to increment the count for that tag
if not we need to add as new tag for the user

4. when user signs in store logged in info.

1. number of questions asked
2. number of answers answered
3. reputation score
4. upVoteCount
5. downVoteCount
6. notableQuestion
7. famousQuestion
8. commentBadge
*/
