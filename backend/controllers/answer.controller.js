const express = require("express");
const answersDb = require("../models/answer.model");
const Users = require("../models/user.model");
const mongoose = require("mongoose");

exports.addAnswer = (req, res) => {
  console.log("handling add answer ");
  const userId = req.body.userId;
  const questionId = req.body.questionId;
  const answerBody = req.body.answerBody;

  const answers = new answersDb({
    userId,
    questionId,
    answerBody,
  });

  answers
    .save(answers)
    .then((data) => {
      res.status(200).send({ success: true, result: data });
    })
    .catch((err) => {
      res.status(500).send({ message: "some error occured" });
    });
};

exports.voteAnswer = async (req, res) => {
  const { upvote } = req.query;
  const answerId = req.body.answerId;
  const userId = req.body.userId;

  // update user upvote count
  try {
    if (upvote === "1") {
      await Users.findOneAndUpdate(
        { _id: userId },
        { $inc: { upVoteCount: 1 } }
      );
      await answersDb.findOneAndUpdate(
        { _id: answerId },
        { $inc: { votes: 1 } }
      );
    } else {
      await Users.findOneAndUpdate(
        { _id: userId },
        { $inc: { downVoteCount: 1 } }
      );
      await answersDb.findOneAndUpdate(
        { _id: answerId },
        { $inc: { votes: -1 } }
      );
    }
    res.status(200).send({ success: true, message: "Updated successfully" });
  } catch (err) {
    res.status(400).send({ success: false, message: "Can't update" });
  }
};

exports.addComment = async (req, res) => {
  console.log("handling comment answer ");
  try {
    const answerId = req.body.answerId;
    const answer = await answersDb.findOne({ _id: answerId });
    const comments = answer?.comments || [];
    comments.push(req.body);

    const result = await answersDb.findOneAndUpdate(
      { _id: answerId },
      { comments },
      { new: true }
    );
    result && res.status(200).send({ success: true, result: answer });
    !result &&
      res
        .status(400)
        .send({ success: false, message: "Error while commenting" });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.setBestAnswer = async (req, res) => {
  // const bestAnswer = req.body.markedRight;
  const id = req.body.answerId;
  const questionId = req.body.questionId;
  try {
    const answer = await answersDb.findOne({ _id: id });
    console.log(answer)
    // checking if it is alraedy set to true
    if (answer.markedAsRight !== true) {
      // removing if there's any answer set to best previously
      await answersDb.findOneAndUpdate(
        { markedAsRight: true },
        { markedAsRight: false }
      );
      // adding/removing the answer as best
      await answersDb.findOneAndUpdate({ _id: id }, { markedAsRight: true });
    } else {
      await answersDb.findOneAndUpdate({ _id: id }, { markedAsRight: false });
    }

    // sending updated answers
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
    const answers = await answersDb.aggregate(answerAgg);

    res.status(200).send({ success: true, data: answers });
  } catch (err) {
    res.status(400).send({ success: false, message: "Can't update" });
  }
};
