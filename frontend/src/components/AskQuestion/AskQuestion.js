import React from "react";
import "./AskQuestion.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

function AskQuestion() {
  const modules = {
    toolbar: [
      //   [{ 'header': [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["link", "image", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  return (
    <>
      <h1 className="ask-question-heading">Ask a question</h1>
      <div className="ask-question-wrapper">
        <div className="d-flex flex-column p-4 title-wrapper">
          <div className="d-flex flex-column">
            <label className="ask-question-label mb-0">Title</label>
            <div className="ask-question-description">
              <label>
                Be specific and imagine you’re asking a question to another
                person.
              </label>
            </div>
          </div>
          <div className="d-flex position-relative">
            <input
              id="title"
              name="title"
              type="text"
              maxlength="300"
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              className="ask-question-input"
              value=""
              data-min-length="15"
              data-max-length="150"
            />
          </div>
          {/* <div className="flex--item s-input-message js-stacks-validation-message">
            Title must be at least 15 characters.
          </div> */}
        </div>

        <div className="d-flex flex-column p-4 ask-question-description-wrapper">
          <div className="d-flex flex-column">
            <label className="ask-question-label mb-0">
              What are the details of your problem?
            </label>
            <div className="ask-question-description">
              <label>
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </label>
            </div>
          </div>
          <div className="d-flex position-relative">
            <ReactQuill
              placeholder={"Write something awesome..."}
              modules={modules}
            />
          </div>
        </div>

        <div className="d-flex flex-column p-4 ask-question-tags-wrapper">
          <div className="d-flex flex-column">
            <label className="ask-question-label mb-0">Tags</label>
            <div className="ask-question-description">
              <label>
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions.
              </label>
            </div>
          </div>
          <div className="d-flex position-relative">
            <input
              id="title"
              name="title"
              type="text"
              maxlength="300"
              placeholder="e.g. (python css excel)"
              className="ask-question-input"
              value=""
              data-min-length="15"
              data-max-length="150"
            />
          </div>
        </div>
      </div>
      <button className="ask-question-submit my-3" type="submit">
        Post Your Question
      </button>
    </>
  );
}

export default AskQuestion;
