import React from "react";
import "./EditQuestion.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

function EditQuestion() {
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
      <div className="ask-question-wrapper">
        <div className="d-flex flex-column p-4 title-wrapper">
          <div className="d-flex flex-column">
            <label className="ask-question-label mb-0">Title</label>
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
        </div>

        <div className="d-flex flex-column p-4 ask-question-description-wrapper">
          <div className="d-flex flex-column">
            <label className="ask-question-label mb-0">
              Body
            </label>
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
        Save edits
      </button>
    </>
  );
}

export default EditQuestion;
