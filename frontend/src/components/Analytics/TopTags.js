import React, { useEffect, useState } from "react";
import axios from "axios";
import connection from "../../config.json";

function TopTags() {
  const [tags, setTags] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/analytics/topTags`,
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        console.log(response?.data);
        setTags(response?.data?.taggedQuestionsCount);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <>
      <h2>Most used tags</h2>
      <div className="tags">
        <div className="tags-wrapper row no-gutters">
          {/* start iterating tags  */}
          {tags?.map((tag) => (
            <div className="col-3 d-flex flex-column tag-card">
              <div className="tag-content-wrapper">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="">
                    <a href={`/tagOverview/${tag?._id}`} className="tag">
                      {tag?.name}
                    </a>
                  </div>
                </div>

                <div className="mb-3 tag-content">{tag?.tagBody}</div>

                <div className="d-flex row no-gutters justify-content-between tag-meta-data">
                  <div className="col-15">
                    {tag.count === 1 ? (
                      <label>
                        {tag.count} &nbsp; question asked using this tag
                      </label>
                    ) : (
                      <label>
                        {" "}
                        {tag.count} &nbsp; questions asked using this tag
                      </label>
                    )}
                  </div>
                  <div className="col-6">
                    <span>
                      {/* {taggedQuestionsCountInAday?.find(
                        (item) => item._id === tag?._id
                      )?.count || 0} */}
                      {/* &nbsp; asked today, &nbsp; */}
                    </span>
                    <span>
                      {/* {taggedQuestionsCountInAWeek?.find(
                        (item) => item._id === tag?._id
                      )?.count || 0} */}
                      {/* &nbsp; this week */}
                    </span>
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

export default TopTags;
