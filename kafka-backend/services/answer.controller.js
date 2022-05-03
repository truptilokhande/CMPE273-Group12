const answersDb = require("../models/answer.model");
const commentDb = require("../models/commentModel");
const Users = require("../models/user.model");
const mysqlConf = require("../database/mysqlConnection").mysqlpool;

const addAnswer = async (req, res) => {
  return new Promise(async (resolve, reject) => {
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
            resolve({ success: true, result: data });
            // res.status(200).send({ success: true, result: data });
          } catch (err) {
            console.log(err);
          }
          connection.release();
        });
      })
      .catch((err) => {
        reject({ message: "some error occured" });
        // res.status(500).send({ message: "some error occured" });
      });
  });
};

const voteAnswer = async (req, res) => {
  return new Promise(async (resolve, reject) => {
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
            resolve({
              success: true,
              message: "Updated successfully",
              votes: result?.votes,
            });

            // res.status(200).send({
            //   success: true,
            //   message: "Updated successfully",
            //   votes: result?.votes,
            // });
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
            resolve({
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
      reject({ success: false, message: "Can't update" });
    }
  });
};

const addComment = async (req, res) => {
  return new Promise(async (resolve, reject) => {
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
      result && resolve({ success: true, data: answer });
      !result && reject({ success: false, message: "Error while commenting" });
    } catch (err) {
      reject({ success: false, message: err.message });
    }
  });
};

const setBestAnswer = async (req, res) => {
  return new Promise(async (resolve, reject) => {
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

      resolve({ success: true, data: answers });
      // res.status(200).send({ success: true, data: answers });
    } catch (err) {
      reject({ success: false, message: "Can't update" });
      // res.status(400).send({ success: false, message: "Can't update" });
    }
  });
};

async function handle_request(msg) {
  if (msg.path === "add-answer") {
    return await addAnswer(msg);
  } else if (msg.path === "vote-answer") {
    return await voteAnswer(msg);
  } else if (msg.path === "add-comment") {
    return await addComment(msg);
  } else if (msg.path === "set-best-answer") {
    return await setBestAnswer(msg);
  }
}

module.exports = {
  handle_request,
};
