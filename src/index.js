const express = require("express");
const amqplib = require("amqplib");
const { EmailService } = require("./services");

const { ServerConfig, Logger } = require("./config");
const apiRoutes = require("./routes");

async function connectQueue() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("notification-queue");
    channel.consume("notification-queue", async (data) => {
      const object = JSON.parse(Buffer.from(data.content));
      await EmailService.sendEmail(
        ServerConfig.SMTP_MAIL,
        object.recipientEmail,
        object.subject,
        object.text
      );
      channel.ack(data);
    });
  } catch (error) {}
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`);
  Logger.info("Successfully started the server", "root", { msg: "something" });
  await connectQueue();
});
