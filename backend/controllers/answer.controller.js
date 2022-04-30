const express = require("express");
const answersDb = require("../models/answer.model");
const commentDb = require("../models/commentModel");
const Users = require("../models/user.model");
const mongoose = require("mongoose");
const mysqlConf = require("../database/sqlconnection").mysqlpool;

exports.addAnswer = async (req, res) => {
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
      const query = `INSERT INTO stackoverflow_schema.logs (logId, what, bywhom, content, created) VALUES ('${questionId}','answer','${userId}','${answerBody}','${new Date(
        Date.now()
      ).toISOString()}')`;
      mysqlConf.getConnection(async (err, connection) => {
        try {
          await connection.query(query);
          res.status(200).send({ success: true, result: data });
        } catch (err) {
          console.log(err);
        }
        connection.release();
      });
    })
    .catch((err) => {
      res.status(500).send({ message: "some error occured" });
    });
};

exports.voteAnswer = async (req, res) => {
  const { upvote } = req.query;
  const answerId = req.body.answerId;
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
        { $inc: { reputation: 5 } }
      );
      result = await answersDb.findOneAndUpdate(
        { _id: answerId },
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
        { $inc: { reputation: -5 } }
      );
      result = await answersDb.findOneAndUpdate(
        { _id: answerId },
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
        { $inc: { reputation: -5 } }
      );
      result = await answersDb.findOneAndUpdate(
        { _id: answerId },
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
        { $inc: { reputation: 5 } }
      );
      result = await answersDb.findOneAndUpdate(
        { _id: answerId },
        { $inc: { votes: 2 } },
        { new: true }
      );
    }
    if (upvote === "0" || upvote === "2") {
      const query = `INSERT INTO stackoverflow_schema.logs (logId, what, bywhom, content, created) VALUES ('${userId}','downvote answer','${userId}','${title}','${new Date(
        Date.now()
      ).toISOString()}')`;
      mysqlConf.getConnection(async (err, connection) => {
        try {
          await connection.query(query);
          res.status(200).send({
            success: true,
            message: "Updated successfully",
            votes: result?.votes,
          });
        } catch (err) {
          console.log(err);
        }
        connection.release();
      });
    } else {
      const query = `INSERT INTO stackoverflow_schema.logs (logId, what, bywhom, content, created) VALUES ('${userId}','upvote answer','${userId}','${title}','${new Date(
        Date.now()
      ).toISOString()}')`;
      mysqlConf.getConnection(async (err, connection) => {
        try {
          await connection.query(query);
          res.status(200).send({
            success: true,
            message: "Updated successfully",
            votes: result?.votes,
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

exports.addComment = async (req, res) => {
  try {
    const { answerId, userId, userName, commentBody } = req.body;
    const answer = await answersDb.findOne({ _id: answerId });
    const comments = answer?.comments || [];
    comments.push(
      new commentDb({
        userId,
        userName,
        commentBody,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    const result = await answersDb.findOneAndUpdate(
      { _id: answerId },
      { comments },
      { new: true }
    );
    result && res.status(200).send({ success: true, data: answer });
    !result &&
      res
        .status(400)
        .send({ success: false, message: "Error while commenting" });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.setBestAnswer = async (req, res) => {
  const id = req.body.answerId;
  const questionId = req.body.questionId;
  const userId = req.body.userId;

  try {
    const answer = await answersDb.findOne({ _id: id });
    // checking if it is alraedy set to true
    if (answer.markedAsRight !== true) {
      // removing if there's any answer set to best previously
      await answersDb.findOneAndUpdate(
        { markedAsRight: true },
        { markedAsRight: false }
      );
      // adding/removing the answer as best
      await answersDb.findOneAndUpdate({ _id: id }, { markedAsRight: true });
      await Users.findOneAndUpdate(
        { _id: userId },
        { $inc: { reputation: 15 } }
      );
    } else {
      await answersDb.findOneAndUpdate({ _id: id }, { markedAsRight: false });
      await Users.findOneAndUpdate(
        { _id: userId },
        { $inc: { reputation: -15 } }
      );
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
