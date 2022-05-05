const crypto = require("crypto");
const connection = require("./connection");

module.exports = class KafkaRPC {
  constructor() {
    this.requests = {}; // hash to store request in wait for response
    this.response_queue = false; // placeholder for the future queue
  }

  makeRequest(topic_name, content, callback) {
    console.log("request made to topic " + topic_name);
    //generate a unique correlation id for this call
    const correlationId = crypto.randomBytes(16).toString("hex");
    // creating consumer to subscribe to the topic to receive response.
    const consumer = connection.getConsumer("response_topic");
    // creating producer and writing request on to the producer
    const producer = connection.getProducer();

    //create a timeout for what should happen if we don't get a response
    const tId = setTimeout(
      (corr_id) => {
        //if this ever gets called that means we didn't receive the response.
        //delete the entry from hash and reject the promise
        callback(new Error("timeout " + corr_id));
        delete this.requests[corr_id];
      },
      180000,
      correlationId
    );

    //create a request entry to store in a hash and putting the entry into the hash so we can match the response later
    const entry = {
      timeout: tId, //the id for the timeout so we can clear it
      callback: callback,
    };
    this.requests[correlationId] = entry;

    // setting up consumer to read after request is written on to the topic.
    if (!this.response_queue) {
      consumer.on("message", (message) => {
        console.log("msg received");
        // read the message (response)
        const data = JSON.parse(message.value);

        //get the correlationId
        const correlationId = data.correlationId;

        // clearing the timeout and removing from the response wait queue
        if (correlationId in this.requests) {
          //retrieve the request entry
          const entry = this.requests[correlationId];
          //make sure we don't timeout by clearing it
          clearTimeout(entry.timeout);
          //delete the entry from hash
          delete this.requests[correlationId];
          entry.callback(data.error, data.data);
        }
      });
      this.response_queue = true;
    }

    // preparing the request to be written on to the topic
    const payloads = [
      {
        topic: topic_name,
        messages: JSON.stringify({
          correlationId: correlationId,
          replyTo: "response_topic",
          data: content,
        }),
        partition: 0,
      },
    ];
    // writing request to the topic
    producer.send(payloads, (err, data) => {
      console.log("sending request from producer", payloads);
      if (err) console.log(err);
      console.log(data);
    });
  }
};
