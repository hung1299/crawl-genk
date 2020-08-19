const express = require('express');
require('./config/db');
require('./crawl');
const config = require('config');
const articleRoute = require('./routes/article');

const app = express();

app.use(express.json());
app.use('/api/articles', articleRoute);

const PORT = config.get('PORT') || 3000;
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
