const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const question = require("../models/question.model");
const answer = require("../models/answer.model");
const config = require("../config/config.json");
const { query } = require("express");
const expressAsyncHandler = require("express-async-handler");
const QuestionDb = require("../models/question.model");
const mongoose = require("mongoose");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const redisClient = require("../database/redisconnection");
const mysqlConf = require("../database/sqlconnection").mysqlpool;
const userProfileDefaultImages = [
  "https://stackoverflowcmpe273.s3.us-west-1.amazonaws.com/261f4d1183a2a7cfd3927ca3e7895bc9.png",
  "https://stackoverflowcmpe273.s3.us-west-1.amazonaws.com/28a48027ee89f30d8681f415ea164f70.png",
  "https://stackoverflowcmpe273.s3.us-west-1.amazonaws.com/aaeb0451b1f430b5c177aa1f5f3ea8f4.png",
  "https://stackoverflowcmpe273.s3.us-west-1.amazonaws.com/f056a82f02a580b04febfb36b0ccefc4.png",
  "https://stackoverflowcmpe273.s3.us-west-1.amazonaws.com/fd1092142390701a6e86fa5ca1282465.png",
  "https://stackoverflowcmpe273.s3.us-west-1.amazonaws.com/fd1092142390701a6e86fa5ca1282465.png",
  "https://stackoverflowcmpe273.s3.us-west-1.amazonaws.com/fd1092142390701a6e86fa5ca1282465.png",
  "https://stackoverflowcmpe273.s3.us-west-1.amazonaws.com/fd1092142390701a6e86fa5ca1282465.png",
];

const s3 = new aws.S3({
  accessKeyId: "AKIA2WX32KIUACMHTCOR",
  secretAccessKey: "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",
  region: "us-west-1",
});

// @desc    Register a user
// @route   POST /api/users/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Check if all mandatory inputs exists
  if (!name || !email || !password) {
    res.json({
      status: 400,
      message: "Please add all fields",
    });
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const findUserQuery = `SELECT * FROM stackoverflow_schema.userLogin WHERE email = '${email}'`;
  mysqlConf.getConnection(async (err, connection) => {
    try {
      connection.query(findUserQuery, (err, userLoginData) => {
        if (userLoginData.length) {
          res.status(400).send({
            success: true,
            message: "User already exists",
          });
        } else {
          //add user login in mySQL DB
          const addUserQuery = `INSERT INTO stackoverflow_schema.userLogin 
                                (email, password, created) 
                                VALUES 
                                ('${email}','${hashedPassword}','${new Date(
            Date.now()
          ).toISOString()}')`;
          connection.query(addUserQuery, async (err, result) => {
            if (result) {
              // Create user in mongo DB
              const user = await User.create({
                name,
                email,
                profilepicture:
                  userProfileDefaultImages[Math.floor(Math.random() * 5 + 1)],
              });
              if (user) {
                res.json({
                  status: 201,
                  data: {
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                  },
                  message: "User registered successfully",
                });
              } else {
                res.json({
                  status: 400,
                  data: {},
                  message: "Invalid user data",
                });
              }
            }
          });
        }
      });
    } catch (err) {
      res.status(400).send({ success: false, message: err.message });
    }
  });
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let isAdmin = false;
  const findUserQuery = `SELECT * FROM stackoverflow_schema.userLogin WHERE email = '${email}'`;
  mysqlConf.getConnection(async (err, connection) => {
    try {
      connection.query(findUserQuery, async (err, userLoginData) => {
        const passwordMatch = await bcrypt.compare(
          password,
          userLoginData[0].password
        );
        if (userLoginData.length && passwordMatch) {
          if (email == "admin@gmail.com") {
            isAdmin = true;
          }
          const user = await User.findOne({ email });
          res.json({
            status: 200,
            data: {
              _id: user.id,
              name: user.name,
              email: user.email,
              token: generateToken(user._id),
              profilepicture: user.profilepicture,
              isAdmin,
              reputation: user?.reputation,
            },
            message: "User logged in successfully",
          });
        } else {
          res.json({
            status: 400,
            message: "Invalid credentials",
          });
        }
      });
    } catch (err) {
      res.status(400).send({ success: false, message: err.message });
    }
  });
});

// TODO
const signout = (req, res) => {
  res.json({
    status: 200,
    message: "User logged out successfully",
  });
};

// @desc    Get user data
// @route   GET /api/users/getProfile
// @access  Public
// const getProfile = asyncHandler(async (req, res) => {
//   res.json({
//     status: 200,
//     data: req.user,
//     message: "User profile fetched successfully",
//   });
// });

// @desc    Get all users
// @route   GET /api/users/getAllUsers
// @access  Public
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    const valueFromRedis = await redisClient.get("users");
    if (valueFromRedis) {
      console.log("getting user values from cache");
      res.status(200).send({
        data: JSON.parse(valueFromRedis),
        message: "fetched questions",
      });
      return;
    }
    redisClient.set("users", JSON.stringify({ success: "true", data: users }), {
      EX: 50,
    });
    users && res.status(200).send({ success: "true", data: users });
    !users &&
      res
        .status(400)
        .send({ success: "false", message: "error fetching users" });
  } catch (err) {
    res.status(400).send({ success: "false", message: "error fetching users" });
  }
});

