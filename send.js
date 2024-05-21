const amqp = require("amqplib");
const exchangeName = "topicExchange";
const [logType, message] = process.argv.slice(2);

const sendData = async () => {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "topic");
  channel.publish(exchangeName, logType, Buffer.from(message));
  setTimeout(() => {
    process.exit(0);
  });
};

sendData();


//for example 
//our pattern  => [ '*.nodejs.*' ]
// our code  =>  node send.js "aren.nodejs.aren" "myMessage"
// [ '#.message' ]  ==>  node send.js "aren.nodejs.message" "myMessage"
//  [ 'error.*.message' ]  ==> node send.js "error.nodejs.message" "myMessage"