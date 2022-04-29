import React, { useState } from "react";
import axios from "axios";
import connection from "../../config.json";
import { Navigate } from "react-router";

function Addtag() {
  const [tagTitle, setTagTitle] = useState();
  const [tagDescription, setTagDescription] = useState();

  const handleAddTag = () => {
    console.log("Handling add tag");
    console.log(tagTitle);
    console.log(tagDescription);

    axios
      .post(`${connection.connectionURL}/api/tag/addTag`, {
        tagTitle,
        tagDescription,
      })
      .then((response) => {
        console.log(response);
        Navigate("/tags")
      });
  };
  return (
    <div>
      <h2>Add a Tag</h2>
      <div className="d-flex position-relative">
        <label>Tag Name :</label>
        <input
          id="tagitle"
          name="tagtitle"
          type="text"
          maxlength="300"
          placeholder="python"
          className="tagtitle"
          style={{ marginLeft: "20px" }}
          data-min-length="15"
          data-max-length="150"
          onChange={(e) => setTagTitle(e.target.value)}
        />
      </div>

      <div>
        <label>Tag descrption :</label>
        <input
          id="tagdescription"
          name="tagdescription"
          type="textarea"
          length="300px"
          className="tagdescription"
          data-min-length="15"
          data-max-length="150"
          style={{ margin: "20px" }}
          onChange={(e) => setTagDescription(e.target.value)}
        />
      </div>
      <button
        onClick={handleAddTag}
        type="submit"
        className="addtag"
        style={{ borderRadius: "5px" }}
      >
        submit
      </button>
    </div>
  );
}

export default Addtag;
