import React from "react";
import "./Homepage.css";
import QuestionsWrapper from "../../containers/QuestionsWrapper/QuestionsWrapper";

function Homepage() {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h1 className="fs-headline1">All Questions</h1>
        <div className="ml12 aside-cta flex--item print:d-none">
          <a href="/askQuestion" className="ask-btn">
            Ask Question
          </a>
        </div>
      </div>

      <div className="d-flex align-items-end justify-content-between mb-3">
        <div className="">22,412,082 questions</div>

        <div className="d-flex flex-row filter-btn-wrapper mt-3">
          <div className="filter-btn">Interesting</div>
          <div className="filter-btn">Hot</div>
          <div className="filter-btn">Score</div>
          <div className="filter-btn fliter-btn-last">Unanswered</div>
        </div>
      </div>

      <QuestionsWrapper />
    </>
  );
}

export default Homepage;
