import React, { useEffect, useState } from "react";
import "./Tags.css";
import axios from "axios";
import connection from "../../config.json";

function Tags() {
  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/tag/getAllTags`)
      .then((response) => {
        setTags(response?.data?.tags);
        setTagsCount(response?.data?.taggedQuestionsCount);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const [tags, setTags] = useState();
  const [taggedQuestionsCount, setTagsCount] = useState();

  // const result = taggedQuestionsCount?.find((id)=>id===tag?._id)?.count
  // console.log(result)

  return (
    <>
      <div className="d-flex">
        <h1 className="fs-headline1">Tags</h1>
      </div>
      <p className="heading-body">
        A tag is a keyword or label that categorizes your question with other,
        similar questions. Using the right tags makes it easier for others to
        find and answer your question.
      </p>
      <div className="d-flex align-items-end justify-content-between mb-3">
        <input
          className="tags-search-input"
          autocomplete="off"
          name="tagfilter"
          type="text"
          maxlength="35"
          placeholder="Filter by tag name"
        />

        <div className="d-flex flex-row filter-btn-wrappers mt-3">
          <div className="filter-btn">Popular</div>
          <div className="filter-btn">Name</div>
          <div className="filter-btn fliter-btn-last">New</div>
        </div>
      </div>

      <div className="tags">
        <div className="tags-wrapper row no-gutters">
          {/* start iterating tags  */}
          {tags?.map((tag) => (
            <div className="col-3 d-flex flex-column tag-card">
              <div className="tag-content-wrapper">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="">
                    <a href="/tagOverview" className="tag">
                      {tag?.name}
                    </a>
                  </div>
                </div>

                <div className="mb-3 tag-content">{tag?.tagBody}</div>

                <div className="d-flex row no-gutters justify-content-between tag-meta-data">
                  <div className="col-6">{taggedQuestionsCount?.find((item)=>item._id===tag?._id)?.count || 0} questions</div>
                  <div className="col-6">
                    {" "}
                    <span>759 asked today</span>, <span>4450 this week</span>{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* tags iteration end */}
        </div>
      </div>
    </>
  );
}

export default Tags;
