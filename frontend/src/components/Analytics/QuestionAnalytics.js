import React, { useState, useEffect } from "react";
import LineChart from "./LineChart";
import { QuestionsData } from "./Data";
import connection from "../../config.json";
import axios from "axios";

function QuestionAnalytics() {
  const [questionsPerDay, setQuestionsPerDay] = useState([]);
  const [dates, setDates] = useState([]);
  const [count, setCount] = useState([]);
  const [questionsData, setQuestionsData] = useState(false);
  const token = localStorage.getItem("token");
  let data = [];

  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/analytics/questionsPostedPerDay`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        data = response?.data?.data?.result;
        setQuestionsPerDay(response?.data?.data?.result);

        setQuestionsData({
          labels: data.map((res) => res.date),
          datasets: [
            {
              label: "Questions per day",
              data: data.map((res) => res.count),
              backgroundColor: ["rgb(244, 130, 37)"],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        });
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <>
      <h2>Questions posted per day</h2>
      {questionsData && (
        <div style={{ width: "700px" }}>
          <LineChart chartData={questionsData}></LineChart>
        </div>
      )}
    </>
  );
}

export default QuestionAnalytics;
