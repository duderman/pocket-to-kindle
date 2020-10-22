const { exec } = require('child_process');
const path = require('path');

const AUTHOR = 'Pocket 2 Kindle';

async function convertToMobi(articles) {
  return Promise.all(articles.map((article) => convertHtml(article)));
}

function convertHtml(article) {
  const { title, html, mobi } = article;
  const command = `ebook-convert "${html}" "${mobi}" --title "${title}" --authors "${AUTHOR}"`;

  return new Promise((resolve, reject) => {
    exec(
      command,
      { cwd: path.resolve("./articles") },
      err => {
        if (err) { return reject(err); }

        console.log(`MOBI file created for article '${title}`);
        resolve();
      }
    );
  });
}

module.exports = convertToMobi;
