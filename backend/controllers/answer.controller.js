const express = require("express");
const answersDb = require("../models/answerModel");

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
      console.log(data);
      res.status(200).send({ success: true, result: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "some error occured" });
    });
};
