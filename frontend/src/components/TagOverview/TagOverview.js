import React from "react";
import "./TagOverview.css";
import QuestionsWrapper from "../../containers/QuestionsWrapper/QuestionsWrapper";

function TagOverview() {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h1 className="fs-headline1"> Questions tagged [tagname]</h1>
      </div>

      <div className="d-flex align-items-end justify-content-end mb-3">

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

export default TagOverview;
