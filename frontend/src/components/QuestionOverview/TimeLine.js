import React from "react";
import "./TimeLine.css";

function TimeLine() {
  return (
    <div className="timeline">
      <div className="timeline-content">
        <h1>
          Timeline for <a>Question from backend</a>
        </h1>
        <h2>
          Current License: <a>Question from backend</a>
        </h2>
      </div>
      <div className="timeline-eventFilters">
        <h2>Event filters</h2>
        <div className="timeline-btn">
          <button className="timeline-hide-btn">Hide vote summaries</button>
          <button className="timeline-show-btn">Show vote summeries</button>
        </div>
      </div>
      <div className="timeline-event"> 1 event</div>
      <div className="timeline-eventTable">
        <table className="table-header">
          <thead>
            <tr>
              <th>
                " when "<a>toggle format</a>
              </th>
              <th>what</th>
              <th></th>
              <th>by</th>
              <th>license</th>
              <th>comment</th>
            </tr>

            <tr>
              <th>
                " when "<a>toggle format</a>
              </th>
              <th>what</th>
              <th></th>
              <th>by</th>
              <th>license</th>
              <th>comment</th>
            </tr>
            <tbody></tbody>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default TimeLine;
