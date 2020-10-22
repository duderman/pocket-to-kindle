const axios = require('axios');
const { pocketConfig } = require('../config.js');

const BASE_URL = 'https://getpocket.com/v3'
const FETCH_URL = `${BASE_URL}/get`;
const ARCHIVE_URL = `${BASE_URL}/send`;

async function getPocketArticles() {
  const response = await axios.post(FETCH_URL, pocketConfig);

  const articlesObject = response.data.list;
  const articles = Object.values(articlesObject);
  const links = articles.map(buildArticle);

  console.log(`Fetched ${links.length} Pocket articles...`);
  return links;
}

function buildArticle(article) {
  const title = article.resolved_title || generateTitle();;
  return {
    id: article.resolved_id,
    url: article.resolved_url,
    title: title,
    html: `${title}.html`,
    mobi: `${title}.mobi`,
  };
}

function generateTitle() {
  const now = new Date();
  return `Pocket ${now.toISOString()}`;
}

async function markAsRead(articles) {
  console.log('Marking all articles as read...');

  const params = { ...pocketConfig, actions: buildActions(articles)}
  return axios.post(ARCHIVE_URL, params);
}

function buildActions(articles) {
  return articles.map(buildAction)
}

function buildAction(article) {
  const {id} = article;

  return {
    action: "archive",
    item_id: id
  }
}


module.exports = { getPocketArticles, markAsRead };
