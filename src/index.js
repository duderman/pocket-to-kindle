const { getPocketArticles, markAsRead } = require("./pocket.js");
const createHtmlFiles = require('./html.js');
const convertToMobi = require('./conversion.js');
const sendToKindle = require("./email.js");
const { interval } = require("../config.js");

async function main() {
  try {
    console.log("Starting...");
    const articles = await getPocketArticles();

    if (articles.length === 0) {
      return console.log("Nothing to do here...");
    }

    await createHtmlFiles(articles);
    const convertedArticles = await convertToMobi(articles);

    if (convertedArticles.length === 0) {
      return console.log("All articles failed to convert :(");
    }

    await sendToKindle(convertedArticles);
    await markAsRead(convertedArticles);

    console.log("All good :)\n\n");
  } catch (err) {
    console.log(err);
  }
}

main();
setInterval(main, interval);
