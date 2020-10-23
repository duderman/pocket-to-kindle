const fs = require("fs");

const { getPocketArticles, markAsRead } = require("./pocket.js");
const convertArticles = require("./convert.js");
const sendToKindle = require("./email.js");
const { interval } = require("../config.js");
const { FOLDER_PATH } = require("./consts.js");

async function main() {
  try {
    console.log("Starting...");

    clearArticlesFolder();

    const articles = await getPocketArticles();

    if (articles.length === 0) {
      return console.log("Nothing to do here...");
    }

    const convertedArticles = await convertArticles(articles);

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

function clearArticlesFolder() {
  if (fs.existsSync(FOLDER_PATH)) {
    fs.rmdirSync(FOLDER_PATH, { recursive: true });
  }

  fs.mkdirSync(FOLDER_PATH);
}

main();
setInterval(main, interval);
