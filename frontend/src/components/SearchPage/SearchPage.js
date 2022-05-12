import React, { useState } from "react";
import "./SearchPage.css";
import QuestionsWrapper from "../../containers/QuestionsWrapper/QuestionsWrapper";
import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();
  const [questions] = useState([...location?.state?.questions]);
  const [questionsCopy, setQuestionsCopy] = useState([
    ...location?.state?.questions,
  ]);
  const [sort, setSort] = useState();

  const sortQuestions = (criteria) => {
    if (criteria === "interesting") {
      const sortedQuestions = questions.sort(function (a, b) {
        const t1 =
          new Date(a.createdAt) < new Date(a.updatedAt)
            ? new Date(a.updatedAt)
            : new Date(a.createdAt);
        const t2 =
          new Date(a.createdAt) < new Date(b.updatedAt)
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
    // if (criteria === "unanswered") {
    //   const unanswered = questions.filter((question) => {
    //     const answerscount =
    //       answercount?.filter((i) => i._id === question?._id)[0]?.answerCount ||
    //       0;
    //     return !answerscount;
    //   });
    //   const sortedQuestions = unanswered.sort(function (a, b) {
    //     return b.votes - a.votes;
    //   });
    //   setQuestionsCopy([...sortedQuestions]);
    //   setSort("unanswered");
    // }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h1 className="fs-headline1">Search results</h1>
      </div>
      {questions.length === 0 ? <div>No Results!</div> : null}

      <div className="d-flex align-items-end justify-content-between mb-3">
        <div className="">{questionsCopy.length} questions</div>

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
            className={`filter-btn fliter-btn-last ${
              sort === "score" ? "active" : ""
            }`}
            onClick={() => {
              sortQuestions("score");
            }}
          >
            Score
          </div>
          {/* <div
            className={`filter-btn fliter-btn-last ${
              sort === "unanswered" ? "active" : ""
            }`}
            onClick={() => {
              sortQuestions("unanswered");
            }}
          >
            Unanswered
          </div> */}
        </div>
      </div>

      <QuestionsWrapper questions={[...questions]} />
    </>
  );
}

export default Search;
