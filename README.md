# pocket-to-kindle
Send your Pocket articles to your Kindle.

## Requirements
- [Calibre](https://calibre-ebook.com/download).
- Consumer key and access token from the [Pocket API](https://getpocket.com/developer/docs/authentication).
- API key from [SendGrid](https://sendgrid.com/).

## How it works
Pocket articles  are retrieved through the Pocket API. An HTML file gets created for each article ([node-readability](https://github.com/luin/readability) is used to only get the article itself from the url). [Calibre's ebook-convert](https://manual.calibre-ebook.com/generated/en/ebook-convert.html) is used to convert them to MOBI, that are then will be sent to your Kindle email address through SendGrid.

## Usage
Set your keys, email addresses, and Pocket tag in `.env` file (see `.env.example`)

Send the articles to your Kindle using the default options.
```
node src/index.js
```

If you prefer to use docker there is a `Dockerfile` in the repo for you

```
docker build -t pocket-to-kindle .
docker run --env-file .env pocket-to-kindle
```
