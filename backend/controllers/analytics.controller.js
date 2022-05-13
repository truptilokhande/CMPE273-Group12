const tagsDb = require("../models/TagModel");
const QuestionsDb = require("../models/question.model");
const Question = require("../models/question.model");
const Answers = require("../models/answer.model");
const Users = require("../models/user.model");
const mongoose = require("mongoose");
const userModel = require("../models/user.model");

exports.questionsPostedPerDay = async (req, res) => {
  try {
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

    //creating dictionary to count number of question posted for last 7 days
    let pastWeekDates = [];

    for (let j = 6; j >= 0; j--) {
      let currentDate = new Date(
        Date.now() - j * 24 * 60 * 60 * 1000
      ).toISOString();
      let singleDate = {};
      singleDate.date = currentDate.slice(0, 10);
      singleDate.count = 0;
      pastWeekDates.push(singleDate);
    }

    result.map((ques) => {
      console.log(ques.createdAt);
      if (!ques.createdAt) return;
      let questionDate = new Date(ques?.createdAt)?.toISOString()?.slice(0, 10);
      for (let k = 0; k < pastWeekDates.length; k++) {
        if (pastWeekDates[k].date == questionDate) {
          pastWeekDates[k].count += 1;
          break;
        }
      }
    });

    res.status(200).send({
      data: { result: pastWeekDates },
      message: "fetched questions",
    });
    console.log(pastWeekDates);
  } catch (err) {
    console.log(err);
    // any errors in fetching the questions
    res.status(400).send({
      data: {},
      message: "error fetching the questions",
    });
  }
};

exports.topTags = async (req, res) => {
  try {
    const taggedQuestionsCountAgg = [
      {
        $project: {
          tags: 1,
        },
      },
      {
        $unwind: {
          path: "$tags",
        },
      },
      {
        $group: {
          _id: "$tags.id",
          count: {
            $count: {},
          },
        },
      },
    ];

    const taggedQuestionsCount = await QuestionsDb.aggregate(
      taggedQuestionsCountAgg
    );

    const tags = await tagsDb.find({});
    for (let i = 0; i < tags.length; i++) {
      for (let j = 0; j < taggedQuestionsCount.length; j++) {
        //   console.log(taggedQuestionsCount[j]);
        if (taggedQuestionsCount[j]._id == tags[i]._id) {
          taggedQuestionsCount[j].name = tags[i].name;
          break;
        }
      }
    }
    taggedQuestionsCount.sort((a, b) => b.count - a.count).slice(0, 10);

    res.status(200).send({ success: true, taggedQuestionsCount });
  } catch (err) {
    res.status(500).send({ message: "some error occured" });
  }
};

exports.reputationSortedUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    topUsers = users.sort((a, b) => b.reputation - a.reputation).slice(0, 10);
    bottomUsers = users
      .sort((a, b) => a.reputation - b.reputation)
      .slice(0, 10);
    users &&
      res
        .status(200)
        .send({ success: "true", data: { topUsers, bottomUsers } });
    !users &&
      res
        .status(400)
        .send({ success: "false", message: "error fetching users" });
  } catch (err) {
    res.status(400).send({ success: "false", message: "error fetching users" });
  }
};

exports.topViewedQuestion = async (req, res) => {
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
    sortedQuestions = result.sort((a, b) => b.views - a.views).slice(0, 10);
    //   console.log(sortedQuestions);
    sortedQuestionsFinal = [];
    sortedQuestions.forEach((question) => {
      let currentQuestion = {
        id: question._id,
        title: question.title,
        views: question.views,
      };
      sortedQuestionsFinal.push(question);
    });

    res.status(200).send({
      data: { topquestions: sortedQuestionsFinal },
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
