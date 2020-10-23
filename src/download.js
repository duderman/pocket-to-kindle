const { exec } = require("child_process");
const fs = require("fs");

async function download(article) {
  const { dir, url, title } = article;
  const command = `web2disk -r 0 -d ${dir} ${url}`;

  return new Promise((resolve, reject) => {
    exec(command, (err) => {
      if (err) {
        console.error(`Unable to download article '${title}' :(`, err);
        return reject(err);
      }

      fixFilename(dir);

      console.log(`Downloaded article '${title}' from ${url} to ${dir}`);
      resolve(article);
    });
  });
}

function fixFilename(dir) {
  for (const file of fs.readdirSync(dir)) {
    if (file.endsWith(".xhtml") && file !== "index.xhtml") {
      return fs.renameSync(`${dir}/${file}`, `${dir}/index.xhtml`);
    }
  }
}

module.exports = download;
