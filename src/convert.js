require("promise.allsettled").shim();

const download = require("./download.js");
const toHtml = require("./html.js");
const toMobi = require("./mobi.js");

async function convertArticles(articles) {
  const promises = await Promise.allSettled(articles.map(convert));

  let fulfilledArticles = [];

  for ({ status, value } of promises) {
    if (status === "fulfilled") {
      fulfilledArticles.push(value);
    }
  }

  return fulfilledArticles;
}

async function convert(article) {
  const downloaded = await download(article);
  const html = await toHtml(downloaded);
  const mobi = await toMobi(html);

  return mobi;
}

module.exports = convertArticles;
