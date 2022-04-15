const express = require("express");
const tagsDb = require("../models/TagModel");

exports.getAllTags = (req, res) => {
  console.log("handling tags");
  const name = req.body.name;
  const tagBody = req.body.tagBody;

  tagsDb
    .find({})
    .then((data) => {
      console.log(data);
      res.status(200).send({ success: true, result: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "some error occured" });
    });
};

exports.addTag = (req, res) => {
  console.log("handling add Tag");
  const tagTitle = req.body.tagTitle;
  const tagDescription = req.body.tagDescription;

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