// @desc    Get a specific user
// @route   GET /api/users/getUser
// @access  Public
const getUser = asyncHandler(async (req, res) => {
  const userid = req.params.id;
  filter1 = { userId: userid };
  filter = { _id: userid };
  var qc = 0;
  var ac = 0;
  answer.countDocuments(filter1, function (err2, res2) {
    if (err2) {
      console.log(err2);
    } else {
      ac = String(res2);
    }
  });

  question.countDocuments(filter1, function (err1, res1) {
    if (err1) {
      console.log(err1);
    } else {
      console.log(res1);
      qc = String(res1);
    }
  });

  const userQuestions = await question.find(filter1);

  const commentsQuestionCountAgg = [
    {
      $project: {
        comments: 1,
      },
    },
    {
      $unwind: {
        path: "$comments",
      },
    },
    {
      $match: {
        "comments.userId": mongoose.Types.ObjectId(userid),
      },
    },
    {
      $group: {
        _id: "$comments.userId",
        questionCommentCount: {
          $count: {},
        },
      },
    },
  ];

  const commentsAnswersCountAgg = [
    {
      $project: {
        comments: 1,
      },
    },
    {
      $unwind: {
        path: "$comments",
      },
    },
    {
      $match: {
        "comments.userId": mongoose.Types.ObjectId(userid),
      },
    },
    {
      $group: {
        _id: "$comments.userId",
        answerCommentcount: {
          $count: {},
        },
      },
    },
  ];

  console.log("---------------commentsCountAgg----------------------");
  const questionCommentCount = await question.aggregate(
    commentsQuestionCountAgg
  );

  const answerCommentcount = await answer.aggregate(commentsAnswersCountAgg);

  const user = User.findOne(filter, function (err, result) {
    if (err) {
      res.status(400).send({ success: false, message: "error fetching user" });
    } else {
      res.status(200).send({
        success: true,
        data: result,
        qc: qc,
        ac: ac,
        views: userQuestions?.reduce((n, { views }) => n + views, 0),
        cc: parseInt(
          questionCommentCount[0]?.questionCommentCount +
            answerCommentcount[0]?.answerCommentcount
        ),
      });
    }
  });
});

const getTopposts = asyncHandler(async (req, res) => {
  try {
    const userid = req.params.id;
    const answersagg = [
      {
        $lookup: {
          from: "questions",
          localField: "questionId",
          foreignField: "_id",
          as: "question",
        },
      },
      {
        $match: {
          userId: mongoose.Types.ObjectId(userid),
        },
      },
      {
        $project: {
          question: 1,
          markedAsRight: 1,
        },
      },
      {
        $limit: 3,
      },
    ];
    const quesposts = await QuestionDb.find({ userId: userid }).limit(3);
    const answerposts = await answer.aggregate(answersagg);
    res.status(200).send({ quesposts, answerposts });
  } catch (err) {
    res.status(400).send("error retriving user questions and answers");
  }
});

const getQuestions = asyncHandler(async (req, res) => {
  const userid = req.params.id;
  filter = { userId: userid };
  try {
    const questions = question.find({ filter }, { _id: 1, title });
    res.status(200).send({ success: true, data: questions });
  } catch {
    res
      .status(400)
      .send({ success: false, message: "error fetching questions" });
  }
});

const getAnswers = asyncHandler(async (req, res) => {
  const userid = req.params.id;
  filter = { userId: userid };
  try {
    const questions = answer.find({ filter }).populate(questionId);
    res.status(200).send({ success: true, data: questions });
  } catch (err) {
    res.status(400).send({ success: false, message: "error fetching Answers" });
  }
});

const getBookmarks = asyncHandler(async (req, res) => {
  const userid = req.params.id;
  filter = { userId: userid };
  try {
    const bookmarks = user.find({ filter }, { bookmarks: 1 });
    res.status(200).send({ success: true, data: bookmarks });
  } catch {
    res.status(400).send({ success: false, message: "error fetching Answers" });
  }
});

const editProfile = (req, res) => {
  console.log("---------------------- In edit user details -------------");
  const userId = req.params.id;
  console.log(userId);

  const uploadSingle = upload("etsy-lab2").single("userImage");

  uploadSingle(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });
    console.log(req.file);
    console.log(req.body);
    const userName = req.body.userName;
    const location = req.body.location;
    const title = req.body.title;
    const aboutme = req.body.aboutme;
    const websitelink = req.body.websitelink;
    const twitterlink = req.body.twitterlink;
    const githublink = req.body.githublink;
    const fullname = req.body.fullname;

    if (req.file) {
      const profilepicture = req.file.location;
      await User.findByIdAndUpdate(userId, {
        name: userName,
        location: location,
        title,
        about: aboutme,
        websitelink,
        twitterlink,
        githublink,
        profilepicture,
        fullname,
      })
        .then((result) => {
          console.log(result);
          res.send({ success: true, result, profilepicture });
        })
        .catch((err) => {
          console.log(err);
          res.send({ message: "user not updated", err });
        });
    } else {
      await User.findByIdAndUpdate(userId, {
        name: userName,
        location: location,
        title,
        about: aboutme,
        websitelink,
        twitterlink,
        githublink,
        fullname,
      })
        .then((result) => {
          console.log(result);
          res.send({ success: true, result, profilepicture });
        })
        .catch((err) => {
          console.log(err);
          res.send({ message: "user not updated", err });
        });
    }
  });
};

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.jpeg`);
      },
    }),
  });
// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE_PERIOD,
  });
};

module.exports = {
  register,
  login,
  getTopposts,
  getAllUsers,
  getQuestions,
  getAnswers,
  getBookmarks,
  getUser,
  signout,
  editProfile,
};
