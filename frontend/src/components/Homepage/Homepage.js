import React, { useEffect, useState } from "react";
import "./Homepage.css";
import axios from "axios";
import QuestionsWrapper from "../../containers/QuestionsWrapper/QuestionsWrapper";
import connection from "../../config.json";
import { connect } from "react-redux";
import { getTags } from "../../store/thunk/thunk";

function Homepage({ setTagsInstore, isAuthenticated }) {
  const [questions, setQuestions] = useState();
  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/question/getQuestions`)
      .then((response) => {
        setQuestions(response?.data?.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    setTagsInstore();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h1 className="fs-headline1">All Questions</h1>
        {isAuthenticated ? (
          <div>
            <a href="/askQuestion" className="ask-btn">
              Ask Question
            </a>
          </div>
        ) : null}
      </div>

      <div className="d-flex align-items-end justify-content-between mb-3">
        <div className=""> {questions?.length} questions</div>

        <div className="d-flex flex-row filter-btn-wrapper mt-3">
          <div className="filter-btn">Interesting</div>
          <div className="filter-btn">Hot</div>
          <div className="filter-btn">Score</div>
          <div className="filter-btn fliter-btn-last">Unanswered</div>
        </div>
      </div>

      <QuestionsWrapper questions={questions}/>
    </>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  setTagsInstore: (val) => dispatch(getTags(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
