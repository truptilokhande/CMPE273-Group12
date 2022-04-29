const tagsDb = require("../models/TagModel");
const QuestionsDb = require("../models/question.model");
const Question = require("../models/question.model");
const Answers = require("../models/answer.model");
const Users = require("../models/user.model");
const mongoose = require("mongoose");

exports.testAPI = async (req, res) => {
  let pastWeekDates = [];

  for (let j = 0; j < 7; j++) {
    let currentDate = new Date(
      Date.now() - j * 24 * 60 * 60 * 1000
    ).toISOString();
    let singleDate = {};
    singleDate.date = currentDate.slice(0, 10);
    singleDate.count = 0;
    pastWeekDates.push(singleDate);
  }
  console.log(pastWeekDates);
};

exports.questionsPostedPerDay = async (req, res) => {
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

    //creating dictionary to count number of question posted for last 7 days
    let pastWeekDates = [];

    for (let j = 0; j < 7; j++) {
      let currentDate = new Date(
        Date.now() - j * 24 * 60 * 60 * 1000
      ).toISOString();
      let singleDate = {};
      singleDate.date = currentDate.slice(0, 10);
      singleDate.count = 0;
      pastWeekDates.push(singleDate);
    }

    for (let i = 0; i < result.length; i++) {
      let questionDate = new Date(result[i].createdAt)
        .toISOString()
        .slice(0, 10);
      for (let k = 0; k < pastWeekDates.length; k++) {
        if (pastWeekDates[k].date == questionDate) {
          pastWeekDates[k].count += 1;
          break;
        }
      }
    }
    res.status(200).send({
      data: { result: pastWeekDates },
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

exports.topTags = async (req, res) => {

}

exports.getAllTags = async (req, res) => {
  console.log("handling tags");
  const name = req.body.name;
  const tagBody = req.body.tagBody;

  let onlyToday = new Date();
  onlyToday.setHours(0, 0, 0, 0);
  let today = new Date();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

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

    const taggedQuestionsCountInWeekAgg = [
      {
        $match: {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: today,
          },
        },
      },
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

    const taggedQuestionsInDay = [
      {
        $match: {
          createdAt: {
            $gte: onlyToday,
          },
        },
      },
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

    const questionsTaggedInAWeek = await QuestionsDb.aggregate(
      taggedQuestionsCountInWeekAgg
    );

    const questionsTaggedInADay = await QuestionsDb.aggregate(
      taggedQuestionsInDay
    );

    const tags = await tagsDb.find({});
    res.status(200).send({
      success: true,
      tags,
      taggedQuestionsCount,
      questionsTaggedInADay,
      questionsTaggedInAWeek,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.addTag = (req, res) => {
  console.log("handling add Tag");
  const tagTitle = req.body.tagTitle;
  const tagDescription = req.body.tagDescription;
  console.log(tagTitle);
  console.log(tagDescription);

  const tags = new tagsDb({
    name: tagTitle,
    tagBody: tagDescription,
  });

  tags
    .save(tags)
    .then((data) => {
      console.log(data);
      res.status(200).send({ success: true, result: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "some error occured" });
    });
};

exports.getAllQuestionWithSpecificTag = async (req, res) => {
  try {
    const id = req.params.tagName;
    const checkQuery = [
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
          "tags.id": id,
        },
      },
    ];
    const tag = await tagsDb.findOne({ _id: id });

    const questions = await QuestionsDb.aggregate(checkQuery);
    res.send({ questions, tag });
  } catch (error) {
    res.json(error.message);
  }
};
