const express = require("express");
const answersDb = require("../models/answer.model");

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

exports.voteAnswer = (req, res) => {
  console.log("In votes");
  const votes = req.body.votes;
  const id = req.body.answerId;
  answersDb.updateOne({ _id: id }, { votes }).then((data) => {
    console.log(data);
    if (data.modifiedCount !== 1) {
      console.log(data + " can't update shopname");
      res.status(400).send({ success: false, message: "Can't update" });
    } else {
      console.log(data);
      res.status(200).send({ success: true, message: "Updated successfully" });
    }
  });
};

exports.addComment = async (req, res) => {
  console.log("handling comment answer ");
  try {
    const answerId = req.params.answerId;
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

exports.setBestAnswer = (req, res) => {
  console.log("In setBestAnswer");
  const bestAnswer = req.body.markedRight;
  const id = req.body.answerId;
  console.log(bestAnswer);
  console.log(id);

  answersDb
    .updateOne({ _id: id }, { markedAsRight: bestAnswer })
    .then((data) => {
      console.log(data);
      if (data.modifiedCount !== 1) {
        console.log(data + " can't update shopname");
        res.status(400).send({ success: false, message: "Can't update" });
      } else {
        console.log(data);
        res
          .status(200)
          .send({ success: true, message: "Updated successfully" });
      }
    });
};
