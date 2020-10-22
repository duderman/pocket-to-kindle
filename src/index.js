const { getPocketArticles, markAsRead } = require("./pocket.js");
const createHtmlFiles = require('./html.js');
const convertToMobi = require('./conversion.js');
const sendToKindle = require("./email.js");
const { interval } = require("../config.js");

async function main() {
  try {
    console.log('Starting...')
    const articles = await getPocketArticles();

    if (!articles) {
      console.log('Nothing to do here...')
      return;
    }

    await createHtmlFiles(articles);
    await convertToMobi(articles);
    await sendToKindle(articles);
    await markAsRead(articles);

    console.log("All good :)\n\n")
  } catch (err) {
    console.log(err);
  }
}

main();
setInterval(main, interval);
