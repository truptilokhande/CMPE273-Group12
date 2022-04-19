import React from "react";
import parse from 'html-react-parser'

function QuestionsWrapper(props) {
  console.log(props);
  return (
    <>
      <div className="questions-wrapper move-left">
        {/* start iterating question  */}
        {props.questions?.map((question) => {
          // console.log(question)
          return (
            <div className="question-summary">
              <div className="question-stats">
                <div className="question-votes">
                  <span className="question-votes-number">{question.votes}</span>
                  <span className="question-votes-text">votes</span>
                </div>
                <div className="question-answers">
                  <span className="question-answers-number">0</span>
                  <span className="question-answers-text">answers</span>
                </div>
                <div className="question-views">
                  <span className="question-views-number">{question.views}</span>
                  <span className="question-views-text">views</span>
                </div>
              </div>
              <div className="question-content">
                <h3 className="question-content-title">
                  <a href="/questionOverview" className="question-link">
                    {question?.title}
                  </a>
                </h3>
                <div className="question-content-summary">{parse(question?.questionbody)}</div>
                <div className="question-content-meta-data d-flex align-item-center justify-content-between flex-wrap">
                  <div className="question-tags d-flex flex-wrap">
                    {
                      question?.tags.map((tag)=>( <a href="/" className="tag">
                      {tag?.name}
                    </a>))
                    }
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
                      asked <span className="time">1 min ago</span>
                    </time>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* question iteration end */}
      </div>
    </>
  );
}

export default QuestionsWrapper;
