import React from "react";
import "./Homepage.css";

function App() {
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

      <div className="questions-wrapper move-left">
         {/* start iterating question  */}
        <div className="question-summary">
          <div className="question-stats">
            <div className="question-votes">
              <span className="question-votes-number">0</span>
              <span className="question-votes-text">votes</span>
            </div>
            <div className="question-answers">
              <span className="question-answers-number">0</span>
              <span className="question-answers-text">answers</span>
            </div>
            <div className="question-views">
              <span className="question-views-number">2</span>
              <span className="question-views-text">views</span>
            </div>
          </div>
          <div className="question-content">
            <h3 className="question-content-title">
              <a href="/" className="question-link">
                What are the differences among below topics?
              </a>
            </h3>
            <div className="question-content-summary">
              Static code analysis, dynamic code analysis, static testing,
              dynamic testing, Dynamic security testing (DAST), Static security
              testing (SAST), debugging, static binary testing, and dynamic
              binary ...
            </div>
            <div className="question-content-meta-data d-flex align-item-center justify-content-between flex-wrap">
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

              <div className="question-user-card d-flex align-items-center p-0">
                <a href="/" className="user-avatar">
                  {" "}
                  <div className="avatar-wrapper">
                    <img
                      src="https://lh3.googleusercontent.com/a-/AOh14Gjb-jYzr-dJrhzggih4y7UD7vp0E54gYkwCGkhF=k-s32"
                      alt="user avatar"
                      width="16"
                      height="16"
                      className="avatar-image"
                    />
                  </div>
                </a>

                <div className="user-card-info">
                  <div className="user-link">
                    <a href="/">Hamidullah Muslih</a>
                  </div>
                </div>

                <time className="user-card-time">
                  asked{" "}
                  <span className="time">
                    1 min ago
                  </span>
                </time>
              </div>
            </div>
          </div>
        </div>
        {/* question iteration end */}
      </div>
    </>
  );
}

export default App;
