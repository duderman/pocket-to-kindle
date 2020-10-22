require("dotenv").config();

const pocketConfig = {
  consumer_key: process.env.POCKET_CONSUMER_KEY,
  access_token: process.env.POCKET_ACCESS_TOKEN,
};

const sendgridConfig = {
  api_key: process.env.SENDGRID_API_KEY,
  from_address: process.env.SENDGRID_FROM,
  kindle_address: process.env.KINDLE_ADDRESS,
};

module.exports.pocketConfig = pocketConfig;
module.exports.sendgridConfig = sendgridConfig;
