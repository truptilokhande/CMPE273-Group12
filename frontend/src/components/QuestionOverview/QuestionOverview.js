import React, { useState } from "react";
import "./QuestionOverview.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

function QuestionOverview() {
  const [addCommentToQuestion, setAddCommentToQuestion] = useState(false);
  const [addCommentToAnswer, setAddCommentToAnswer] = useState(false);
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      ["link", "image", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  return (
    <>
      <div className="question">
        <div className="d-flex justify-content-between">
          <h1 className="fs-headline1">
            What are the differences among below topics?
          </h1>
        </div>

        <div className="d-flex align-items-end  mb-3 question-overview-data-wrapper">
          <div className="mr-4 mb-2">
            <span className="light-text mr-1">Asked</span>
            <time>today</time>
          </div>
          <div className="mr-4 mb-2">
            <span className="light-text mr-1">Modified</span>
            today
          </div>
          <div className="mr-4 mb-2">
            <span className="light-text mr-1">Viewed</span>
            17 times
          </div>
        </div>

        <div className="post-layout d-flex row no-gutters">
          <div className="vote-cell col-1">
            <div className="voting-container d-flex justify-content-center flex-column align-items-stretch">
              <button className="vote-up-button voting-container-button">
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
                0
              </div>

              <button className="vote-down-button voting-container-button">
                <svg
                  className="svg-icon iconArrowDownLg"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                >
                  <path d="M2 11h32L18 27 2 11Z"></path>
                </svg>
              </button>

              <button className="bookmark-button voting-container-button">
                <svg
                  aria-hidden="true"
                  className="svg-icon iconBookmark"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M6 1a2 2 0 0 0-2 2v14l5-4 5 4V3a2 2 0 0 0-2-2H6Zm3.9 3.83h2.9l-2.35 1.7.9 2.77L9 7.59l-2.35 1.7.9-2.76-2.35-1.7h2.9L9 2.06l.9 2.77Z"></path>
                </svg>
              </button>

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
            <div className="question-content">d</div>
            <div className="question-tags d-flex flex-wrap">
              {/* tags iteration start */}
              <a href="/" className="tag">
                debugging
              </a>{" "}
              <a href="/" className="tag">
                code-analysis
              </a>{" "}
              {/* tags iteration stop */}
            </div>
          </div>
        </div>

        <div className="question-overview-user-profile d-flex justify-content-between">
          <div className="ml-4">
            <a className="edit-question" href="/edit-question">
              edit question
            </a>
          </div>

          <div className="user-info-wrapper">
            <div className="user-info">
              <div className="user-action-time">
                <span>12:32 02-01-2022</span>
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
                <a href="/">Andrew Wynn</a>
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
          <h5>1 Answer</h5>
        </div>
        {/* iterate answer */}
        <div className="answer-wrapper">
          <div className="post-layout d-flex row no-gutters mt-4">
            <div className="vote-cell col-1">
              <div className="voting-container d-flex justify-content-center flex-column align-items-stretch">
                <button className="vote-up-button voting-container-button">
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
                  0
                </div>

                <button className="vote-down-button voting-container-button">
                  <svg
                    className="svg-icon iconArrowDownLg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                  >
                    <path d="M2 11h32L18 27 2 11Z"></path>
                  </svg>
                </button>

                <div className="text-center correct-answer">
                  <svg
                    aria-hidden="true"
                    className="svg-icon iconCheckmarkLg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                  >
                    <path d="m6 14 8 8L30 6v8L14 30l-8-8v-8Z"></path>
                  </svg>
                </div>

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
              <div className="question-content">d</div>
              <div className="question-tags d-flex flex-wrap">
                {/* tags iteration start */}
                <a href="/" className="tag">
                  debugging
                </a>{" "}
                <a href="/" className="tag">
                  code-analysis
                </a>{" "}
                {/* tags iteration stop */}
              </div>
            </div>
          </div>

          <div className="question-answer-user-profile d-flex justify-content-end">
            <div className="user-info-wrapper">
              <div className="user-info">
                <div className="user-action-time">
                  <span>12:32 02-01-2022</span>
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
                  <a href="/">Andrew Wynn</a>
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
                  <textarea className="w-100"></textarea>
                </div>
                <div className="col-2">
                  <button className="add-comment-button">Add a comment</button>
                </div>
              </div>
            )}
          </div>
        </div>

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
          />
        </div>
      </div>

      <div className="post-answer">
        <button className="ask-question-submit my-3" type="submit">
          Post Your Answer
        </button>
      </div>
    </>
  );
}

export default QuestionOverview;
