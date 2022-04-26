const express = require("express");
const tagsDb = require("../models/TagModel");
var moment = require("moment");
const QuestionsDb = require("../models/question.model");

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
