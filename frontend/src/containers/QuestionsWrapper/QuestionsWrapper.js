import React from "react";

function QuestionsWrapper() {
  return (
    <>
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
              <a href="/questionOverview" className="question-link">
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

export default QuestionsWrapper;