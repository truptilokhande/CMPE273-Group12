import React, { useCallback, useRef, useState } from "react";
import "./AskQuestion.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import ReactTags from "react-tag-autocomplete";
import axios from "axios";
import connection from "../../config.json";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';

function AskQuestion({ user, tagsFromStore }) {
  const navigate = useNavigate();
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
  const [title, setTitle] = useState();
  const [questionbody, setQuestionBody] = useState();
  const [tags, setTags] = useState([]);
  const [suggestions] = useState(
    tagsFromStore.map((tag) => {
      return {
        id: tag._id,
        name: tag.name,
      };
    })
  );

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

  const postQuestion = () => {
    axios.defaults.headers.common.authorization = localStorage.getItem("token");
    axios
      .post(`${connection.connectionURL}/api/question/addquestion`, {
        userId: user?._id,
        title,
        questionbody,
        tags,
      })
      .then((response) => {
        navigate(`/questionOverview/${response.data._id}`);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <>
      <h1 className="ask-question-heading">Ask a question</h1>
      <div className="ask-question-wrapper">
        <div className="d-flex flex-column p-4 title-wrapper pb-1">
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
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          {!title && (
            <div className="text-danger font-italic small">
              Please input valid email ID
            </div>
          )}
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
      <button
        className="ask-question-submit my-3"
        type="submit"
        onClick={() => {
          postQuestion();
        }}
      >
        Post Your Question
      </button>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  tagsFromStore: state.tags,
});

export default connect(mapStateToProps, null)(AskQuestion);
