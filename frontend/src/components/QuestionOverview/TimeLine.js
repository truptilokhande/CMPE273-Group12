import React, { useEffect, useState } from "react";
import connection from "../../config.json";
import axios from "axios";
import "./TimeLine.css";
import parse from "html-react-parser";
import RelativeTime from "@yaireo/relative-time";

function TimeLine() {
  const relativeTime = new RelativeTime();

  useEffect(() => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    axios
      .get(`${connection.connectionURL}/api/question/getHistories/${id}`)
      .then((response) => {
        setLogs(response?.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const [logs, setLogs] = useState();

  return (
    <div className="timeline">
      <div className="timeline-content">
        <h1>
          Timeline for <a href="/">question title</a>
        </h1>
      </div>
      <div className="timeline-eventFilters">
        <h2>Event filters</h2>
      </div>
      <div className="timeline-event mb-3"> 1 event</div>
      <div className="timeline-eventTable">
        <table className="table-header">
          <thead>
            <tr>
              <th>when</th>
              <th>what</th>
              <th>by</th>
              <th>content</th>
            </tr>
            {logs?.map((log) => (
              <tr>
                <td className="p-2">
                  {relativeTime.from(new Date(log?.created))}
                </td>
                <td>{log?.what}</td>
                <td>{log?.user?.name}</td>
                <td>{parse(log?.content)}</td>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    </div>
  );
}

export default TimeLine;
