import React, { useEffect, useState } from "react";
import connection from "../../config.json";
import axios from "axios";
import "./TagOverview.css";
import QuestionsWrapper from "../../containers/QuestionsWrapper/QuestionsWrapper";

function TagOverview() {
  const [questions, setQuestions] = useState();
  const [tag, setTag] = useState();
  // const [questionsCopy, setQuestionsCopy] = useState();

  useEffect(() => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    axios
      .get(
        `${connection.connectionURL}/api/tag/getAllQuestionWithSpecificTag/${id}`
      )
      .then((response) => {
        setQuestions(response?.data?.questions);
        setTag(response?.data?.tag);
        // setQuestionsCopy(response?.data?.userDetails);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between">
        <h1 className="fs-headline1"> Questions tagged [{tag?.name}]</h1>
      </div>
      <div>
        <p>{tag?.tagBody}</p>
      </div>

      <div className="d-flex align-items-end justify-content-between mb-3">
        <div className=""> {questions?.length} questions</div>
        <div className="d-flex flex-row filter-btn-wrappers mt-3">
          <div className="filter-btn">Interesting</div>
          <div className="filter-btn">Hot</div>
          <div className="filter-btn">Score</div>
          <div className="filter-btn fliter-btn-last">Unanswered</div>
        </div>
      </div>

      <QuestionsWrapper questions={questions} />
    </>
  );
}

export default TagOverview;
