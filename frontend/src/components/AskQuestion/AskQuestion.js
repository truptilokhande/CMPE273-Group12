/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState, useMemo } from "react";
import "./AskQuestion.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import ReactTags from "react-tag-autocomplete";
import axios from "axios";
import connection from "../../config.json";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import S3FileUpload from "react-s3";

window.Buffer = window.Buffer || require("buffer").Buffer;

function AskQuestion({ user, tagsFromStore }) {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const saveToServer = (file) => {
    const config = {
      accessKeyId: "AKIA2WX32KIUACMHTCOR",
      secretAccessKey: "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",
      region: "us-west-1",
      bucketName: "etsy-lab2",
    };
    S3FileUpload.uploadFile(file, config)
      .then(async (res) => {
        console.log(res);
        editorRef.current.getEditor().insertEmbed(null, "image", res?.location);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const imageHandler = () => {
    console.log("first");
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  };
  const quillOptions = useMemo(
    () => ({
      toolbar: {
        container: [
          //   [{ 'header': [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["link", "image", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );
  const reactTags = useRef();
  const [title, setTitle] = useState();
  const [questionbody, setQuestionBody] = useState();
  const [tags, setTags] = useState([]);
  const [suggestions] = useState(
    tagsFromStore?.map((tag) => {
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
    const token = localStorage.getItem("token");
    axios
      .post(
        `${connection.connectionURL}/api/question/addquestion`,
        {
          userId: user?._id,
          title,
          questionbody,
          tags,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        navigate(`/questionOverview/${response?.data?.data?._id}`);
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
              maxLength="300"
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
              ref={editorRef}
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
