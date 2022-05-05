const { createClient } = require("redis");
let client = "";

const connect = async () => {
  client = createClient({ url: "redis://127.0.0.1:6379" });
  client.on("error", (err) => console.log("edis client error", err));
  await client.connect();
};

connect();
module.exports = client;