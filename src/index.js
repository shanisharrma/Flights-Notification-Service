const express = require("express");

const { ServerConfig, Logger } = require("./config");
const apiRoutes = require("./routes");
const mailSender = require("./config/email-config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`);
  Logger.info("Successfully started the server", "root", { msg: "something" });
  try {
    const response = await mailSender.sendMail({
      from: ServerConfig.SMTP_MAIL,
      to: "codingsutra509@gmail.com",
      subject: "Is this mailer working or not?",
      text: "Yes it is working.",
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
