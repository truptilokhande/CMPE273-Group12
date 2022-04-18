import React, { useCallback, useRef, useState } from "react";
import "./AskQuestion.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import ReactTags from "react-tag-autocomplete";

function AskQuestion() {
  const quillOptions = {
    toolbar: [
      //   [{ 'header': [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["link", "image", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  const reactTags = useRef();
  const [tags, setTags] = useState([]);
  const [questionBody, setQuestionBody] = useState();
  console.log(questionBody);
  const [suggestions] = useState([
    { id: 1, name: "Apples" },
    { id: 2, name: "Pears" },
    { id: 3, name: "Bananas" },
    { id: 4, name: "Mangos" },
    { id: 5, name: "Lemons" },
    { id: 6, name: "Apricots" },
  ]);

  const onDelete = useCallback(
    (tagIndex) => {
      setTags(tags.filter((_, i) => i !== tagIndex));
    },
    [tags]
  );

  const onAddition = useCallback(
    (newTag) => {
      setTags([...tags, newTag]);
    },
    [tags]
  );

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
              modules={quillOptions}
              onChange={(val) => {
                setQuestionBody(val);
              }}
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
            {/* <input
              id="title"
              name="title"
              type="text"
              maxlength="300"
              placeholder="e.g. (python css excel)"
              className="ask-question-input"
            /> */}
            <ReactTags
              ref={reactTags}
              tags={tags}
              suggestions={suggestions}
              onDelete={onDelete}
              onAddition={onAddition}
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
