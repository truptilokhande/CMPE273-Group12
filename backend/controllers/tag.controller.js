const express = require("express");
const tagsDb = require("../models/TagModel");
const moment = require("moment");
const QuestionsDb = require("../models/question.model");
const redisClient = require("../database/redisconnection");

exports.getAllTags = async (req, res) => {
  console.log("handling tags");
  const valueFromRedis = await redisClient.get("tags");
  if (valueFromRedis) {
    console.log("getting tag values from cache");
    res.status(200).send({
      data: JSON.parse(valueFromRedis),
      message: "fetched questions",
    });
    return;
  }
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

    redisClient.set(
      "tags",
      JSON.stringify({
        success: true,
        tags,
        taggedQuestionsCount,
        questionsTaggedInADay,
        questionsTaggedInAWeek,
      }),
      {
        EX: 50,
      }
    );

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
