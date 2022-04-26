const Question = require("../models/question.model");
const Answers = require("../models/answer.model");
const Users = require("../models/user.model");
const mongoose = require("mongoose");

const getQuestions = async (req, res) => {
  try {
    // fetching the questions
    // calculate answers count and send questions when results are fetched
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
    const user = await Users.findOne({ _id: userId }).lean();
    const userTags = user?.tags; // [{tagId,tagName,tagCount}]
    tags.forEach(async (tag) => {
      // check if tag is already present in user profile userTags.
      const index = userTags.findIndex((x) => x?.tagId?.toString() === tag?.id);
      // i.e if tag is already present
      if (index != -1) {
        const editedTags = userTags?.map((x) => {
          if (x.tagId == tag.id) {
            x.tagCount = x?.tagCount + 1;
          }
          return x;
        });
        await Users.findOneAndUpdate({ _id: userId, tags: editedTags });
      }
      // if tag is not present
      else {
        const newTag = {
          tagId: tag?.id,
          tagName: tag?.name,
        };
        userTags.push(newTag);
        await Users.findOneAndUpdate({ _id: userId, tags: userTags });
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
  let result;
  // update user upvote count
  try {
    if (upvote === "1") {
      await Users.findOneAndUpdate(
        { _id: userId },
        { $inc: { upVoteCount: 1 } }
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
      result = await Question.findOneAndUpdate(
        { _id: questionId },
        { $inc: { votes: 2 } },
        { new: true }
      );
    }
    res.status(200).send({
      success: true,
      message: "Updated successfully",
      vote: result?.votes,
    });
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
  result && res.status(200).send({ success: true, comments: result?.comments });
  !result && res.status(400).send({ success: false, message: err.message });
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
