const { getPocketArticles, markAsRead } = require("./pocket.js");
const createHtmlFiles = require('./html.js');
const convertToMobi = require('./conversion.js');
const sendToKindle = require("./email.js");
const { interval } = require("../config.js");

async function main() {
  try {
    console.log("Starting...");
    const articles = await getPocketArticles();

    if (articles) {
      await createHtmlFiles(articles);
      const convertedArticles = await convertToMobi(articles);
      await sendToKindle(convertedArticles);
      await markAsRead(convertedArticles);

      console.log("All good :)\n\n");
    } else {
      console.log("Nothing to do here...");
    }
  } catch (err) {
    console.log(err);
  }
}

main();
setInterval(main, interval);
