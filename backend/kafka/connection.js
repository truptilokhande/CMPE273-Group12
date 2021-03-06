const kafka = require("kafka-node");

function ConnectionProvider() {
  this.getConsumer = function (topic_name) {
    this.client = new kafka.KafkaClient(
      `g12-1904681574.us-east-1.elb.amazonaws.com:2181`
    );
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topic_name, partition: 0 },
    ]);
    this.client.on("ready", function () {
      console.log("client ready!");
    });
    return this.kafkaConsumerConnection;
  };

  //Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient(
        `g12-1904681574.us-east-1.elb.amazonaws.com:2181`
      );

      var HighLevelProducer = kafka.HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
    }
    return this.kafkaProducerConnection;
  };
}

exports = module.exports = new ConnectionProvider();
