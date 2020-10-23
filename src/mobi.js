const { exec } = require("child_process");

const AUTHOR = "Pocket 2 Kindle";

async function toMobi(article) {
  const { title, html, mobi } = article;
  const command = `ebook-convert "${html}" "${mobi}" --title "${title}" --authors "${AUTHOR}"`;

  return new Promise((resolve, reject) => {
    exec(command, (err) => {
      if (err) {
        console.error(`Unable to create MOBI for article '${title}' :(`, err);
        return reject(err);
      }

      console.log(`MOBI file created for article '${title}`);
      resolve(article);
    });
  });
}

module.exports = toMobi;
