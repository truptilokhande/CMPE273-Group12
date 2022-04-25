import React, { useEffect, useState } from "react";
import "./QuestionOverview.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import connection from "../../config.json";
import parse from "html-react-parser";
import RelativeTime from "@yaireo/relative-time";
import moment from "moment";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';

function QuestionOverview({ user }) {
  const relativeTime = new RelativeTime();
  const [question, setQuestion] = useState();
  const [usercomment, setComment] = useState();
  const [userdetails, setUserdetails] = useState();
  const [answers, setAnswers] = useState();
  const [answerBody, setAnswerBody] = useState();
  const [addCommentToQuestion, setAddCommentToQuestion] = useState(false);
  const [addCommentToAnswer, setAddCommentToAnswer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    axios
      .get(`${connection.connectionURL}/api/question/getQuestion/${id}`)
      .then((response) => {
        setQuestion(response?.data?.question);
        setUserdetails(response?.data?.userDetails);
        setAnswers(response?.data?.answers);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      ["link", "image", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  const postAnswer = () => {
    const answer = {
      userId: user?._id,
      questionId: question?._id,
      answerBody,
    };
    axios
      .post(`${connection.connectionURL}/api/answer/add-answer`, answer)
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
      answerId: id,
      commentBody: usercomment,
    };
    axios
      .post(`${connection.connectionURL}/api/answer/add-comment`, comment)
      .then((response) => {
        window.location.reload(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  const upvoteordownvoteQuestion = (param) => {
    axios
      .post(
        `${connection.connectionURL}/api/question/voteQuestion?upvote=${param}`,
        {
          userId: user?._id,
          questionId: question?._id,
        }
      )
      .then(() => {
        setQuestion({
          ...question,
          votes: param === 1 ? question?.votes + 1 : question?.votes - 1,
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  const upvoteordownvoteAnswer = (answerId, param) => {
    axios
      .post(
        `${connection.connectionURL}/api/answer/vote-answer?upvote=${param}`,
        {
          userId: user?._id,
          answerId,
        }
      )
      .then((response) => {
        const res = answers.map((i) => {
          if (i._id === answerId) {
            return { ...i, votes: param === 1 ? i.votes + 1 : i.votes - 1 };
          }
          return i;
        });
        setAnswers([...res]);
      })
      .catch((err) => {
        throw err;
      });
  };

  const markAnswerAsAsRight = (id) => {
    axios
      .post(`${connection.connectionURL}/api/answer/set-best-answer`, {
        questionId: question?._id,
        answerId: id,
      })
      .then((response) => {
        setAnswers([...response?.data?.data]);
      })
      .catch((err) => {
        throw err;
      });
  };

  const bookmarkQuestion = ()=>{
    axios
    .post(`${connection.connectionURL}/api/question/bookmark`, {
      questionId: question?._id,
      userId: user?._id,
    })
    .then((response) => {
      setUserdetails({...response?.data?.result});
    })
    .catch((err) => {
      throw err;
    });
  }

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
                className="vote-up-button voting-container-button"
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
                className="vote-down-button voting-container-button"
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

              <button className="bookmark-button voting-container-button" onClick={()=>{bookmarkQuestion()}}>
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

              <a className="post-issue-button mx-auto my-1" href="/">
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
            <div className="question-content">
              {parse(question?.questionbody || "")}
            </div>
            <div className="question-tags d-flex flex-wrap">
              {question?.tags?.map((tag) => (
                <a href="/" className="tag">
                  {tag?.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="question-overview-user-profile d-flex justify-content-between">
          <div className="ml-4">
            <button className="edit-question" onClick={()=>{
              navigate('/edit-question', { state: { question } });
            }}>
              edit question
            </button>
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
                  src="https://www.gravatar.com/avatar/d812ca76337577d1eefe44dc80877e6f?s=64&amp;d=identicon&amp;r=PG&amp;f=1"
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
            <li className="comment m-2">
              <div className="comment-text  js-comment-text-and-form">
                <div className="comment-body js-comment-edit-hide">
                  <span className="comment-copy">
                    Hi. Please take the time to read this post on
                  </span>

                  <div className="d-inline-flex align-items-center">
                    &nbsp;–&nbsp;
                    <a href="/" className="comment-user">
                      jezrael
                    </a>
                  </div>
                  <span className="comment-date">
                    <span>27 mins ago</span>
                  </span>
                </div>
              </div>
            </li>
            <li className="comment m-2">
              <div className="comment-text  js-comment-text-and-form">
                <div className="comment-body js-comment-edit-hide">
                  <span className="comment-copy">
                    Hi. Please take the time to read this post on
                  </span>

                  <div className="d-inline-flex align-items-center">
                    &nbsp;–&nbsp;
                    <a href="/" className="comment-user">
                      jezrael
                    </a>
                  </div>
                  <span className="comment-date">
                    <span>27 mins ago</span>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="add-comment-question mt-4">
          {!addCommentToQuestion && (
            <button
              className="add-comment-link"
              onClick={() => {
                setAddCommentToQuestion(true);
              }}
            >
              Add a comment
            </button>
          )}
          {addCommentToQuestion && (
            <div className="comment-wrapper row no-gutters mt-4">
              <div className="col-8 mr-2">
                <textarea className="w-100"></textarea>
              </div>
              <div className="col-2">
                <button
                  className="add-comment-button"
                  onClick={() => {
                    setAddCommentToQuestion(true);
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
                    className="vote-up-button voting-container-button"
                    onClick={() => {
                      upvoteordownvoteAnswer(answer?._id, 1);
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
                    className="vote-down-button voting-container-button"
                    onClick={() => {
                      upvoteordownvoteAnswer(answer?._id, 0);
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
                        markAnswerAsAsRight(answer?._id);
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

                  <a
                    className="post-issue-button mx-auto my-1"
                    href="/posts/71759002/timeline"
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
                      src="https://www.gravatar.com/avatar/d812ca76337577d1eefe44dc80877e6f?s=64&amp;d=identicon&amp;r=PG&amp;f=1"
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
                <li className="comment m-2">
                  <div className="comment-text  js-comment-text-and-form">
                    <div className="comment-body js-comment-edit-hide">
                      <span className="comment-copy">
                        Hi. Please take the time to read this post on
                      </span>

                      <div className="d-inline-flex align-items-center">
                        &nbsp;–&nbsp;
                        <a href="/" className="comment-user">
                          jezrael
                        </a>
                      </div>
                      <span className="comment-date">
                        <span>27 mins ago</span>
                      </span>
                    </div>
                  </div>
                </li>
                <li className="comment m-2">
                  <div className="comment-text  js-comment-text-and-form">
                    <div className="comment-body js-comment-edit-hide">
                      <span className="comment-copy">
                        Hi. Please take the time to read this post on
                      </span>

                      <div className="d-inline-flex align-items-center">
                        &nbsp;–&nbsp;
                        <a href="/" className="comment-user">
                          jezrael
                        </a>
                      </div>
                      <span className="comment-date">
                        <span>27 mins ago</span>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="add-comment-question mt-4 mb-2">
              {!addCommentToAnswer && (
                <button
                  className="add-comment-link"
                  onClick={() => {
                    setAddCommentToAnswer(true);
                  }}
                >
                  Add a comment
                </button>
              )}
              {addCommentToAnswer && (
                <div className="comment-wrapper row no-gutters mt-4">
                  <div className="col-8 mr-2">
                    <textarea
                      className="w-100"
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
                </div>
              )}
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
            modules={modules}
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
export default connect(mapStateToProps, null)(QuestionOverview);
