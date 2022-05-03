const rpc = new (require("../kafka/kafkaRequest"))();
const maxAge = 3 * 24 * 60 * 60;

const writeRequest = (req, res, path, topic) => {
  const message = {
    path: path,
    body: req?.body,
    params: req?.params,
    file: req?.file,
    query: req?.query,
  };
  rpc.makeRequest(topic, message, (err, results) => {
    console.log("test");
    if (err) {
      res.status(400).send("error retriving products");
    } else {
      if (path === "signin") {
        res.cookie("jwt_token", results.token1, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
      }
      res.status(200).send(results);
    }
  });
};

module.exports = {
  writeRequest,
};
