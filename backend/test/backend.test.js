const assert = require("assert");
const axios = require("axios");
const API = "http://52.201.233.203:3001";

describe("Array", () => {
  it("/signin", (done) => {
    axios
      .post(API + "/api/user/login", {
        email: "test@gmail.com",
        password: "test",
      })
      .then((response) => {
        assert.equal(response.status, 200);
        assert.equal(response.data.data.name, "test");
        assert.equal(response.data.data.email, "test@gmail.com");
        assert.notEqual(response.data.data.password, "test");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("/getQuestions", (done) => {
    axios
      .get(API + "/api/question/getQuestions")
      .then((response) => {
        assert.equal(response.status, 200);
        assert.equal(response.data.data.questions.length > 0, true);
        assert.equal(response.data.data.answercount.length > 0, true);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("/vote-answer", (done) => {
    axios
      .post(API + "/api/answer/vote-answer?upvote=1", {
        userId: "62675bd87312f57514b2f8cb",
        answerId: "62675ded7312f57514b2f8e4",
        title: "test",
      })
      .then((response) => {
        assert.equal(response.data.message, "Updated successfully");
        assert.equal(response.status, 200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("/getAlltags", (done) => {
    axios
      .get(API + "/api/tag/getAllTags")
      .then((response) => {
        assert.equal(response.data.tags.length > 0, true);
        assert.equal(response.data.taggedQuestionsCount.length > 0, true);
        assert.equal(response.status, 200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("/topTags", (done) => {
    axios
      .get(API + "/api/analytics/topTags")
      .then((response) => {
        assert.equal(response.status, 200);
        assert.equal(response.data.taggedQuestionsCount.length > 0, true);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
