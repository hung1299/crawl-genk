const express = require('express');
require('./config/db');
require('./crawl');
const articleRoute = require('./routes/article');

const app = express();

app.use(express.json());
app.use('/api/articles', articleRoute);

app.get('/', (req, res) => {
  res.redirect('/api/articles');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
