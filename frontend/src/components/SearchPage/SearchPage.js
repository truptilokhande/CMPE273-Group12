import React, { useEffect, useState } from "react";
import "./SearchPage.css";
import QuestionsWrapper from "../../containers/QuestionsWrapper/QuestionsWrapper";
import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();
  const [questions] = useState([...location?.state?.questions]);
  console.log(questions);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h1 className="fs-headline1">Search results</h1>
      </div>

      <div className="d-flex align-items-end justify-content-between mb-3">
        <div className="">22,412,082 questions</div>

        <div className="d-flex flex-row filter-btn-wrappers mt-3">
          <div className="filter-btn">Interesting</div>
          <div className="filter-btn">Hot</div>
          <div className="filter-btn">Score</div>
          <div className="filter-btn fliter-btn-last">Unanswered</div>
        </div>
      </div>

      <QuestionsWrapper questions={[...questions]} />
    </>
  );
}

export default Search;
