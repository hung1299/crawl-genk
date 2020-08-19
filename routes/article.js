const express = require('express');
const Article = require('../model/Article');

const router = express.Router();

// get All articles
router.get('/', async (req, res) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  const sort = req.query.sort_by;

  try {
    if (skip && limit) {
      const articles = await Article.find({}).skip(skip).limit(limit);

      return res.send(articles);
    } else if (skip === 0 && limit) {
      const articles = await Article.find({}).limit(limit);

      return res.send(articles);
    } else if (sort) {
      const articles = await Article.find({}).sort({ createdAt: sort });

      return res.send(articles);
    }
    const articles = await Article.find({});

    res.send(articles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// get article by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ msg: 'Article not found!!' });
    }

    res.send(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error!!' });
  }
});

module.exports = router;
