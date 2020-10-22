const read = require('node-readability');
const fs = require('fs');

const folderPath = './articles';

async function createHtmlFiles(articles) {
  clearArticlesFolder();
  return Promise.all(articles.map(((article) => createHtmlFile(article))));
}

function createHtmlFile(article) {
  const {url, title, html} = article;

  return new Promise((resolve, reject) => {
    read(url, (err, page) => {
      if (err) { return reject(error); }

      const pageContent = page.content;
      const fileName = title;
      const htmlContent = `
        <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <h1>${title}</h1>
          ${pageContent}
        </body>
        </html>
      `;
      fs.writeFileSync(`${folderPath}/${html}`, htmlContent);
      page.close();
      console.log(`HTML created for article '${title}' from ${url}`);
      resolve(article);
    })
  })
}

function clearArticlesFolder() {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  } else {
    const files = fs.readdirSync(folderPath);
    for (const file of files)
      fs.unlinkSync(`${folderPath}/${file}`);

  }
}

module.exports = createHtmlFiles;
