import React, { useCallback, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./EditQuestion.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import ReactTags from "react-tag-autocomplete";
import { connect } from "react-redux";
import axios from "axios";
import connection from "../../config.json";
import { useNavigate } from 'react-router-dom';

function EditQuestion({ user, tagsFromStore, route }) {
  const modules = {
    toolbar: [
      //   [{ 'header': [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["link", "image", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };
  const reactTags = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const [question] = useState(location?.state?.question);
  const [title, setTitle] = useState(question?.title);
  const [questionbody, setQuestionBody] = useState(question?.questionbody);
  const [tags, setTags] = useState(question?.tags);
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

  const saveEdit = ()=>{
    const token = localStorage.getItem("token");
    axios
      .post(`${connection.connectionURL}/api/question/editquestion`, {
        questionId: question?._id,
        title,
        questionbody,
        tags,
      },
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        navigate(`/questionOverview/${response?.data?.data?._id}`);
      })
      .catch((err) => {
        throw err;
      });
  }

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
              defaultValue={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="d-flex flex-column p-4 ask-question-description-wrapper">
          <div className="d-flex flex-column">
            <label className="ask-question-label mb-0">Body</label>
          </div>
          <div className="d-flex position-relative">
            <ReactQuill
              placeholder={"Write something awesome..."}
              modules={modules}
              onChange={(val) => {
                setQuestionBody(val);
              }}
              value={questionbody}
            />
          </div>
        </div>

        <div className="d-flex flex-column p-4 ask-question-tags-wrapper">
          <div className="d-flex flex-column">
            <label className="ask-question-label mb-0">Tags</label>
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
      <button className="ask-question-submit my-3" type="submit" onClick={()=>{saveEdit()}}>
        Save edits
      </button>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  tagsFromStore: state.tags,
});

export default connect(mapStateToProps, null)(EditQuestion);
