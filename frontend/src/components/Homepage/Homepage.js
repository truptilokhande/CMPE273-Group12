import React, { useEffect, useState } from "react";
import "./Homepage.css";
import axios from "axios";
import QuestionsWrapper from "../../containers/QuestionsWrapper/QuestionsWrapper";
import connection from "../../config.json";
import { connect } from "react-redux";
import { getTags } from "../../store/thunk/thunk";

function Homepage({ setTagsInstore, isAuthenticated, user }) {
  // maintaing two copies of questions, one is used to sort and filter the questions and other has orginal set of questions.
  const [questions, setQuestions] = useState();
  const [questionsCopy, setQuestionsCopy] = useState(questions);
  const [answercount, setAnswerCount] = useState();
  const [sort, setSort] = useState();

  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/question/getQuestions`)
      .then((response) => {
        // filtering out questions which are waiting for approval and not posted by current user.
        const filteredQuestions = response?.data?.data?.questions?.filter(
          (question) =>
            !(
              question.waitingForApproval === true &&
              question?.user[0]?._id !== user?._id
            )
        );
        setQuestions(filteredQuestions);
        setQuestionsCopy(filteredQuestions);
        setAnswerCount(response?.data?.data?.answercount);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    setTagsInstore();
  }, []);

  const sortQuestions = (criteria) => {
    if (criteria === "interesting") {
      const sortedQuestions = questions.sort(function (a, b) {
        const t1 =
          new Date(a.createdAt) < new Date(a.updatedAt)
            ? new Date(a.updatedAt)
            : new Date(a.createdAt);
        const t2 =
          new Date(b.createdAt) < new Date(b.updatedAt)
            ? new Date(b.updatedAt)
            : new Date(b.createdAt);
        return t2 - t1;
      });
      setQuestionsCopy([...sortedQuestions]);
      setSort("interesting");
    }
    if (criteria === "hot") {
      const sortedQuestions = questions.sort(function (a, b) {
        return b.views - a.views;
      });
      setQuestionsCopy([...sortedQuestions]);
      setSort("hot");
    }
    if (criteria === "score") {
      const sortedQuestions = questions.sort(function (a, b) {
        return b.votes - a.votes;
      });
      setQuestionsCopy([...sortedQuestions]);
      setSort("score");
    }
    if (criteria === "unanswered") {
      const unanswered = questions.filter((question) => {
        const answerscount =
          answercount?.filter((i) => i._id === question?._id)[0]?.answerCount ||
          0;
        return !answerscount;
      });
      const sortedQuestions = unanswered.sort(function (a, b) {
        return b.votes - a.votes;
      });
      setQuestionsCopy([...sortedQuestions]);
      setSort("unanswered");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h1 className="fs-headline1">All Questions</h1>
        <div>
          <a
            href={isAuthenticated ? "/askQuestion" : "/signin"}
            className="ask-btn"
          >
            Ask Question
          </a>
        </div>
      </div>

      <div className="d-flex align-items-end justify-content-between mb-3">
        <div className=""> {questionsCopy?.length} questions</div>

        <div className="d-flex flex-row filter-btn-wrappers mt-3">
          <div
            className={`filter-btn ${sort === "interesting" ? "active" : ""}`}
            onClick={() => {
              sortQuestions("interesting");
            }}
          >
            Interesting
          </div>
          <div
            className={`filter-btn ${sort === "hot" ? "active" : ""}`}
            onClick={() => {
              sortQuestions("hot");
            }}
          >
            Hot
          </div>
          <div
            className={`filter-btn ${sort === "score" ? "active" : ""}`}
            onClick={() => {
              sortQuestions("score");
            }}
          >
            Score
          </div>
          <div
            className={`filter-btn fliter-btn-last ${
              sort === "unanswered" ? "active" : ""
            }`}
            onClick={() => {
              sortQuestions("unanswered");
            }}
          >
            Unanswered
          </div>
        </div>
      </div>

      <QuestionsWrapper questions={questionsCopy} answercount={answercount} />
    </>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setTagsInstore: (val) => dispatch(getTags(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
