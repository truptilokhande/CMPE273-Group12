import React from "react";
import RelativeTime from "@yaireo/relative-time";

function QuestionsWrapper({ ...props }) {
  const relativeTime = new RelativeTime();
  const getTime = (createdTime, updatedTime) => {
    if (createdTime && updatedTime) {
      if (new Date(createdTime) < new Date(updatedTime)) {
        return relativeTime.from(new Date(updatedTime));
      }
      return relativeTime.from(new Date(createdTime));
    }
  };
  return (
    <>
      <div className="questions-wrapper move-left">
        {/* start iterating question  */}
        {props.questions?.map((question) => {
          return (
            <div className="question-summary" key={question?._id}>
              <div className="question-stats">
                <div className="question-votes">
                  <span className="question-votes-number">
                    {question.votes}
                  </span>
                  <span className="question-votes-text">votes</span>
                </div>
                {props?.answercount ? (
                  <div className="question-answers">
                    <span className="question-answers-number">
                      {props?.answercount?.filter(
                        (i) => i._id === question?._id
                      )[0]?.answerCount || 0}
                    </span>
                    <span className="question-answers-text">answers</span>
                  </div>
                ) : null}
                <div className="question-views">
                  <span className="question-views-number">
                    {question.views}
                  </span>
                  <span className="question-views-text">views</span>
                </div>
              </div>
              <div className="question-content">
                <h3 className="question-content-title">
                  <a
                    href={`/questionOverview/${question?._id}`}
                    className="question-link"
                  >
                    {question?.title}
                  </a>
                </h3>
                {/* <div className="question-content-summary">
                  {parse(question?.questionbody)}
                </div> */}
                <div className="question-content-meta-data d-flex align-item-center justify-content-between flex-wrap">
                  <div className="question-tags d-flex flex-wrap">
                    {question?.tags.map((tag) => (
                      <a href={`/tagOverview/${tag?.id}`} className="tag">
                        {tag?.name}
                      </a>
                    ))}
                    {/* tags iteration stop */}
                  </div>

                  <div className="question-user-card d-flex align-items-center p-0">
                    <a href="/" className="user-avatar">
                      <div className="avatar-wrapper">
                        <img
                          src={question?.user[0]?.profilepicture}
                          alt="user avatar"
                          width="16"
                          height="16"
                          className="avatar-image"
                        />
                      </div>
                    </a>

                    <div className="user-card-info">
                      <div className="user-link">
                        <a href="/">{question?.user[0]?.name}</a>
                      </div>
                    </div>

                    <time className="user-card-time">
                      {new Date(question.createdAt) <
                      new Date(question.updatedAt)
                        ? "updated"
                        : "asked"}
                      <span className="time ml-1">
                        {getTime(question?.createdAt, question?.updatedAt)}
                      </span>
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
