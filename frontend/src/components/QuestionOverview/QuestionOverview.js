/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo, useRef } from "react";
import "./QuestionOverview.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import connection from "../../config.json";
import parse from "html-react-parser";
import RelativeTime from "@yaireo/relative-time";
import moment from "moment";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import S3FileUpload from "react-s3";
import {
  increasereputation,
  decrementreputation,
} from "../../store/actions/actions";

function QuestionOverview({ user, incrementReputation, decrementReputation }) {
  const relativeTime = new RelativeTime();
  const [question, setQuestion] = useState();
  const [usercomment, setComment] = useState();
  const [userdetails, setUserdetails] = useState();
  const [answers, setAnswers] = useState();
  const [answerBody, setAnswerBody] = useState();
  const [commentAdded, setCommentAdded] = useState(false);
  const [isQuestionUpvoted, setQuestionUpVoted] = useState(false);
  const [isQuestionDownVoted, setQuestionDownVoted] = useState(false);
  const [isAnswerupvoted, setAnswerupvoted] = useState([]);
  const [isAnswerdownvoted, setAnswerdownvoted] = useState([]);
  const [questionCommentContent, setQuestionCommentContent] = useState();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    axios
      .get(`${connection.connectionURL}/api/question/getQuestion/${id}`,
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        setQuestion(response?.data?.question);
        setUserdetails(response?.data?.userDetails);
        setAnswers(response?.data?.answers);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    addEventListeners();
  }, [answers]);

  const addEventListeners = () => {
    answers?.forEach((answer) => {
      const show = document.getElementById(`show-${answer._id}`);
      const hide = document.getElementById(`hide-${answer._id}`);
      const form = document.getElementById(`form-${answer._id}`);
      const textarea = document.getElementById(`textarea-${answer._id}`);

      show.addEventListener("click", function () {
        form.style = "display: block";
        textarea.style = "animation: riseHeight 1s .1s normal forwards";
        hide.style = "display: block";
        show.disabled = true;
      });

      hide.addEventListener("click", function () {
        form.style = "display: none";
        hide.style = "display: none";
        show.disabled = false;
      });
    });
    document.addEventListener("DOMContentLoaded", function (event) {
      var scrollpos = localStorage.getItem("scrollpos");
      if (scrollpos) window.scrollTo(0, scrollpos);
    });

    window.onbeforeunload = function (e) {
      localStorage.setItem("scrollpos", window.scrollY);
    };
  };

  const saveToServer = (file) => {
    const config = {
      accessKeyId: "AKIA2WX32KIUACMHTCOR",
      secretAccessKey: "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",
      region: "us-west-1",
      bucketName: "etsy-lab2",
    };
    S3FileUpload.uploadFile(file, config)
      .then(async (res) => {
        console.log(res);
        editorRef.current.getEditor().insertEmbed(null, "image", res?.location);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  };

  const quillOptions = useMemo(
    () => ({
      toolbar: {
        container: [
          //   [{ 'header': [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["link", "image", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const postAnswer = () => {
    const answer = {
      userId: user?._id,
      questionId: question?._id,
      answerBody,
    };
    axios
      .post(`${connection.connectionURL}/api/answer/add-answer`,
      answer,
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        window.location.reload(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  const postCommentToAnswer = (id) => {
    const comment = {
      userId: user?._id,
      userName: user?.name,
      answerId: id,
      commentBody: usercomment,
    };
    axios
      .post(`${connection.connectionURL}/api/answer/add-comment`,
      comment,
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        const result = answers.map((x) => {
          const item = x?._id === id;
          const comments = response?.data?.data?.comments;
          return item ? { ...x, comments } : x;
        });
        setAnswers([...result]);
        document.location.reload(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  const upvoteordownvoteQuestion = (upordownvotevalue) => {
    let valuetobeincrementedordecremented;
    if (upordownvotevalue === 1) {
      // upvoted
      if (isQuestionDownVoted) {
        // check if already up voted then we need to remove upvote and downvote too.
        valuetobeincrementedordecremented = 3;
      } else {
        // check if already upvoted
        valuetobeincrementedordecremented = isQuestionUpvoted ? 0 : 1;
      }
    } else {
      // downvoted
      if (isQuestionUpvoted) {
        // check if already up voted then we need to remove upvote and downvote too.
        valuetobeincrementedordecremented = 2;
      } else {
        // check if already downvoted.
        valuetobeincrementedordecremented = isQuestionDownVoted ? 1 : 0;
      }
    }
    axios
      .post(
        `${connection.connectionURL}/api/question/voteQuestion?upvote=${valuetobeincrementedordecremented}`,
        {
          userId: user?._id,
          questionId: question?._id,
          title:question?.title
        },
        { headers: {"Authorization" : `Bearer ${token}`} }
      )
      .then((response) => {
        setQuestion({
          ...question,
          votes: response?.data?.vote,
        });
        if (upordownvotevalue === 1) {
          setQuestionUpVoted(!isQuestionUpvoted);
          incrementReputation(10);
        } else {
          setQuestionDownVoted(!isQuestionDownVoted);
          decrementReputation(10);
        }
        if (valuetobeincrementedordecremented === 2) {
          setQuestionUpVoted(!isQuestionUpvoted);
          incrementReputation(10);
        }
        if (valuetobeincrementedordecremented === 3) {
          setQuestionDownVoted(!isQuestionDownVoted);
          decrementReputation(10);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const upvoteordownvoteAnswer = (answerId, upordownvotevalue, title) => {
    let valuetobeincrementedordecremented;
    if (upordownvotevalue === 1) {
      // user has clicked upvote if value is 1
      // checking if answers down vote array has answerid i.e checking if user has already downvoted
      if (isAnswerdownvoted.some((item) => item === answerId)) {
        // sending 3 as code to BE, BE will remove the down vote and add the upvote i.e increment votes by 2
        valuetobeincrementedordecremented = 3;
      } else {
        // this executes when user didn't downvote anytime.
        // checks if user upvoted anytime -> if so we need to downvote the question
        // checks if user didn't upvoted anytime ->  need to up the question
        valuetobeincrementedordecremented = isAnswerupvoted.some(
          (item) => item === answerId
        )
          ? 0
          : 1;
      }
    } else {
      // user has clicked downvote if value is 0
      // checking if answers up vote array has answerid i.e checking if user has already upvoted
      if (isAnswerupvoted.some((item) => item === answerId)) {
        // sending 2 as code to BE, BE will remove the up vote and down the upvote i.e decrement votes by 2
        valuetobeincrementedordecremented = 2;
      } else {
        // this executes when user didn't up anytime.
        // checks if user downvoted anytime -> if so we need to upvote the question
        // checks if user didn't downvote anytime ->  need to downvote the question
        valuetobeincrementedordecremented = isAnswerdownvoted.some(
          (item) => item === answerId
        )
          ? 1
          : 0;
      }
    }
    axios
      .post(
        `${connection.connectionURL}/api/answer/vote-answer?upvote=${valuetobeincrementedordecremented}`,
        {
          userId: user?._id,
          answerId,
          title
        },
        { headers: {"Authorization" : `Bearer ${token}`} }
      )
      .then((response) => {
        const res = answers.map((i) => {
          if (i._id === answerId) {
            return { ...i, votes: response?.data?.votes };
          }
          return i;
        });
        setAnswers([...res]);
        // upvote and downvote button are not active and upvote is clicked
        if (
          valuetobeincrementedordecremented === 1 &&
          upordownvotevalue === 1
        ) {
          setAnswerupvoted([...[...isAnswerupvoted, String(answerId)]]);
          incrementReputation(5);
        }
        // upvote is active and downvote button is not active and upvote is clicked
        else if (
          upordownvotevalue === 1 &&
          valuetobeincrementedordecremented === 0
        ) {
          const index = isAnswerupvoted.findIndex((item) => item === answerId);
          if (index !== -1) {
            isAnswerupvoted.splice(index, 1);
          }
          setAnswerupvoted([...isAnswerupvoted]);
          decrementReputation(5);
        }
        // upvote is active and downvote button is not active and downvote is clicked
        else if (
          valuetobeincrementedordecremented === 2 &&
          upordownvotevalue === 0
        ) {
          const index = isAnswerupvoted.findIndex((item) => item === answerId);
          if (index !== -1) {
            isAnswerupvoted.splice(index, 1);
          }
          setAnswerupvoted(isAnswerupvoted);
          setAnswerdownvoted([...[...isAnswerdownvoted, String(answerId)]]);
          decrementReputation(5);
        }
        // upvote and downvote button are not active and down is clicked
        else if (
          valuetobeincrementedordecremented === 0 &&
          upordownvotevalue === 0
        ) {
          setAnswerdownvoted([...[...isAnswerdownvoted, String(answerId)]]);
          decrementReputation(5);
        }
        // upvote is active and downvote button is not active and downvote is clicked
        else if (
          valuetobeincrementedordecremented === 1 &&
          upordownvotevalue === 0
        ) {
          const index = isAnswerdownvoted.findIndex(
            (item) => item === answerId
          );
          if (index !== -1) {
            isAnswerdownvoted.splice(index, 1);
          }
          setAnswerdownvoted([...isAnswerdownvoted]);
          decrementReputation(5);
        }
        // upvote is not active and downvote button is active and upvote is clicked
        else {
          const index = isAnswerdownvoted.findIndex(
            (item) => item === answerId
          );
          if (index !== -1) {
            isAnswerdownvoted.splice(index, 1);
          }
          setAnswerdownvoted(isAnswerdownvoted);
          setAnswerupvoted([...[...isAnswerupvoted, String(answerId)]]);
          incrementReputation(5);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const markAnswerAsAsRight = (id, markedAsRight) => {
    axios
      .post(`${connection.connectionURL}/api/answer/set-best-answer`, {
        userId: user?._id,
        questionId: question?._id,
        answerId: id,
      },
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        setAnswers([...response?.data?.data]);
        if (markedAsRight) {
          decrementReputation(15);
        } else {
          incrementReputation(15);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const bookmarkQuestion = () => {
    axios
      .post(`${connection.connectionURL}/api/question/bookmark`, {
        questionId: question?._id,
        userId: user?._id,
      },
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        setUserdetails({ ...response?.data?.result });
      })
      .catch((err) => {
        throw err;
      });
  };

  const addCommentToQuestion = () => {
    axios
      .post(`${connection.connectionURL}/api/question/addComment`, {
        questionId: question?._id,
        userId: user?._id,
        userName: user?.name,
        commentBody: questionCommentContent,
      },
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        const comments = response?.data?.comments;
        setQuestion({ ...question, comments });
        setCommentAdded(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <>
      <div className="question">
        <div className="d-flex justify-content-between">
          <h1 className="fs-headline1">{question?.title}</h1>
        </div>

        <div className="d-flex align-items-end  mb-3 question-overview-data-wrapper">
          {question?.createdAt ? (
            <div className="mr-4 mb-2">
              <span className="light-text mr-1">Asked</span>
              {relativeTime.from(new Date(question?.createdAt))}
            </div>
          ) : null}
          {question?.updatedAt ? (
            <div className="mr-4 mb-2">
              <span className="light-text mr-1">Modified</span>
              {relativeTime.from(new Date(question?.updatedAt))}
            </div>
          ) : null}
          <div className="mr-4 mb-2">
            <span className="light-text mr-1">Viewed</span>
            {question?.views} times
          </div>
        </div>

        <div className="post-layout d-flex row no-gutters">
          <div className="vote-cell col-1">
            <div className="voting-container d-flex justify-content-center flex-column align-items-stretch">
              <button
                className={`vote-up-button voting-container-button ${
                  isQuestionUpvoted ? "upvoted-btn" : ""
                }`}
                onClick={() => {
                  upvoteordownvoteQuestion(1);
                }}
              >
                <svg
                  className="svg-icon iconArrowUpLg"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                >
                  <path d="M2 25h32L18 9 2 25Z"></path>
                </svg>
              </button>

              <div className="vote-count d-flex flex-column align-items-center">
                {question?.votes}
              </div>

              <button
                className={`vote-down-button voting-container-button ${
                  isQuestionDownVoted ? "downvoted-btn" : ""
                }`}
                onClick={() => {
                  upvoteordownvoteQuestion(0);
                }}
              >
                <svg
                  className="svg-icon iconArrowDownLg"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                >
                  <path d="M2 11h32L18 27 2 11Z"></path>
                </svg>
              </button>

              <button
                className="bookmark-button voting-container-button"
                onClick={() => {
                  bookmarkQuestion();
                }}
              >
                <svg
                  aria-hidden="true"
                  className="iconBookmark"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M6 1a2 2 0 0 0-2 2v14l5-4 5 4V3a2 2 0 0 0-2-2H6Zm3.9 3.83h2.9l-2.35 1.7.9 2.77L9 7.59l-2.35 1.7.9-2.76-2.35-1.7h2.9L9 2.06l.9 2.77Z"
                    fill={
                      userdetails?.bookmarks?.includes(question?._id)
                        ? "#CEA71C"
                        : "#BABFC3"
                    }
                  ></path>
                </svg>
              </button>

              <a
                className="post-issue-button mx-auto my-1"
                href={`/timeline/${question?._id}`}
              >
                <svg
                  aria-hidden="true"
                  className="mln2 mr0 svg-icon iconHistory"
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                >
                  <path d="M3 9a8 8 0 1 1 3.73 6.77L8.2 14.3A6 6 0 1 0 5 9l3.01-.01-4 4-4-4h3L3 9Zm7-4h1.01L11 9.36l3.22 2.1-.6.93L10 10V5Z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="question-layout col-11">
            <div className="question-content question-wrapper-content">
              {parse(question?.questionbody || "")}
            </div>
            <div className="question-tags d-flex flex-wrap">
              {question?.tags?.map((tag) => (
                <a href={`/tagOverview/${tag?.id}`} className="tag">
                  {tag?.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="question-overview-user-profile d-flex justify-content-between">
          <div className="ml-4">
            {userdetails?._id === user?._id ? (
              <button
                className="edit-question"
                onClick={() => {
                  navigate("/edit-question", { state: { question } });
                }}
              >
                edit question
              </button>
            ) : null}
          </div>

          <div className="user-info-wrapper">
            <div className="user-info">
              <div className="user-action-time">
                asked{" "}
                <span>
                  {moment(question?.createdAt).format("MMMM DD,YYYY")} at{" "}
                  {moment(question?.createdAt).format("h:mm")}
                </span>
              </div>
              <div className="user-avatar">
                <img
                  src={userdetails?.profilepicture}
                  alt="user avatar"
                  width="32"
                  height="32"
                  className="rounded"
                />
              </div>
              <div className="user-details">
                <a href="/">{userdetails?.name}</a>
                <div className="reputation-wrapper">
                  <span className="reputation-score">753</span>
                  <span>
                    <span className="badge2">●</span>
                    <span className="badgecount">3</span>
                  </span>
                  <span>
                    <span className="badge3">●</span>
                    <span className="badgecount">11</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="question-comments mt-4">
          <ul className="comments-list">
            {question?.comments?.map((comment) => (
              <li className="comment m-2">
                <div className="comment-text  js-comment-text-and-form">
                  <div className="comment-body js-comment-edit-hide">
                    <span className="comment-copy">{comment?.commentBody}</span>

                    <div className="d-inline-flex align-items-center">
                      &nbsp;–&nbsp;
                      <a href="/" className="comment-user">
                        {comment?.userName}
                      </a>
                    </div>
                    <span className="comment-date">
                      <span>
                        {moment(comment?.createdAt).format("MMMM DD,YYYY")} at{" "}
                        {moment(comment?.createdAt).format("h:mm")}
                      </span>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="add-comment-question mt-4">
          {!commentAdded && (
            <button
              className="add-comment-link"
              onClick={() => {
                setCommentAdded(true);
              }}
            >
              Add a comment
            </button>
          )}
          {commentAdded && (
            <div className="comment-wrapper row no-gutters mt-4">
              <div className="col-8 mr-2">
                <textarea
                  className="w-100"
                  onChange={(e) => {
                    setQuestionCommentContent(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="col-2">
                <button
                  className="add-comment-button"
                  onClick={() => {
                    addCommentToQuestion();
                    setCommentAdded(true);
                  }}
                >
                  Add a comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="answer mt-4">
        <div className="d-flex justify-content-between">
          <h5>{answers?.length} Answer</h5>
        </div>
        {/* iterate answer */}
        {answers?.map((answer) => (
          <div className="answer-wrapper">
            <div className="post-layout d-flex row no-gutters mt-4">
              <div className="vote-cell col-1">
                <div className="voting-container d-flex justify-content-center flex-column align-items-stretch">
                  <button
                    className={`vote-up-button voting-container-button answer-up-${
                      answer._id
                    } ${
                      isAnswerupvoted.some((item) => item === answer._id)
                        ? "active-up-vote"
                        : ""
                    }`}
                    onClick={() => {
                      upvoteordownvoteAnswer(
                        answer?._id,
                        1,
                        answer?.answerBody
                      );
                    }}
                  >
                    <svg
                      className="svg-icon iconArrowUpLg"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                    >
                      <path d="M2 25h32L18 9 2 25Z"></path>
                    </svg>
                  </button>

                  <div className="vote-count d-flex flex-column align-items-center">
                    {answer?.votes}
                  </div>

                  <button
                    className={`vote-down-button voting-container-button answer-down-${
                      answer._id
                    } ${
                      isAnswerdownvoted.some((item) => item === answer._id)
                        ? "active-up-vote"
                        : ""
                    }`}
                    onClick={() => {
                      upvoteordownvoteAnswer(
                        answer?._id,
                        0,
                        answer?.answerBody
                      );
                    }}
                  >
                    <svg
                      className="svg-icon iconArrowDownLg"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                    >
                      <path d="M2 11h32L18 27 2 11Z"></path>
                    </svg>
                  </button>

                  {answer?.markedAsRight && question?.userId !== user?._id ? (
                    <div className="text-center correct-answer-user">
                      <svg
                        aria-hidden="true"
                        className="svg-icon iconCheckmarkLg"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                      >
                        <path
                          d="m6 14 8 8L30 6v8L14 30l-8-8v-8Z"
                          fill="green"
                        ></path>
                      </svg>
                    </div>
                  ) : null}

                  {question?.userId === user?._id ? (
                    <button
                      className="text-center correct-answer"
                      onClick={() => {
                        markAnswerAsAsRight(answer?._id, answer?.markedAsRight);
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        className=""
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                      >
                        <path
                          d="m6 14 8 8L30 6v8L14 30l-8-8v-8Z"
                          fill={answer?.markedAsRight ? "green" : "grey"}
                        ></path>
                      </svg>
                    </button>
                  ) : null}
                </div>
              </div>
              <div className="question-layout col-11">
                <div className="question-content">
                  {parse(answer?.answerBody || "")}
                </div>
              </div>
            </div>

            <div className="question-answer-user-profile d-flex justify-content-end">
              <div className="user-info-wrapper">
                <div className="user-info">
                  <div className="user-action-time">
                    <span>
                      {moment(answer?.createdAt).format("h:mm MM-DD-YYYY")}{" "}
                    </span>
                  </div>
                  <div className="user-avatar">
                    <img
                      src={answer?.user[0]?.profilepicture}
                      alt="user avatar"
                      width="32"
                      height="32"
                      className="rounded"
                    />
                  </div>
                  <div className="user-details">
                    <a href="/">{answer?.user[0]?.name}</a>
                    <div className="reputation-wrapper">
                      <span className="reputation-score">753</span>
                      <span>
                        <span className="badge2">●</span>
                        <span className="badgecount">3</span>
                      </span>
                      <span>
                        <span className="badge3">●</span>
                        <span className="badgecount">11</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="question-comments mt-4">
              <ul className="comments-list">
                {answer?.comments?.map((comment) => (
                  <li className="comment m-2">
                    <div className="comment-text  js-comment-text-and-form">
                      <div className="comment-body js-comment-edit-hide">
                        <span className="comment-copy">
                          {comment?.commentBody}
                        </span>

                        <div className="d-inline-flex align-items-center">
                          &nbsp;–&nbsp;
                          <a href="/" className="comment-user">
                            {comment?.userName}
                          </a>
                        </div>
                        <span className="comment-date">
                          <span>
                            {moment(comment?.createdAt).format("MMMM DD,YYYY")}{" "}
                            at {moment(comment?.createdAt).format("h:mm")}
                          </span>
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="add-comment-question mt-4 mb-2">
              <>
                <button className="add-comment-link" id={`show-${answer._id}`}>
                  Add a comment
                </button>
                <button id={`hide-${answer._id}`} style={{ display: "none" }}>
                  X
                </button>
              </>

              <form
                id={`form-${answer._id}`}
                className="comment-wrapper row no-gutters mt-4"
                style={{ display: "none" }}
              >
                <div className="col-8 mr-2">
                  <textarea
                    className="w-100"
                    id={`textarea-${answer._id}`}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="col-2">
                  <button
                    className="add-comment-button"
                    onClick={() => {
                      postCommentToAnswer(answer?._id);
                    }}
                  >
                    Add a comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        ))}
        {/* iterate answer end */}
      </div>

      <div className="post-answer">
        <div className="d-flex justify-content-between my-3">
          <h5>Your answer</h5>
        </div>
        <div className="d-flex position-relative">
          <ReactQuill
            placeholder={"Write something awesome..."}
            modules={quillOptions}
            ref={editorRef}
            onChange={(val) => {
              setAnswerBody(val);
            }}
          />
        </div>
      </div>

      <div className="post-answer">
        <button
          className="ask-question-submit my-3"
          type="submit"
          onClick={() => {
            postAnswer();
          }}
        >
          Post Your Answer
        </button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  incrementReputation: (val) => dispatch(increasereputation(val)),
  decrementReputation: (val) => dispatch(decrementreputation(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionOverview);
