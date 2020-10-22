const { exec } = require('child_process');
const path = require('path');
require("promise.allsettled").shim();

const AUTHOR = 'Pocket 2 Kindle';

async function convertToMobi(articles) {
  const promises = await Promise.allSettled(articles.map(convertHtml));
  return new Promise((resolve) => {
    let fulfilledArticles = [];
    for ({ status, value } of promises) {
      if (status === "fulfilled") {
        fulfilledArticles.push(value);
      }
    }
    resolve(fulfilledArticles);
  });
}

function convertHtml(article) {
  const { title, html, mobi } = article;
  const command = `ebook-convert "${html}" "${mobi}" --title "${title}" --authors "${AUTHOR}"`;

  return new Promise((resolve, reject) => {
    exec(
      command,
      { cwd: path.resolve("./articles") },
      err => {
        if (err) {
          console.error(`Unable to create MOBI for article '${title}' :(`, err);
          return reject(err);
        }

        console.log(`MOBI file created for article '${title}`);
        resolve(article);
      }
    );
  });
}

module.exports = convertToMobi;
