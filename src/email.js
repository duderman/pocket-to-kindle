const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const { sendgridConfig } = require('../config.js');

sgMail.setApiKey(sendgridConfig.api_key);

async function sendToKindle(articles) {
  const message = {
    from: sendgridConfig.from_address,
    to: sendgridConfig.kindle_address,
    subject: 'Pocket to Kindle',
    text: `Your Pocket articles`,
    attachments: buildAttachments(articles)
  };

  return sgMail.send(message);
}

function buildAttachments(articles) {
  return articles.map(buildAttachment)
}

function buildAttachment(article) {
  const { mobi, title } = article;
  console.log(`Sending article '${title}' to Kindle`);
  const file = fs.readFileSync(`./articles/${mobi}`);
  const base64File = file.toString('base64');
  return { content: base64File, filename: `${title}.mobi` };
}

module.exports = sendToKindle;
