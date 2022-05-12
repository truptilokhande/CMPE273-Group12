/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Tags.css";
import axios from "axios";
import connection from "../../config.json";

function Tags() {
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  const [tags, setTags] = useState();
  const [tagsInitial, setTagsInitial] = useState();
  const [taggedQuestionsCount, setTagsCount] = useState();
  const [taggedQuestionsCountInAday, setTagsCountInADay] = useState();
  const [taggedQuestionsCountInAWeek, setTagsCountInAWeek] = useState();

  useEffect(() => {
    if (!searchTerm && !tagsInitial) return;
    const delayDebounceFn = setTimeout(() => {
      // if (searchTerm.length < 4) return;
      const filteredTags = tagsInitial?.filter((i) =>
        i.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setTags(filteredTags);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/tag/getAllTags`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTags(response?.data?.data?.tags);
        setTagsInitial(response?.data?.data?.tags);
        setTagsCount(response?.data?.data?.taggedQuestionsCount);
        setTagsCountInADay(response?.data?.data?.questionsTaggedInADay);
        setTagsCountInAWeek(response?.data?.data?.questionsTaggedInAWeek);
        sortTags("popular");
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const [sort, setSort] = useState("popular");

  const sortTags = (criteria) => {
    if (criteria === "popular") {
      if (!tagsInitial) return;
      const sortedTags = tagsInitial?.sort(function (a, b) {
        const acount =
          taggedQuestionsCount?.find((item) => item._id === a?._id)?.count || 0;
        const bcount =
          taggedQuestionsCount?.find((item) => item._id === b?._id)?.count || 0;
        return bcount - acount;
      });
      setTags([...sortedTags]);
      setSort("popular");
    }
    if (criteria === "name") {
      const sortedTags = tagsInitial.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      setTags([...sortedTags]);
      setSort("name");
    }
    if (criteria === "new") {
      const sortedTags = tagsInitial.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setTags([...sortedTags]);
      setSort("new");
    }
  };

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
          autoComplete="off"
          name="tagfilter"
          type="text"
          maxLength="35"
          placeholder="Filter by tag name"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="d-flex flex-row filter-btn-wrappers mt-3">
          <div
            className={`filter-btn ${sort === "popular" ? "active" : ""}`}
            onClick={() => {
              sortTags("popular");
            }}
          >
            Popular
          </div>
          <div
            className={`filter-btn ${sort === "name" ? "active" : ""}`}
            onClick={() => {
              sortTags("name");
            }}
          >
            Name
          </div>
          <div
            className={`filter-btn fliter-btn-last ${
              sort === "new" ? "active" : ""
            }`}
            onClick={() => {
              sortTags("new");
            }}
          >
            New
          </div>
        </div>
      </div>

      <div className="tags tags-page">
        <div className="tags-wrapper row no-gutters pl-4">
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
                  <div className="col-6 pl-2">
                    {taggedQuestionsCount?.find((item) => item._id === tag?._id)
                      ?.count || 0}
                    &nbsp; questions
                  </div>
                  <div className="col-6">
                    <span>
                      {taggedQuestionsCountInAday?.find(
                        (item) => item._id === tag?._id
                      )?.count || 0}
                      &nbsp; asked today, &nbsp;
                    </span>
                    <span>
                      {taggedQuestionsCountInAWeek?.find(
                        (item) => item._id === tag?._id
                      )?.count || 0}
                      &nbsp; this week
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

export default Tags;
