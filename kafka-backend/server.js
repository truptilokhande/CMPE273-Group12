var connection = new require("./kafka/Connection");
const mysql = require("mysql");

//topics files
//var signin = require('./services/signin.js');

const questionController = require("./services/question.controller");
const answerController = require("./services/answer.controller");
const tagController = require("./services/tag.controller");
const userController=require("./services/user.controller");
const constants = require("./config/config.json");
const messageController=require("./services/message.controller");

// var createShop = require("./services/createShop");
// var signIn = require("./services/signin");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const connectDB = require("./database/connection.js");
connectDB();

const handleTopicRequest = (topic_name, controller) => {
  // initiate producer and consumer
  const consumer = connection.getConsumer(topic_name);
  const producer = connection.getProducer();

  consumer.on("message", async (message) => {
    console.log("request received", message);
    const data = JSON.parse(message.value);

    console.log("service method called to process request");
    const resultAfterExecutingService = await controller.handle_request(
      data.data
    );

    const payloads = [
      {
        topic: data.replyTo,
        messages: JSON.stringify({
          correlationId: data.correlationId,
          data: resultAfterExecutingService,
        }),
        partition: 0,
      },
    ];

    producer.send(payloads, (err, data) => {
      console.log("sending response / writing response on topic", payloads);
      console.log(data);
    });
  });
};
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

handleTopicRequest("answer", answerController);
handleTopicRequest("question", questionController);
handleTopicRequest("tags", tagController);
handleTopicRequest("user",userController);
handleTopicRequest("message",messageController);


// handleTopicRequest("create_shop", createShop);

// handleTopicRequest("add_user", signIn);
