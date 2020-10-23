const read = require("read-art");
const fs = require('fs');

async function toHtml(article) {
  const { title, html, dir } = article;

  return new Promise((resolve, reject) => {
    const fileContent = fs.readFileSync(`${dir}/index.xhtml`).toString();
    read(fileContent, (err, page) => {
      if (err) {
        console.error(`Error creating HTML for title '${title}'`, err);
        return reject(err);
      }

      const pageContent = page.content;
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

      fs.writeFileSync(html, htmlContent);

      console.log(`HTML created for article '${title}'`);
      resolve(article);
    });
  });
}

module.exports = toHtml;
